import React, { useEffect, useState, useRef } from 'react';

interface CursorState {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  text: string;
  isHovering: boolean;
  isExpanded: boolean;
  isVisible: boolean;
}

export const CustomCursor: React.FC = () => {
  const [cursor, setCursor] = useState<CursorState>({
    x: -100,
    y: -100,
    targetX: -100,
    targetY: -100,
    text: '',
    isHovering: false,
    isExpanded: false,
    isVisible: false,
  });

  const stateRef = useRef(cursor);
  stateRef.current = cursor;
  const requestRef = useRef<number>(0);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      let cursorText = '';
      let isExp = false;
      let isHov = false;

      if (target) {
        const interactiveEl = target.closest('[data-cursor]') as HTMLElement | null;
        if (interactiveEl) {
          cursorText = interactiveEl.getAttribute('data-cursor') || '';
          isExp = true;
          isHov = true;
        } else if (target.closest('a, button, [role="button"]')) {
          isHov = true;
        }
      }

      setCursor((prev) => ({
        ...prev,
        targetX: e.clientX,
        targetY: e.clientY,
        text: cursorText,
        isHovering: isHov,
        isExpanded: isExp,
        isVisible: true,
      }));
    };

    const handleMouseLeave = () => {
      setCursor((prev) => ({ ...prev, isVisible: false }));
    };

    const handleMouseEnter = () => {
      setCursor((prev) => ({ ...prev, isVisible: true }));
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth lerp loop
    const animateCursor = () => {
      setCursor((prev) => {
        const ease = 0.22;
        const dx = prev.targetX - prev.x;
        const dy = prev.targetY - prev.y;
        
        if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
          return prev;
        }

        return {
          ...prev,
          x: prev.x + dx * ease,
          y: prev.y + dy * ease,
        };
      });
      requestRef.current = requestAnimationFrame(animateCursor);
    };

    requestRef.current = requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  if (!cursor.isVisible) return null;

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
      style={{
        transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)`,
      }}
    >
      {/* Outer Follower Ring / Badge */}
      <div
        className={`relative -top-1/2 -left-1/2 flex items-center justify-center rounded-full transition-all duration-200 ease-out ${
          cursor.isExpanded
            ? 'h-16 w-16 -translate-x-8 -translate-y-8 bg-[var(--primary-accent,#9333ea)] text-white'
            : cursor.isHovering
            ? 'h-10 w-10 -translate-x-5 -translate-y-5 border border-[var(--primary-accent,#9333ea)] bg-[var(--primary-accent,#9333ea)]/20 backdrop-blur-[1px]'
            : 'h-4 w-4 -translate-x-2 -translate-y-2 border border-white/60 bg-white/20'
        }`}
      >
        {cursor.text && (
          <span className="font-mono text-[9px] font-bold tracking-widest text-white uppercase select-none">
            {cursor.text}
          </span>
        )}
      </div>
    </div>
  );
};

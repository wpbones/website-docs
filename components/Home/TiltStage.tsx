'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/**
 * The plugin stack's stage, which leans toward the pointer (the user,
 * 2026-10-05: "facciamola muovere al mouse hover"). It only writes two custom
 * properties, `--tilt-x` and `--tilt-y`, once per frame at most; the stylesheet
 * turns them into the plane's rotation and eases it (PluginStack.module.css).
 * The layers lifting apart on hover is CSS alone.
 *
 * Only for a mouse or a trackpad, and never under Reduce Motion: on a touch
 * screen there is no hover to follow, and a tap would leave it leaning.
 */
export function TiltStage({ className, children }: { className: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (
      !el ||
      !window.matchMedia('(hover: hover) and (pointer: fine)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return undefined;
    }
    let frame = 0;
    const move = (event: PointerEvent) => {
      const box = el.getBoundingClientRect();
      // -0.5 at the left or top edge, 0.5 at the right or bottom one.
      const x = (event.clientX - box.left) / box.width - 0.5;
      const y = (event.clientY - box.top) / box.height - 0.5;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty('--tilt-x', `${(x * 14).toFixed(2)}deg`);
        el.style.setProperty('--tilt-y', `${(-y * 10).toFixed(2)}deg`);
      });
    };
    const leave = () => {
      cancelAnimationFrame(frame);
      el.style.removeProperty('--tilt-x');
      el.style.removeProperty('--tilt-y');
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  }, []);

  return (
    <div ref={ref} className={className} aria-hidden="true">
      {children}
    </div>
  );
}

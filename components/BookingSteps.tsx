"use client";
import { useLayoutEffect, useRef } from "react";
export default function BookingSteps({
  active,
  children,
}: {
  active: number;
  children: React.ReactNode[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const last = useRef(active);
  useLayoutEffect(() => {
    const el = ref.current;
    const panel = el?.querySelector<HTMLElement>('[data-active="true"]');
    if (!el || !panel) return;
    const measure = () => {
      const h = panel.offsetHeight;
      if (h > 0) el.style.height = `${h}px`;
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(panel);
    if (last.current !== active) {
      el.closest("dialog")?.scrollTo({ top: 0, behavior: "instant" });
      const heading = panel.querySelector("h2");
      if (heading) {
        heading.tabIndex = -1;
        heading.focus({ preventScroll: true });
      }
    }
    last.current = active;
    return () => observer.disconnect();
  }, [active]);
  return (
    <div
      ref={ref}
      className="booking-steps t-page-slide t-resize"
      data-page={active}
    >
      {children.map((child, i) => (
        <section
          className="t-page"
          data-page-id={i + 1}
          data-active={active === i + 1}
          inert={active !== i + 1}
          aria-hidden={active !== i + 1}
          key={i}
        >
          {child}
        </section>
      ))}
    </div>
  );
}

"use client";
import { useCallback, useEffect, useRef } from "react";
import { motionMs } from "../lib/motion/timing";
/** Keep the native top layer, focus trap and Escape behavior until exit finishes. */
export default function useAnimatedDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const opener = useRef<HTMLElement | null>(null);
  const clear = useCallback(() => {
    clearTimeout(timer.current);
    timer.current = undefined;
  }, []);
  useEffect(() => clear, [clear]);
  const open = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    clear();
    if (!el.open) {
      opener.current = document.activeElement as HTMLElement;
      el.showModal();
    }
    // Measure layout before the modal scale transition; transformed bounds clip the last row.
    const steps = el.querySelector<HTMLElement>(".booking-steps");
    const panel = steps?.querySelector<HTMLElement>('[data-active="true"]');
    if (steps && panel) steps.style.height = `${panel.offsetHeight}px`;
    el.classList.remove("is-closing", "is-open");
    void el.offsetWidth;
    el.classList.add("is-open");
  }, [clear]);
  const close = useCallback(() => {
    const el = ref.current;
    if (!el?.open) return;
    clear();
    el.classList.remove("is-open");
    el.classList.add("is-closing");
    const finish = () => {
      el.close();
      el.classList.remove("is-closing");
      opener.current?.focus({ preventScroll: true });
    };
    const delay = motionMs("--modal-close-dur", 150, el);
    if (delay === 0) finish();
    else timer.current = setTimeout(finish, delay);
  }, [clear]);
  return {
    ref,
    open,
    close,
    onCancel: (e: React.SyntheticEvent<HTMLDialogElement>) => {
      e.preventDefault();
      close();
    },
  };
}

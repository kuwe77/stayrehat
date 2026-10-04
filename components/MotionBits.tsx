"use client";
import { useLayoutEffect, useRef, useState } from "react";

import { motionMs, replay } from "../lib/motion/timing";
export function AnimatedText({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || shown === value) return;
    const duration = motionMs("--text-swap-dur", 150, el);
    if (!duration) {
      setShown(value);
      return;
    }
    el.classList.add("is-exit");
    const timer = setTimeout(() => {
      el.classList.remove("is-exit");
      el.classList.add("is-enter-start");
      setShown(value);
    }, duration);
    return () => {
      clearTimeout(timer);
      el.classList.remove("is-exit");
    };
  }, [value, shown]);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    void el.offsetHeight;
    el.classList.remove("is-enter-start");
  }, [shown]);
  // One up-to-date accessible value; the short visual swap is decorative.
  return (
    <span className="text-swap-slot">
      <span className="sr-only">{value}</span>
      <span aria-hidden="true" ref={ref} className="t-text-swap">
        {shown}
      </span>
    </span>
  );
}
export function AnimatedNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => replay(ref.current, "is-animating"), [value]);
  return (
    <span aria-label={value} ref={ref} className="t-digit-group">
      {[...value].map((digit, i) => (
        <span
          aria-hidden="true"
          className="t-digit"
          key={i}
          data-stagger={
            i > value.length - 3 ? i - (value.length - 3) : undefined
          }
        >
          {digit === " " ? "\u00a0" : digit}
        </span>
      ))}
    </span>
  );
}
export function SuccessCheck() {
  const ref = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.querySelectorAll("path").forEach((p) => {
      const length = Math.ceil(p.getTotalLength()) + 1;
      p.style.strokeDasharray = String(length);
      p.style.strokeDashoffset = String(length);
    });
    void el.offsetWidth;
    el.dataset.state = "in";
  }, []);
  return (
    <span
      ref={ref}
      className="t-success-check"
      data-state="out"
      aria-hidden="true"
    >
      <CheckStroke size={38} />
    </span>
  );
}
function CheckStroke({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12L10 17L20 7" />
    </svg>
  );
}
export function AnimatedCheckbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    const path = el?.querySelector("path");
    if (el && path)
      el.style.setProperty(
        "--check-len",
        String(Math.ceil(path.getTotalLength()) + 1),
      );
  }, []);
  return (
    <label className="check-label motion-checkbox">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span
        ref={ref}
        className="t-check"
        aria-checked={checked}
        aria-hidden="true"
      >
        <CheckStroke size={13} />
      </span>
      <span>Cuti am / cuti sekolah</span>
    </label>
  );
}

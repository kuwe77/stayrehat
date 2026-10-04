"use client";
import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { motionMs } from "../lib/motion/timing";
/** Progressive enhancement: server-rendered content is visible without JS.
 * Observe groups once; no scroll listeners or continuous React updates. */
export default function MotionOrchestrator() {
  const path = usePathname();
  useLayoutEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const selectors = [
      ".hero-copy",
      ".experience-hero-copy",
      ".pool-copy",
      ".comfort-heading",
      ".comfort-grid",
      ".occasion-heading",
      ".occasion-photos",
      ".collection-heading",
      ".experience-invite > div",
      ".highlights",
      ".intro-copy",
      ".intro-visual",
      ".facility-photo",
      ".rooms-foot",
      ".gathering > div",
      ".home-location > div",
      ".section-title",
      ".room-grid",
      ".facility-copy",
      ".event-images",
      ".gallery-grid:not(.editorial-grid)",
      ".journal",
      ".footer-top",
      ".footer-bottom",
      ".page-heading",
      ".page-intro",
      ".about-lead",
      ".about-body > div",
      ".rates-grid",
      ".amenity-inline",
      ".contact-layout > div",
      ".location-details > div",
      ".maps",
      ".subpage > .prose > div",
    ];
    const groups = Array.from(
      document.querySelectorAll<HTMLElement>(selectors.join(",")),
    );
    const prepared: HTMLElement[] = [];
    const frames: number[] = [];
    const timers: ReturnType<typeof setTimeout>[] = [];
    const show = (group: HTMLElement) => {
      group.classList.add("is-shown");
      timers.push(
        setTimeout(
          () => group.classList.add("is-settled"),
          motionMs("--stagger-dur", 500) +
            motionMs("--stagger-stagger", 40) * 5,
        ),
      );
    };
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            show(entry.target as HTMLElement);
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    for (const group of groups) {
      const children = Array.from(group.children).filter(
        (el): el is HTMLElement =>
          el instanceof HTMLElement &&
          !["DIALOG", "SCRIPT"].includes(el.tagName) &&
          !el.matches(selectors.join(",")),
      );
      if (!children.length) continue;
      group.classList.add("t-stagger");
      prepared.push(group);
      children.forEach((el, i) => {
        el.classList.add("t-stagger-line");
        el.style.setProperty("--reveal-order", String(Math.min(i, 5)));
        if (el.tagName === "IMG" || el.querySelector("img"))
          el.classList.add("motion-media");
      });
      if (media.matches) {
        show(group);
        continue;
      }
      // Links already reached by keyboard must never wait for a reveal.
      const rect = group.getBoundingClientRect();
      if (rect.top < innerHeight && rect.bottom > 0) {
        void group.offsetHeight;
        frames.push(requestAnimationFrame(() => show(group)));
      } else observer.observe(group);
    }
    const revealAll = () => {
      if (media.matches) {
        prepared.forEach(show);
        observer.disconnect();
      }
    };
    const focus = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      const group = target.closest<HTMLElement>(".t-stagger");
      if (group) show(group);
    };
    media.addEventListener("change", revealAll);
    document.addEventListener("focusin", focus);
    return () => {
      observer.disconnect();
      frames.forEach(cancelAnimationFrame);
      timers.forEach(clearTimeout);
      media.removeEventListener("change", revealAll);
      document.removeEventListener("focusin", focus);
      prepared.forEach((group) => {
        group.classList.remove("t-stagger", "is-shown", "is-settled");
        Array.from(group.children).forEach((el) => {
          el.classList.remove("t-stagger-line", "motion-media");
          (el as HTMLElement).style.removeProperty("--reveal-order");
        });
      });
    };
  }, [path]);
  return null;
}

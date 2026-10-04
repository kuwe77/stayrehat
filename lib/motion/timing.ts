/** Read the recipe's CSS duration so interrupted transitions stay synchronized. */
export function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
export function motionMs(
  token: string,
  fallback: number,
  element: Element = document.documentElement,
) {
  if (reducedMotion()) return 0;
  const raw = getComputedStyle(element).getPropertyValue(token).trim();
  const value = Number.parseFloat(raw);
  return Number.isFinite(value)
    ? value * (raw.endsWith("ms") ? 1 : 1000)
    : fallback;
}
export function replay(element: HTMLElement | null, className: string) {
  if (!element || reducedMotion()) return;
  element.classList.remove(className);
  void element.offsetWidth;
  element.classList.add(className);
}

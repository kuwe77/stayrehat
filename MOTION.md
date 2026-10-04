# StayRehat motion

Implemented using [transitions.dev](https://github.com/Jakubantalik/transitions.dev), its `transitions-dev` skill and recipes at commit `3bc58021c69725d8bf42108632ac6cf14f2b1d3c` (4 October 2026).

## Direction

Short, quiet movement suited to a family retreat: 4–12px travel, gentle fades, staggered editorial content, responsive press feedback, and faster exits. No scroll hijacking or continuous pointer tracking. Existing copy, photos, rates and routes are retained.

## Recipe mapping

| Surface | Recipe |
| --- | --- |
| Booking step height | 01 Card resize |
| Price updates and gallery counter | 02 Number pop-in |
| Selected check-in/check-out text | 04 Text states swap |
| Mobile navigation | 05 Menu dropdown |
| Booking dialog and photo lightboxes | 06 Modal open/close |
| Summary → guest details → preview complete | 08 Page side-by-side |
| Theme and menu icons | 09 Icon swap |
| Preview completion | 10 Success check |
| Missing dates and invalid guest fields | 12 Error state shake |
| Gallery photo loading | 14 Skeleton reveal |
| Hero, sections, photos, rates, content pages and footer | 18 Texts reveal |
| Holiday checkbox | 25 Checkbox check |

Calendar month transitions use DayPicker's `animate` mode with the shared duration and easing tokens. Route entrances, image changes, card hovers, arrow movement, focus and button presses use the same token scale.

## Maintenance

- `app/motion/tokens.css`: upstream `_root.css`, copied once, verbatim.
- `app/motion/recipes.css`: selected upstream CSS snippets, verbatim, with their reduced-motion rules.
- `app/motion/site-motion.css`: StayRehat tuning, layout integration and additional interaction styles. Make visual adjustments here.
- `app/motion/LICENSE.txt`: upstream license, retained with the implementation.
- `lib/motion/timing.ts`: reads CSS durations for JS-managed exits and replays. Reduced motion bypasses animation timers.
- `useAnimatedDialog`: retains native top-layer/focus semantics through exit; cancels stale close timers before reopening; restores focus after closing.
- `BookingSteps`: measures untransformed layout height with ResizeObserver; inactive panels are inert; step headings receive focus.
- `MotionOrchestrator`: one-time IntersectionObserver reveals on each route, with cleanup. Content is visible before enhancement and without JavaScript. Keyboard focus also reveals its group.

The third booking panel is a documented extension of the two-panel recipe. Success and checkbox SVG strokes are measured at mount rather than relying on a guessed dash length. Gallery skeleton pulsing stops after the image loads or fails.

All motion is disabled under `prefers-reduced-motion: reduce`; the content and controls remain available. OS-level reduced-motion switching was checked in source, not changed on the user's Mac.

No additional animation dependency was installed. No backend, booking submission, Vercel connection or deployment was added.

## Validation

- Production build and TypeScript pass; nine booking calculation tests pass.
- Browser checked at 1440×1000 and 390×844, in light and dark themes.
- Booking: missing-date feedback, calendar next/previous month, repeated date changes, holiday toggle, correct RM300 two-night and RM1000 holiday four-night estimates, summary/details/completion, native required-field validation.
- Dialogs: Escape/close, closed-state cleanup, repeated opening, focus restored to the booking trigger, and one active interactive step.
- Mobile menu: opening, closing, Escape from the trigger, reopening and route navigation; no horizontal overflow.
- Gallery: loaded image reveals, next and ArrowRight navigation, matching counter, Escape close.
- Content-page heading reaches fully visible settled state after navigation. Photos and controls checked visually.
- Fixed modal step clipping caused by measuring a scaled bounding rectangle during entry; height now uses layout measurements.

The earlier Lighthouse report in `VALIDATION.md` predates this motion pass and has not been rerun.

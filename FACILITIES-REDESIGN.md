# Facilities & Gallery redesign

4 October 2026. Local preview only.

## Audit and direction

The previous Facilities page was a narrow generic heading, an emoji checklist, and equal photo tiles. The Gallery page repeated a similar layout with no grouping. Retained the StayRehat logo, forest/silver brand tokens, existing typography, original photographs, amenity information, event information, keyboard-accessible dialogs, and shared motion tokens.

Rebuilt as one destination showcase: image-led hero, internal section navigation, interactive day/night pool view, five amenity treatments, asymmetric event photography, and a filterable editorial gallery. Taste dials: design variance 8, motion intensity 6, visual density 3.

## Routes and content

- `/facilities/` is the combined Facilities & Gallery page.
- `/gallery/` redirects to `/facilities/#gallery` with a temporary 307 during local design work.
- Header, footer and homepage links point to the combined page.
- All five amenities retained, including the restriction on cooking equipment for certain guests.
- Birthday parties, engagements and family days retained, with a link to the existing event rates.
- All 15 original image references represented by 13 unique photos. SHA-256 comparison confirms `/images/45.webp` duplicates `39.webp`, and `47.webp` duplicates `40.webp`. Original assets are still present.
- Gallery filters: all, pool/garden, spaces/facilities, events. Eight initial photos expand to the whole collection; the lightbox can browse every photo in the active category.

## Dark-mode logo

The header uses CSS inversion, hue rotation, contrast and screen blending to remove the light plate visually and retain a legible house/wordmark on the dark header. The original image file is unchanged. Light mode keeps the original logo treatment.

## Validation

- Production build and TypeScript pass.
- All nine existing booking tests pass.
- Desktop 1440×1000 and mobile 390×844 visually checked.
- Both themes checked; dark header logo no longer shows a white rectangle.
- Pool toggle changes to the original night photo.
- Gallery category changes, two-photo event collection, lightbox entry, keyboard navigation and Escape tested.
- Show-all exposes all 13 photos and moves keyboard focus to the first newly revealed photo.
- Old gallery URL verified in browser and via HTTP redirect.
- No page-level horizontal overflow at the tested mobile size.
- Reduced-motion guards retained for all new animations.

No Vercel or Supabase connection, deployment, booking submission, or external communication was added.

# Design direction and preservation audit

Reading this as: a family retreat website for guests seeking a peaceful Gombak getaway, with an elegant, nature-led visual language.

Taste skill: design-taste-frontend. Redesign mode: visual overhaul with business content, navigation labels, logo and routes preserved. DESIGN_VARIANCE 7 / MOTION_INTENSITY 5 / VISUAL_DENSITY 3.

## Existing site

WordPress/Mai Lifestyle Pro: centered original logo, dark grey navigation, Raleway-like body typography, serif titles, large photo banner, boxed blog content and sidebar search. The homepage presents a welcome post rather than a booking entry point. Existing visual dials roughly 3 / 1 / 5.

The business navigation consists of Home, Tentang Kami, Rooms & Rates, Facilities, Gallery, Location & Map, and Contact & Booking. Facilities and Gallery were subsequently merged at the user's request; the old Gallery URL redirects to the combined page. See `FACILITIES-REDESIGN.md`. The welcome article keeps its URL. WordPress admin/login, theme attribution, comment submission, search plumbing and the unused WordPress sample page are not part of the business frontend.

## Inspiration

Browsed https://www.awwwards.com/websites/ and opened its Tengile MalaMala Collection entry, then the live property website. Borrowed the use of immersive location photography, thin display typography, restrained earth/nature accents and unhurried editorial spacing. No copied design assets or source code.

The green accent relates to the property's trees and original logo. Cool off-white and muted green surfaces avoid the generic cream-and-gold luxury palette. Cormorant Garamond adds a fine-stroked hospitality character grounded in the reference; Manrope supports readable controls. All photographs depict the actual property; preserving property information takes precedence over generating fictional accommodation imagery.

## Design contract

- Sharp photography; 2px controls; 4px booking panel and dialogs.
- One forest accent and semantic CSS tokens shared by both themes.
- Four-column room selection, asymmetric editorial introduction, photography-led facilities, gallery grid and clear contact pages.
- Motion introduces content and acknowledges hover/state changes. Reduced motion disables entry effects.
- Navigation stays on one line on desktop and becomes a labelled menu on mobile.
- Dates use an accessible calendar library, native dialogs supply focus containment and Escape dismissal.
- Original source copy is preserved, including original punctuation where it differs from the taste skill's preferred prose style.

## Source limitations retained

The original location page uses both Gombak/Selangor and Padang Balang/Kuala Lumpur wording. Both remain. Published travel times remain source claims, not independently verified journey estimates. Event price bands both include 50 pax as in the source. No cancellation policy terms, official holiday schedule, live availability, check-in times or extra-guest rules have been invented.

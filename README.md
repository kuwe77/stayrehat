# StayRehat

A complete Next.js / React / TypeScript redesign of https://stayrehat.com.my/, built for local review. No Vercel project, deployment, Supabase connection, database, payment integration or booking backend has been created.

## Run locally

```sh
npm install
npm run dev
```

Open http://localhost:3000.

```sh
npm run build
npm start
npm test
```

## Included

- Public business pages and the welcome article, with Facilities & Gallery combined at `/facilities/`. The former `/gallery/` URL redirects to the photo collection.
- Original StayRehat logo, property photos, Malay copy, contact information, map embeds, room configuration, published rates and event prices.
- Responsive homepage with a visible date-range calendar; past dates disabled, minimum one-night stays, room/property selection and a holiday-rate option.
- Local estimate and 50% deposit preview, Saturday whole-property restriction, guest form validation, and an explicitly unconfirmed completion screen.
- Full room photo galleries with keyboard-accessible lightboxes, mobile navigation, light/dark themes, reduced-motion support and self-hosted fonts.
- Photo-led Facilities & Gallery page with day/night pool views, category filters, all original photographs and a dark-mode logo treatment. See [FACILITIES-REDESIGN.md](./FACILITIES-REDESIGN.md).

## Booking boundary and future Supabase work

`lib/booking.mjs` contains pure rate calculations and the room catalogue. `components/Booking.tsx` owns temporary UI state. Guest input is never posted or persisted, and the form does not create reservations. Refreshing clears the preview.

The calendar does not represent live inventory. The holiday checkbox applies the published holiday rate to the entire selected stay; it is not an official holiday calendar. Future integration should calculate each night's holiday status on the server, store the eight individual units, validate capacities and live inventory, and perform atomic booking creation. Do not trust client-side totals for payment. Event packages remain an enquiry flow because the source does not define an event-booking contract.

The source mentions a cancellation policy but supplies no actual policy on its public business pages. Its reference is retained without inventing terms. Management should provide the policy before paid bookings are enabled.

Search-engine indexing is intentionally disabled for this unfinished local booking preview. Enable indexing and review metadata/canonicals only when preparing an authorized public release.

## Content and design

`SOURCE-CONTENT.md` records the extracted information. `lib/content.json` contains the original page bodies. `lib/assets.json` tracks original image URLs and local copies. Original downloads are retained alongside optimized WebP copies.

Design inspiration: the [Awwwards website collection](https://www.awwwards.com/websites/) and [Tengile MalaMala Collection](https://www.awwwards.com/sites/tengile-malamala-collection), inspected live. See `DESIGN.md` for the design audit.

## Motion

The transitions.dev motion integration and tuning guide are documented in [MOTION.md](./MOTION.md). Shared tokens govern route/section reveals, navigation, calendar feedback, booking steps, dialogs and gallery interactions, with reduced-motion support.

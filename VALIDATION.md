# Validation

Completed 4 October 2026.

- Production build and TypeScript: passed.
- Nine booking calculation tests: passed.
- All eight business/content routes: HTTP 200.
- Browser-verified empty-date validation, Saturday restriction and whole-property recovery, two-night RM3600 quote and RM1800 deposit, guest-form completion with no reservation, gallery next-image and Escape, mobile navigation, no horizontal overflow, light/dark mode.
- Original content, published rates and photos retained; local source snapshot included.

## Lighthouse

Production build, default simulated mobile throttling on localhost. Scores are lab measurements, not live hosting guarantees.

- performance: 88
- accessibility: 100
- best-practices: 100
- seo: 63

- first-contentful-paint: 0.8 s
- largest-contentful-paint: 3.9 s
- total-blocking-time: 20 ms
- cumulative-layout-shift: 0

SEO is intentionally limited by noindex on this frontend-only local preview. No live booking, inventory, payment, Vercel or Supabase integration was exercised or connected.

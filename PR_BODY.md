# Marketing UI polish, build hardening, and iframe cleanup

## Summary

This change set improves visual consistency across marketing pages (equal-height cards, aligned footers/CTAs, less distracting horizontal `Reveal` stagger), makes `next build` succeed when Supabase env vars are missing, and removes an invalid iframe permission that logged console errors in Chromium.

## What changed

- **Card grids:** Applied `items-stretch`, `h-full` / `min-h-0` on `Reveal` wrappers where needed, and `flex flex-col` with `flex-1` / `mt-auto` patterns so multi-column rows align cleanly (use cases, blog demo hub, compare pages, anti-pattern detail pages, home pipeline/SDLC strips, docs architecture sections, pricing/security/customers/ROI, demos, error/not-found cards, sales deck, etc.).
- **Motion:** Reduced “staircase” animation on same-row metrics/cards by using a **single delay** per row instead of `index * 50` style offsets where it hurt readability.
- **Use cases hub:** Slugs and structured-data URLs aligned with real routes (e.g. `limit-firewall`, `automated-pr-reviews`, `self-healing-ui-tests`).
- **Book pilot / build:** `lib/supabaseClient` returns `null` without URL/key; `book-pilot` guards submit and surfaces a clear message instead of crashing prerender.
- **Embeds:** Dropped `web-share` from `allow` on hero + demo iframes to avoid `Unrecognized feature: 'web-share'` in the console.
- **Mixed DML page:** Setup vs non-setup column cards and the three stat tiles use the same stretch/flex pattern; paired column `Reveal` delays unified.

## How to verify

- `npm run build` — all **32** static routes prerender.
- Spot-check `/`, `/use-cases`, `/anti-patterns/mixed-dml`, `/docs#architecture`, `/book-pilot` (form renders; submit without env shows alert instead of throwing).

## Screenshots

_(GitHub will resolve these once the branch is pushed; paths are relative to repo root.)_

| Area | Preview |
|------|--------|
| Home hero | ![Home](https://github.com/shodh-ai/Jataka-v2/raw/feat/ui-marketing-layout-supabase-iframe-fixes/.github/pr-screenshots/01-home.png) |
| Mixed DML — rule section | ![Mixed DML](https://github.com/shodh-ai/Jataka-v2/raw/feat/ui-marketing-layout-supabase-iframe-fixes/.github/pr-screenshots/02-mixed-dml-rule.png) |
| Use cases hub | ![Use cases](https://github.com/shodh-ai/Jataka-v2/raw/feat/ui-marketing-layout-supabase-iframe-fixes/.github/pr-screenshots/03-use-cases-hub.png) |

## Notes

- **Dependency file:** `package-lock.json` updated from install/build in this workspace; review if you prefer lock file-only PRs separately.

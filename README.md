# Zafaran

Bilingual (Arabic RTL / English LTR) animated landing page for a restaurant.
Astro 7, Tailwind v4, no backend, no database — it builds to static files.

```bash
pnpm install
pnpm dev            # http://localhost:4321
pnpm build          # → dist/, deploy that folder anywhere
pnpm preview
```

## Routes

| Path | What |
|---|---|
| `/` | Language gate. Reads a saved choice, else `navigator.languages`, then redirects. `<noscript>` shows two links. |
| `/en/`, `/ar/` | The landing page. Same components, one dictionary each. |
| `/en/privacy/`, `/en/terms/` (+ `/ar/`) | Legal, `noindex`. |
| `/404` | Branded, `noindex`. |

## Where to change things

- **All copy** — `src/lib/en.ts` and `src/lib/ar.ts`. Both satisfy the `Dictionary`
  type in `src/lib/dict.ts`, so a missing key is a build error, not a blank page.
- **Contact details, map links, phone** — the `site` object in `src/lib/dict.ts`.
- **Colour, type, spacing, motion tokens** — the `@theme` block in `src/styles/global.css`.
  Text styling goes through the `.t-*` role classes; don't set sizes on elements.
- **Photos** — Unsplash ids in the dictionaries. `src/components/Photo.astro` builds the
  srcset. Swapping a photo means swapping an id and its alt text in both languages.

## Two things that will bite you

**All motion lives in `src/scripts/reveal.ts`.** Sections carry `data-reveal`,
`data-reveal-delay`, `data-tagline`/`data-word` and nothing else. Adding an
IntersectionObserver or a scroll listener in a component will fight it.

**Arabic is not a translation layer.** `[dir="rtl"]` overrides in `global.css` bump
body sizes a step, loosen line-height a step, and force `tracking-normal` — positive
letter-spacing breaks Arabic letter joins. Use logical properties (`ms-`, `pe-`,
`text-start`) everywhere; the only `rtl:` variants in the codebase are the hero
gradient and arrow-icon mirroring.

## Docs

`docs/DESIGN-BRIEF.md` (brand, tokens, motion table, photo set),
`docs/PAGE-SPEC.md` (section-by-section content in both languages),
`docs/BUILD-PLAN.md` (contracts), `docs/ASTRO7-FACTS.md` (verified Astro 7 API).

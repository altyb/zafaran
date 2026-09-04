# Zafaran — build plan

Project root: `/data/projects/zafaran`. Read first: `docs/ASTRO7-FACTS.md` (Astro 7, not 5), `docs/DESIGN-BRIEF.md`, `docs/PAGE-SPEC.md`.

**The foundation is already built and builds green.** This plan covers only what remains: the dictionary, the chrome and pages, and the eight sections. Five streams over disjoint file sets; nobody edits a file outside their row, and nobody edits a foundation file. If the spec is silent, pick the smallest thing that satisfies DESIGN-BRIEF and PAGE-SPEC and leave a one-line `// spec-gap:` comment.

## 0. What exists (frozen — read, do not edit)

| File | What it gives you |
|---|---|
| `astro.config.mjs` | i18n `en`/`ar` (both prefixed, no auto-redirect), self-hosted Manrope (`--font-manrope`) + Readex Pro (`--font-readex`), Tailwind v4 via Vite. |
| `src/styles/global.css` | Colour tokens (`bg-ink bg-surface bg-surface-raised bg-surface-deep border-line text-saffron bg-saffron bg-saffron-hover text-fg text-fg-muted from-fg to-fg-muted`), `font-sans`/`font-arabic`, `ease-fluid`, `--dur-*`. Type roles `.t-display .t-tagline .t-h2 .t-h3 .t-eyebrow .t-lead .t-body .t-small .t-button .t-nav .t-price .t-faq-q .t-wordmark`, each with its `[dir="rtl"]` override. `.t-gradient` (the hero line gradient, RTL-mirrored). `.container-page`, `.section-y`. `.btn .btn-lg .btn-primary .btn-secondary`. `section[id]{scroll-margin-top:96px}`. `.js [data-reveal]` / `.is-revealed` / `data-reveal="scale"`, `[data-word]` / `.is-lit`, and the reduced-motion block. `body` text colour is `fg-muted` — headings and emphasised text set `text-fg` explicitly. **Missing on purpose, added by the owning stream as a scoped `<style>`:** `#sticky-cta` translate, `details::details-content` transition, hamburger bars, overlay stagger. |
| `src/layouts/Base.astro` | `Props { locale: Locale; title: string; description: string; ogId?: string; noindex?: boolean }`. Sets `<html lang dir>`, adds the `.js` class before paint, both `<Font>` tags, title/description/canonical/hreflang/og/twitter/theme-color/favicon, **the skip link**, `<slot />`, and imports `reveal.ts`. Pages render `<main id="main">` themselves. |
| `src/lib/i18n.ts` | `LOCALES`, `Locale`, `DEFAULT_LOCALE`, `LOCALE_META[locale] = { dir, label, tag, ogLocale }`, `isLocale()`, `otherLocale()`. `LOCALE_META[x].label` is the language name in its own language — use it for the switch label. |
| `src/components/Photo.astro` | `Props { id; alt; ratio: '16/9'|'4/3'|'3/4'; sizes?; priority?; class? }`. Builds the Unsplash `srcset` (480…1920), width/height, lazy/eager. **Does not forward `data-*` attributes** — wrap it in a `<div>` when you need `data-reveal="scale"`. |
| `src/components/Icon.astro` | `Props { name: string; weight?: 'regular'|'fill'; class?; mirror? }`. Inline Phosphor SVG, `aria-hidden`, `mirror` adds `rtl:-scale-x-100`. Default class `size-5`. Names used on this site: `arrow-right arrow-up-right caret-down phone whatsapp-logo envelope-simple instagram-logo map-pin clock car star` (`star` with `weight="fill"`). |
| `src/scripts/reveal.ts` | All observers, all IntersectionObserver: `[data-reveal]` (+ auto 120ms sibling stagger, `data-reveal-delay` override) → `.is-revealed`; `[data-tagline] [data-word]` → `.is-lit`, reversible, 90ms stagger, DOM order; `#hero` out of view → `#sticky-cta.is-visible`; `#nav-toggle` / `#nav-overlay` → `.is-open` + `aria-expanded`, scroll lock, `Escape`, link-click close, focus move. **Section and chrome files add markup only — no observers, no listeners.** |
| `src/pages/index.astro` | The `/` language gate (`localStorage['zafaran:lang']` → `navigator.languages` → `/en/`), no-JS links. Done. |
| `public/favicon.svg` | Done. |

Global rules for every stream:
- **pnpm** only. Build check: `pnpm build`; types: `pnpm astro check`. Dev server: `pnpm astro dev --background`.
- Tailwind utilities + the `.t-*`/`.btn*`/`.container-page`/`.section-y`/`.t-gradient` classes. `<style>` blocks only where §2.5/§2.6 name them. Inline `style=` only for `--i` in the mobile menu.
- Colours: the tokens above plus `bg-black/80` (overlay), `bg-scrim` does not exist — use `bg-black/50` for photo scrims, `bg-ink/70` for glass (nav pill, sticky bar), `border-saffron/60` for card hover. No other hex anywhere, no gradients except `.t-gradient`.
- Spacing: only `0 0.5 1 2 3 4 6 8 10 12 16 20 24` steps. Font sizes: only `text-xs…text-9xl`, and only through `.t-*`. Radii: only `rounded-full|3xl|2xl`. No italics (`not-italic` on `<address>` is the one exception), no weight above 700.
- Direction: logical properties only (`ms- me- ps- pe- start- end- text-start`). `rtl:` appears nowhere in your files (the gradient and icon mirroring already handle it). Physical `left/right/ml/mr/pl/pr/text-left/text-right/flex-row-reverse` are build failures. `inset-0`, `inset-x-0`, `top-*`, `bottom-*` are fine.
- Motion: only `ease-fluid`, only `duration-700`. No `transition-all`. No `addEventListener` anywhere except the 4-line language-switch script in `Nav.astro`.
- No user-facing string literals in any component or page: everything comes from `getDict(locale)`.

## 1. File ownership

| Stream | Owns | Starts |
|---|---|---|
| **S1 Content** | `src/lib/dict.ts`, `src/lib/en.ts`, `src/lib/ar.ts` | now |
| **S2 Chrome & pages** | `src/components/Nav.astro`, `src/components/Footer.astro`, `src/components/StickyCta.astro`, `src/pages/[locale]/index.astro`, `src/pages/[locale]/privacy.astro`, `src/pages/[locale]/terms.astro`, `src/pages/404.astro`, `public/robots.txt`, and the **initial stubs** of the eight section files (step 0, below) | now (step 0 first) |
| **S3 Hero / Trust / Story** | `src/components/sections/Hero.astro`, `Trust.astro`, `Story.astro` | after S1 and S2 step 0 |
| **S4 Menu / Tagline** | `src/components/sections/Menu.astro`, `Tagline.astro` | after S1 and S2 step 0 |
| **S5 Visit / FAQ / CTA** | `src/components/sections/Visit.astro`, `Faq.astro`, `Cta.astro` | after S1 and S2 step 0 |

`README.md`, `AGENTS.md`, `docs/`, and every file in §0 are frozen.

## 2. Remaining contracts (verbatim)

### 2.1 `src/lib/dict.ts` — types, site facts, helpers (S1 writes; everyone imports)

```ts
import type { Locale } from './i18n';
export type { Locale };

export interface Photo { id: string; alt: string }
export interface Link { label: string; href: string }
export interface Dish { name: string; desc: string; price: number; photo: Photo }
export interface HoursRow { days: string; time: string }
export interface Faq { q: string; a: string }
export interface LegalPage { title: string; paragraphs: string[] }
export interface Header { eyebrow: string; title: string; lead?: string }

export interface Dictionary {
  meta: { title: string; description: string; ogAlt: string };
  common: {
    brand: string;
    reserve: string; reserveShort: string; call: string;
    openMenu: string; mainNav: string;
    whatsappMessage: string;
  };
  nav: { links: Link[] };                       // exactly 3, hrefs '#menu' '#visit' '#faq'
  hero: Header & { lines: string[]; lead: string; primary: string; secondary: string; photo: Photo };
  trust: { ratingLabel: string; items: { value: string; label: string; icon?: string }[] }; // exactly 4
  story: Header & { paragraphs: string[]; caption: string; photos: [Photo, Photo] };
  menu: Header & { dishes: Dish[]; note: string };   // exactly 6
  tagline: { lines: string[] };                       // exactly 3
  visit: Header & {
    hours: { title: string; rows: HoursRow[]; note: string };
    address: { title: string; lines: string[]; google: string; apple: string };
    contact: { title: string; phoneLabel: string; whatsappLabel: string; emailLabel: string; instagramLabel: string };
    parking: { title: string; body: string };
  };
  faq: Header & { items: Faq[] };                     // exactly 9
  cta: Header & { lead: string; primary: string; secondary: string; fallback: string; photo: Photo };
  footer: { blurb: string; explore: string; contact: string; hours: string; privacy: string; terms: string; copyright: string };
  legal: { privacy: LegalPage; terms: LegalPage };
  notFound: { eyebrow: string; title: string; body: string; back: string };
}

export const site = {
  name: 'Zafaran',
  phoneE164: '+97143852216',
  phoneDisplay: '+971 4 385 2216',
  whatsappNumber: '97143852216',
  email: 'hello@zafaran.ae',
  instagramUrl: 'https://instagram.com/zafaran.dxb',
  mapsGoogle: 'https://maps.google.com/?q=Gate+Village+Building+7+DIFC+Dubai',
  mapsApple: 'https://maps.apple.com/?q=Gate+Village+Building+7+DIFC+Dubai',
  heroPhotoId: '1663530761401-15eefb544889',
  notFoundPhotoId: '1500217052183-bc01eee1a74e',
} as const;

import { en } from './en';
import { ar } from './ar';
export const getDict = (l: Locale): Dictionary => (l === 'ar' ? ar : en);
export const formatPrice = (l: Locale, n: number) => (l === 'ar' ? `${n} د.إ` : `AED ${n}`);
export const whatsappUrl = (l: Locale) =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(getDict(l).common.whatsappMessage)}`;
export const localePath = (l: Locale, path = '') => `/${l}/${path}`;   // localePath('ar', 'privacy/') → '/ar/privacy/'
```
`Header.lead` is present for `hero`, `menu`, `cta`; absent for `story`, `visit`, `faq`. `hero.title` = the two lines joined with a space. Skip-link, language-switch label and `closeMenu` are not in the dictionary: the skip link lives in `Base`, the switch label is `LOCALE_META[otherLocale(locale)].label`, and the toggle keeps one `aria-label` (`openMenu`) with state in `aria-expanded`.

`en.ts`: `import type { Dictionary } from './dict'; export const en: Dictionary = { … }`. Same for `ar.ts`. (`dict.ts` importing `en.ts` while `en.ts` imports a type from `dict.ts` is a type-only cycle and is fine.)

### 2.2 Component signature

Every file in `src/components/sections/`, plus `Nav`, `Footer`, `StickyCta`:
```ts
import { getDict, /* formatPrice, whatsappUrl, site, localePath as needed */ type Locale } from '../../lib/dict';
interface Props { locale: Locale }
const { locale } = Astro.props; const d = getDict(locale);
```
Section ids are fixed: `hero trust story menu tagline visit faq cta`. Hero's `<section>` must have `id="hero"` (the sticky-bar observer keys off it).

### 2.3 Markup recipes (so five agents produce identical DOM)

- **Section:** `<section id="…" class="section-y"><div class="container-page">…</div></section>`. Trust uses `class="py-12"` instead of `section-y`. Hero and CTA are full-bleed (PAGE-SPEC).
- **Header block:** `<div data-reveal><p class="t-eyebrow">{d.x.eyebrow}</p><h2 class="t-h2 text-fg mt-2">{d.x.title}</h2>{d.x.lead && <p class="t-lead mt-4 max-w-2xl">{d.x.lead}</p>}</div>` — then content at `mt-8 md:mt-12`.
- **Buttons:** `<a class="btn btn-primary">`, `<a class="btn btn-secondary">`, add `btn-lg` for hero/CTA/overlay; icon after the label: `<Icon name="…" class="size-4" />` (`size-5` inside `btn-lg`). External: `target="_blank" rel="noopener"`. Icon-only: `btn btn-secondary size-12 p-0` + `aria-label`.
- **Reserve link:** always `href={whatsappUrl(locale)}`, external. **Call link:** `href={`tel:${site.phoneE164}`}`.
- **Photo with reveal:** `<div class="…" data-reveal="scale"><Photo … class="size-full object-cover" /></div>`.
- **LTR islands in Arabic:** `<span dir="ltr" class="inline-block">{time | phone | email | handle}</span>` — emit it in both locales (harmless in EN), so nobody branches on locale for it.
- **Card:** `rounded-3xl border border-line bg-surface p-6` (visit, trust) · `rounded-3xl border border-line bg-surface p-2` (menu) · `rounded-2xl border border-line bg-surface` (faq). Borders always all the way around.
- **Nav links from non-home pages:** `href={localePath(locale) + link.href}` (`/en/#menu`); on the home page bare `#menu` is fine — simplest is to always use the prefixed form.

### 2.4 `src/pages/[locale]/index.astro` (S2) — the assembly, in this order and no other

```astro
---
import Base from '../../layouts/Base.astro';
import Nav from '../../components/Nav.astro';
import Footer from '../../components/Footer.astro';
import StickyCta from '../../components/StickyCta.astro';
import Hero from '../../components/sections/Hero.astro';
import Trust from '../../components/sections/Trust.astro';
import Story from '../../components/sections/Story.astro';
import Menu from '../../components/sections/Menu.astro';
import Tagline from '../../components/sections/Tagline.astro';
import Visit from '../../components/sections/Visit.astro';
import Faq from '../../components/sections/Faq.astro';
import Cta from '../../components/sections/Cta.astro';
import { getDict, site, type Locale } from '../../lib/dict';
export function getStaticPaths() { return [{ params: { locale: 'en' } }, { params: { locale: 'ar' } }]; }
const locale = Astro.params.locale as Locale;
const d = getDict(locale);
const jsonLd = {
  '@context': 'https://schema.org', '@type': 'Restaurant', name: site.name,
  telephone: site.phoneE164, email: site.email, url: Astro.url.href,
  image: `https://images.unsplash.com/photo-${site.heroPhotoId}?w=1200&h=630&fit=crop&q=80&auto=format`,
  servesCuisine: ['Middle Eastern', 'Levantine', 'Gulf'],
  address: { '@type': 'PostalAddress', streetAddress: d.visit.address.lines.slice(0, 2).join(', '), addressLocality: 'Dubai', addressCountry: 'AE' },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Sunday','Monday','Tuesday','Wednesday','Thursday'], opens: '12:00', closes: '23:30' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Friday','Saturday'], opens: '12:00', closes: '00:30' },
  ],
};
---
<Base locale={locale} title={d.meta.title} description={d.meta.description}>
  <Nav locale={locale} />
  <main id="main">
    <Hero locale={locale} /><Trust locale={locale} /><Story locale={locale} />
    <Menu locale={locale} /><Tagline locale={locale} /><Visit locale={locale} />
    <Faq locale={locale} /><Cta locale={locale} />
  </main>
  <Footer locale={locale} /><StickyCta locale={locale} />
  <script type="application/ld+json" set:html={JSON.stringify(jsonLd)} />
</Base>
```

### 2.5 `Nav.astro` scoped style (the only place these rules live)

```css
<style is:global>
  /* hamburger: two bars, morph to X (M5) */
  #nav-toggle span { position: absolute; inset-inline-start: 0.75rem; top: 50%; height: 2px; width: 1.5rem; background: var(--color-fg); transition: transform var(--dur-fast) var(--ease-fluid); }
  #nav-toggle span:first-child { transform: translateY(-4px); }
  #nav-toggle span:last-child  { transform: translateY(4px); }
  #nav-toggle[aria-expanded="true"] span:first-child { transform: rotate(45deg); }
  #nav-toggle[aria-expanded="true"] span:last-child  { transform: rotate(-45deg); }
  /* overlay items (M7) */
  #nav-overlay [style*="--i"] { transform: translateY(3rem); opacity: 0; transition: transform var(--dur-fast) var(--ease-fluid), opacity var(--dur-fast) var(--ease-fluid); transition-delay: calc(var(--i) * 80ms); }
  #nav-overlay.is-open [style*="--i"] { transform: none; opacity: 1; }
  @media (prefers-reduced-motion: reduce) { #nav-overlay [style*="--i"] { transform: none; } }
</style>
```
The toggle is `<button id="nav-toggle" …><span></span><span></span></button>` — exactly two spans. Overlay visibility/opacity classes are utilities on the element (PAGE-SPEC §1). The language switch script:
```html
<script is:inline>
  document.querySelectorAll('[data-lang-switch]').forEach(function (a) {
    a.addEventListener('click', function () { try { localStorage.setItem('zafaran:lang', a.getAttribute('data-lang-switch')); } catch (e) {} });
  });
</script>
```
Footer's switch carries the same `data-lang-switch` attribute and needs no script of its own (Nav's script binds all of them; on pages without Nav there is no switch).

### 2.6 Scoped styles owned by S5 and S2

`Faq.astro`:
```css
<style is:global>
  #faq details::details-content { block-size: 0; overflow: hidden; transition: block-size var(--dur-fast) var(--ease-fluid), content-visibility var(--dur-fast) allow-discrete; }
  #faq details[open]::details-content { block-size: auto; }
  @media (prefers-reduced-motion: reduce) { #faq details::details-content { transition: none; } }
</style>
```
`StickyCta.astro`:
```css
<style is:global>
  #sticky-cta { translate: 0 100%; transition: translate var(--dur-fast) var(--ease-fluid); }
  #sticky-cta.is-visible { translate: 0 0; }
  @media (prefers-reduced-motion: reduce) { #sticky-cta { transition: none; } }
</style>
```
No other file has a `<style>`.

## 3. RTL story (read this even if your stream "has no Arabic")

1. `dir="rtl"` on `<html>` is the only switch; everything else follows from logical CSS. You never write `rtl:` — `.t-gradient` and `Icon mirror` already do.
2. Flex and grid flow start→end. A `justify-between` row with a title and a price is correct in both languages untouched. No `flex-row-reverse`, no `order-*`.
3. Icons: only arrows get `mirror`. Phone, clock, pin, car, caret, star, logos are identical in RTL. The hamburger is symmetric.
4. Bidi islands: times, phone, e-mail, `@handle` → `<span dir="ltr" class="inline-block">` in both locales. Prices via `formatPrice` need nothing.
5. Fonts switch with `html[lang]`. The only cross-language text is the switch label: give it `lang`, `dir` and `font-sans`/`font-arabic` of its *target*.
6. Tracking: never add `tracking-*` to an element; the `.t-*` roles zero it in Arabic.
7. Tagline: words emitted in DOM order, lit in DOM order; DOM order is reading order in both directions. Add nothing.
8. `text-start` everywhere; only the pill (`mx-auto`) and icon chips are centred.

## 4. Workstreams

### S1 — Content
Write `dict.ts` exactly as §2.1, then `en.ts` and `ar.ts` transcribing every string in PAGE-SPEC (keys in `[brackets]`) and the photo ids/alts in DESIGN-BRIEF §7. Prices as numbers; `hours.rows[].time` is the bare `12:00 – 23:30`. No Arabic-Indic digits (`grep -P '[\x{0660}-\x{0669}]' src/lib/ar.ts` empty). Keep the tashkeel exactly as in the spec.
Acceptance: `pnpm astro check` clean for `src/lib/`; counts 3/4/6/3/9 for `nav.links / trust.items / menu.dishes / tagline.lines / faq.items` in both files; every `photo.id` is in DESIGN-BRIEF §7.

### S2 — Chrome & pages
**Step 0 (do first, then tell the coordinator):** create `src/pages/[locale]/index.astro` per §2.4 and the eight section stubs, each exactly:
```astro
---
import type { Locale } from '../../lib/dict';
interface Props { locale: Locale }
---
<section id="<id>" class="section-y"><div class="container-page"><p class="t-body">stub: <id></p></div></section>
```
(Hero stub: `id="hero"`.) Then `Nav.astro` (PAGE-SPEC §1 + §2.5), `Footer.astro` (§11), `StickyCta.astro` (§10 + §2.6), `privacy.astro`/`terms.astro` (§12, `getStaticPaths` for both locales, Nav + Footer, no StickyCta), `404.astro` (§13), `public/robots.txt` (`User-agent: *` / `Allow: /`).
Acceptance: at 375px the pill shows wordmark / switch / hamburger only; tapping the hamburger rotates both bars into an X (none disappears) and opens the `bg-black/80 backdrop-blur-3xl` overlay with five staggered items; `Escape` closes and focus returns to the button; the page does not scroll behind it; overlay links are not tabbable when closed. Clicking the switch on `/en/` lands on `/ar/` and `localStorage['zafaran:lang'] === 'ar'`; on `/en/privacy/` it lands on `/ar/privacy/`. `/en/privacy/`, `/ar/terms/`, `/404` build; 404 shows both languages with the Arabic block in Readex Pro, RTL. Footer bottom row clears the sticky bar at 375px.

### S3 — Hero, Trust, Story
PAGE-SPEC §2, §3, §4. Hero is full-bleed with `id="hero"`, `relative min-h-svh flex items-end`; photo wrapper `data-reveal="scale"`; scrim `bg-black/50`; lines use `.t-gradient`; explicit `data-reveal-delay` 0/120/240/360/480.
Acceptance: at 1440px the h1 is two lines, each its own gradient, never wider than 680px; at 375px the two buttons stack full-width and Reserve is visible without scrolling; in `/ar/` the bright end is on the right; `#trust` is 2×2 at 375px and 1×4 at 1024px; Story text precedes photos at 375px and is `col-span-5` at 1024px; the only `bg-clip-text` in the built HTML is on the two h1 lines.

### S4 — Menu, Tagline
PAGE-SPEC §5, §6. Tagline: `d.tagline.lines.map(line => <span class="block">{line.split(' ').map(w => <><span data-word>{w}</span>{' '}</>)}</span>)` inside `<p data-tagline class="t-tagline text-fg">`.
Acceptance: six cards at 1/2/3 columns for 375/640/1024; hover scales only the photo and warms the border to `saffron/60`; `AED 92` on `/en/`, `92 د.إ` on `/ar/`; scrolling the tagline to mid-viewport lights words one at a time in reading order (right-to-left on `/ar/`) and scrolling back up dims them; `prefers-reduced-motion` shows every word at full opacity; `dist/en/index.html` contains 16 `data-word` spans and `dist/ar/index.html` 15.

### S5 — Visit, FAQ, CTA
PAGE-SPEC §7, §8, §9 + the `Faq.astro` style in §2.6. No JS.
Acceptance: at 375px the cards read Hours, Address, Contact, Parking; on `/ar/` times and the phone number read left-to-right inside RTL text; map links open in a new tab with `rel="noopener"`; opening one FAQ closes the other and the caret rotates 180° over 700ms; `summary` shows the saffron ring on `Tab`; CTA secondary is `tel:+97143852216`; both CTA buttons fit at 375px without horizontal scroll.

## 5. Integration check (whoever lands last)

1. `pnpm build` and `pnpm astro check` clean; `dist/en/index.html`, `dist/ar/index.html`, `dist/en/privacy/`, `dist/ar/terms/`, `dist/404.html` exist.
2. `grep -rnE "\b(ml|mr|pl|pr|left|right)-[0-9a-z]|text-(left|right)|flex-row-reverse|rtl:" src/components src/pages` → empty (`Icon.astro` is the one file allowed `rtl:`).
3. `grep -rn "addEventListener" src/components src/pages` → only the language-switch script in `Nav.astro`. `grep -rnE "transition-all|ease-(in|out|in-out|linear)\b|duration-(1|2|3|4|5|6)00\b" src` → empty.
4. `grep -rnE "\bitalic\b|font-(extrabold|black)" src` → empty except `not-italic` on `<address>`.
5. `grep -rnE "#[0-9a-fA-F]{6}" src` → only `global.css`, `Base.astro`, `pages/index.astro`.
6. `grep -rnE "text-\[|\b(p|px|py|m|mt|mb|gap|space-y)-(5|7|9|11|14|28|32)\b" src` → empty.
7. Every `<img>` in `dist/**/index.html` has a non-empty `alt`; no `fonts.googleapis.com` in `dist`; every `images.unsplash.com` URL in `dist` uses one of the DESIGN-BRIEF §7 ids.
8. Lighthouse mobile on `/en/` and `/ar/`: Accessibility 100, Best Practices ≥ 95. Keyboard walk from the skip link to the footer switch shows a ring at every stop.
9. Visual on `/ar/` at 375px: no Latin-style tracking, no broken letter joins, body copy larger and looser than `/en/`, Western numerals, times and phone LTR.

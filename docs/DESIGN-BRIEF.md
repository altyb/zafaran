# Zafaran — design brief

> **Name decision:** the brand is **Zafaran / زعفران**, as suggested. Keep it: it is a real word in both languages, pronounceable by an English speaker without a guide, the Arabic is a single unambiguous spelling, and it names the accent colour and the ingredient that runs through the menu — one word carries brand, colour and food. "Saffra" (the scaffold name) reads as صفرة, "yellowness", in Arabic, which is not a restaurant.
> The directory is already `/data/projects/zafaran`. The foundation stream sets `package.json` `name` to `zafaran` and `site` to `https://zafaran.example`. Nothing in `src/` references the directory name.

This document settles the brand and the visual system. Nobody downstream re-decides anything in it. Where a value is not listed here, it is not allowed.

## 1. Brand

| | |
|---|---|
| Name | Zafaran (EN) · زعفران (AR) |
| Legal name | Zafaran Restaurant LLC · مطعم زعفران ذ.م.م |
| Positioning (one line) | Wood-fired cooking from the Gulf and the Levant, in DIFC, since 2017. |
| Concept | A 47-seat restaurant built around a single wood-fired oven. Gulf and Levantine dishes (sambousek, kofta, slow lamb, cured fish) cooked over coals, with saffron in most of them. A chef's counter for six. Licensed, halal kitchen. |
| City / address | Gate Village, Building 7, ground floor, DIFC, Dubai |
| Founded | Autumn 2017 |
| People | Chef and co-founder **Yara Nassar** (Beirut–Dubai). Co-founder, front of house: **Tariq Al Mansoori**. |
| Domain (placeholder) | zafaran.example — site config only; never shown in copy |

**Voice and tone**
- Plain and specific. Numbers, times, ingredients — never adjectives doing the work of facts. "Goes into the coals at 4, comes out at 11", not "slow-cooked to perfection".
- Warm, not effusive. The restaurant is confident enough not to sell. Sentence case everywhere, active voice, short sentences.
- Bilingual by design, not by translation. Arabic copy is written for an Arabic reader (idiom, numerals, phrasing); it is not a gloss of the English.

## 2. Colour tokens

Tailwind v4 `@theme` names. Utilities are derived: `bg-ink`, `text-fg-muted`, `border-line`, `bg-saffron`, etc.

| Token | Hex | Used for |
|---|---|---|
| `--color-ink` | `#131209` | Page background (warm near-black — the only page background). Also `ring-offset` colour for focus rings. |
| `--color-surface` | `#1F1F1F` | Cards: menu cards, visit cards, FAQ items (closed), trust strip card |
| `--color-surface-raised` | `#272727` | FAQ item when open; card hover where a bg change is specified |
| `--color-surface-deep` | `#181818` | Footer background |
| `--color-line` | `#313131` | Every 1px border. Borders always go all the way around, or are absent. |
| `--color-saffron` | `#E9A83B` | The single accent: primary button bg, eyebrows, prices, rating star, focus outline, link hover colour, lit tagline words do NOT use it (they go white) |
| `--color-saffron-hover` | `#F3BE5E` | Primary button hover/active bg |
| `--color-fg` | `#FFFFFF` | Headings, body on dark, button text on secondary buttons |
| `--color-fg-muted` | `#9B9B9B` | Body copy, descriptions, small print, nav links at rest, unlit word colour base. Deliberately equal to the hero-gradient end colour so the palette has exactly two greys of text. Contrast on `#131209` ≈ 6.6:1. |
| (utility) `bg-black/50` | `#000000` @ 50% | Flat scrim over the hero and CTA photographs. A flat colour, not a gradient. |
| (utility) `bg-ink/70` | `#131209` @ 70% | Nav pill and sticky CTA bar background, always paired with `backdrop-blur-xl` |
| (utility) `bg-black/80` | `#000000` @ 80% | Mobile menu overlay (mandated) |

Rules: no other hex anywhere in `src/` (the built `global.css`, `Base.astro` theme-color and the `/` gate's inline fallback style are the only holders). No background gradients. The hero `h1` is the only gradient in the site, on text only, `#FFFFFF → #9B9B9B` (see §3).

**Why saffron, defended in one paragraph.** Amber/saffron is the one warm accent that carries no conflicting meaning across the site's two audiences: red reads as warning or as the flag in one culture and as luck/celebration in the other; green is sacred in one and "go/success" in the other; blue is cold for food. Saffron is the ingredient, it photographs the way the food looks under oven light, it passes contrast on every dark surface in the list as both text and as a button fill (`#131209` on `#E9A83B` ≈ 9.4:1), and it sits inside the warm-black `#131209` family so the page reads as one material rather than as a grey UI with an orange sticker.

## 3. Type system

**Latin: Manrope** (400, 500, 600, 700). Geometric with humanist warmth — open apertures and slightly soft terminals suit food better than Geist's engineering tone; Poppins is too round for a premium room.

**Arabic: Readex Pro** (400, 500, 600, 700). A modern Kufi-influenced sans with a large, even x-height, geometric bowls and gently softened corners — the same design logic as Manrope, so the two pages look like one brand rather than two sites. It ships every weight Manrope uses (Tajawal lacks 600; Cairo's naskh warmth reads as a different brand next to Manrope). It is on Google Fonts with `arabic` + `latin` subsets, so Astro self-hosts it at build time like Manrope.

Both loaded through Astro 7 top-level `fonts` (see BUILD-PLAN §2.1). `cssVariable`s are `--font-manrope` and `--font-readex`; Tailwind exposes them as `font-sans` and `font-arabic`. `html[lang="ar"]` switches `body` to `font-arabic`. Any element whose text is in the *other* language gets `lang="…"` + the matching `font-*` class (the language switcher label is the main case).

**Global rules**
- No italics anywhere. No weight above 700.
- Every size is a Tailwind default step. No arbitrary font sizes.
- Latin headings use `tracking-tight`. **Every Arabic override sets `tracking-normal`** — positive or negative tracking breaks Arabic letter joins.
- Arabic body/lead/small/nav copy is one step larger than Latin (glyphs read ~10–15% smaller at equal px). Display sizes are not bumped (Readex Pro is wide; 60px already fills the 680px cap).
- Arabic line-height is one step looser than Latin on every row.
- Numerals are Western `0-9` in both languages, always. Prices, times and phone numbers use `tabular-nums`. Inside Arabic text, times, phone numbers and the Instagram handle are wrapped `<span dir="ltr" class="inline-block">` so bidi never flips a dash or a plus sign.
- Headings use `text-wrap: balance`; body uses `text-wrap: pretty` (set globally).

**Role table.** Implemented as classes in `global.css` (foundation stream) so all six streams produce identical text. Implementers use the class, never the raw utilities.

| Role | Class | Latin (EN) | Arabic override (`[dir="rtl"] .class`) | Colour |
|---|---|---|---|---|
| Hero heading | `.t-display` | `text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-none` | `tracking-normal leading-tight` | gradient (below) |
| Tagline (B11) | `.t-tagline` | `text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight` | `tracking-normal leading-snug` | words: `fg` at 30% → 100% opacity |
| Section heading h2 | `.t-h2` | `text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight` | `tracking-normal leading-snug` | `fg` |
| Card / block heading h3 | `.t-h3` | `text-xl font-semibold tracking-normal leading-snug` | `text-2xl leading-normal` | `fg` |
| Eyebrow | `.t-eyebrow` | `text-xs font-semibold tracking-widest uppercase leading-normal` | `text-sm tracking-normal` (no uppercase exists) | `saffron` |
| Lead (hero sub, section lead) | `.t-lead` | `text-lg md:text-xl font-normal tracking-normal leading-relaxed` | `text-xl md:text-2xl leading-relaxed` | `fg-muted` on sections, `fg` on hero/CTA photos |
| Body | `.t-body` | `text-base font-normal leading-normal` | `text-lg leading-relaxed` | `fg-muted` |
| Small print | `.t-small` | `text-sm font-normal leading-normal` | `text-base leading-relaxed` | `fg-muted` |
| Button | `.t-button` | `text-sm md:text-base font-semibold tracking-normal leading-none` | `text-base md:text-lg` | per variant |
| Nav link | `.t-nav` | `text-sm font-medium tracking-normal leading-none` | `text-base` | `fg-muted` → `fg` on hover |
| Price / stat value | `.t-price` | `text-base font-semibold tabular-nums leading-none` | `text-lg` | `saffron` (price), `fg` (stat) |
| FAQ question | `.t-faq-q` | `text-lg font-medium leading-snug` | `text-xl leading-normal` | `fg` |
| Wordmark | `.t-wordmark` | `text-lg font-semibold tracking-tight leading-none` | `text-xl tracking-normal` | `fg` |

**Hero heading gradient.** Each *line* of the h1 is its own `<span class="block t-gradient">` (`.t-gradient` = `bg-linear-to-r from-fg to-fg-muted bg-clip-text text-transparent`, already RTL-mirrored in `global.css`). Per line, not on the whole h1, for two reasons: a transformed/blurred descendant of a `bg-clip-text` element renders transparent in Chromium, and per-line the bright end is always at the start of each line rather than only on the longest one. In RTL the direction mirrors — `rtl:bg-linear-to-l` — so the white end is where reading starts. (The rule says "left to right"; its intent is "bright at reading start", which in Arabic is the right.)

**Measure.** Hero h1 and lead: `max-w-[680px]`. Section leads: `max-w-2xl`. FAQ answers: none (card width). Body paragraphs in Story: `max-w-prose` is not used; the column is the measure.

## 4. Spacing rhythm

Allowed values only: 0, 2, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96 px (Tailwind `0 0.5 1 2 3 4 6 8 10 12 16 20 24`).

| Use | Mobile | Desktop (`md:`) |
|---|---|---|
| Section vertical padding | `py-16` (64) | `py-24` (96) |
| Trust strip (exception, it is a band not a section) | `py-12` (48) | `py-12` |
| Container | `max-w-6xl mx-auto px-4` | `px-8` |
| Section header: eyebrow → h2 | `mt-2` (8) | same |
| Section header: h2 → lead | `mt-4` (16) | same |
| Section header → content | `mt-8` (32) | `mt-12` (48) |
| Grid gap (cards) | `gap-4` (16) | `gap-6` (24) |
| Card padding | `p-6` (24) | same |
| Menu card | `p-2` (8) frame, text block `p-4` (16) | same |
| Paragraph stack | `space-y-4` (16) | same |
| Button padding | `px-6 py-3` (24/12) → 48px tall | same; `lg` size `px-8 py-4` (32/16) → 56px |
| Button row gap | `gap-4` | same |
| Nav pill | `mt-6` (24) top offset; `p-2` (8) inner; items `px-4 py-2`; `gap-2` | same |
| Hero content | `pt-24 pb-16` | `pb-24` |
| Hero eyebrow → h1 | `mt-4` | same |
| Hero h1 → lead | `mt-4` | `mt-6` (24) |
| Hero lead → buttons | `mt-8` (32) | same |
| Footer | `pt-16 pb-24` (bottom clears the sticky bar) | `py-16` |
| Footer columns gap | `gap-8` (32) | `gap-12` (48) |
| Sticky CTA bar | `p-4` + `env(safe-area-inset-bottom)` | hidden |
| Anchor offset | `scroll-mt-24` (96) on every section | same |

## 5. Radius

Tailwind values only. Nested rule: inner = outer − gap, applied only if result > 2px.

| Element | Radius |
|---|---|
| Nav pill, all buttons, icon chips, hamburger button | `rounded-full` |
| Menu card outer | `rounded-3xl` (24) → image inside with 8px frame: `rounded-2xl` (16) |
| Trust strip card, visit cards, story photos, CTA inner card | `rounded-3xl` (24) |
| FAQ item | `rounded-2xl` (16) |
| Sticky CTA bar, mobile overlay, hero/CTA photos (full-bleed) | none |

## 6. Motion system

Tokens (in `global.css` `@theme`):

```
--ease-fluid: cubic-bezier(0.32, 0.72, 0, 1);   /* the only curve in the site */
--dur-fast:   700ms;   /* hover/colour, hamburger, sticky bar, FAQ open */
--dur-base:   800ms;   /* scroll reveals */
--dur-slow:   1200ms;  /* photo opacity on scale reveal */
--dur-photo:  1600ms;  /* photo scale settle */
```
No `transition: all`, no default `ease`, nothing under 700ms. Scroll detection is IntersectionObserver only — a `scroll` listener anywhere is a build failure.

| # | Animation | Trigger | Property | Duration | Delay / stagger | Reduced motion |
|---|---|---|---|---|---|---|
| M1 | Scroll reveal (generic) `[data-reveal]` | IO, threshold 0.15, rootMargin `0 0 -10% 0`, once | `opacity 0→1`, `translate 0 4rem→0`, `filter blur(12px)→0` | 800ms | `data-reveal-delay="ms"` per element; siblings stagger 120ms | shown instantly, no transition |
| M2 | Photo settle `[data-reveal="scale"]` | same IO | `opacity 0→1`, `scale 1.06→1` | 1200ms / 1600ms | 0 | instant |
| M3 | Hero load sequence | M1 on eyebrow, each h1 line, lead, button row | as M1 | 800ms | 0 / 120 / 240 / 360 / 480ms | instant |
| M4 | Tagline word light-up (B11) `[data-tagline] [data-word]` | IO per word, rootMargin `0 0 -45% 0` (trigger line at 55% of viewport), reversible | `opacity 0.3→1` | 700ms | 90ms × index within the batch of words crossing together | all words at 100% |
| M5 | Nav hamburger → X | click (`aria-expanded`) | bar 1 `-translate-y-1 rotate-0 → translate-y-0 rotate-45`; bar 2 `translate-y-1 → translate-y-0 -rotate-45` | 700ms | 0 | keeps morph (no vestibular content) |
| M6 | Mobile menu overlay | click | `opacity 0→1`, `visibility` | 700ms | 0 | opacity only, 700ms |
| M7 | Mobile menu items | overlay open | `translate-y-12 opacity-0 → translate-y-0 opacity-100` | 700ms | 80ms × index (5 items) | opacity only |
| M8 | Button hover | hover/focus | `background-color`, `border-color` | 700ms | 0 | same (colour is fine) |
| M9 | Button press | `:active` | `scale 1→0.98` | 700ms | 0 | none |
| M10 | Menu card hover | hover on card (`group`) | image `scale 1→1.04`; card `border-color line→saffron/60` | 700ms | 0 | border only |
| M11 | FAQ open | `<details>` toggle | `::details-content block-size 0→auto` (via `interpolate-size`), caret `rotate 0→180` | 700ms | 0 | instant |
| M12 | Sticky CTA bar | IO on `#hero` (not intersecting → show) | `translate 0 100% → 0` | 700ms | 0 | instant |
| M13 | Nav link hover | hover | `color fg-muted→fg` | 700ms | 0 | same |
| M14 | Language switch, page navigation | — | none. Full navigation, no `ClientRouter` (two pages, reveals would replay on every switch) | — | — | — |

Reduced motion is one CSS block (`@media (prefers-reduced-motion: reduce)`) that sets every animated element to its final state with `transition: none`; the script still runs but toggles classes with no visible effect.

## 7. Photo set

All served from `https://images.unsplash.com/photo-{id}?w={w}&h={h}&fit=crop&q=80&auto=format` through the shared `Photo.astro` component (srcset widths 480/768/1080/1440/1920). Every ID below was fetched on 2026-09-03, returned `200 image/jpeg`, and is a plain `photo-` asset (not `premium_photo-`, not `plus.unsplash.com`). Only these eight IDs are permitted.

| ID | Subject (verified by eye) | Used in | Aspect | Alt EN | Alt AR |
|---|---|---|---|---|---|
| `1663530761401-15eefb544889` | Chef spooning sauce onto a plate, dark | Hero (full-bleed, `priority`), og:image (`w=1200&h=630`) | 16:9 | A chef spoons sauce over a plated dish in the dim light of the Zafaran kitchen | طاهٍ يسكب الصلصة فوق طبق في إضاءة مطبخ زعفران الخافتة |
| `1709548145082-04d0cde481d4` | Dim dining room, pendant lamps | Story, photo 1 | 3:4 | The dining room at Zafaran at night, lit by low pendant lamps | صالة زعفران ليلًا تحت مصابيح معلّقة خافتة |
| `1760169799369-2b8574466735` | Cook's hands at the pass, foreground blur | Story, photo 2 | 3:4 | A cook's hands at the pass, plates blurred in the foreground | يدا طاهٍ عند منصّة التقديم، والأطباق ضبابية في المقدّمة |
| `1689672235501-6dc1e56d454c` | Plated cured salmon, white plate | Menu, dish 1 | 4:3 | Slices of cured salmon on a white plate with labneh and herbs | شرائح سلمون مملّح على طبق أبيض مع لبنة وأعشاب |
| `1601050690597-df0568f70950` | Three fried pastries, green dip | Menu, dish 2 | 4:3 | Three fried sambousek pastries on a wooden board with a green dip | ثلاث فطائر سمبوسة مقلية على لوح خشبي مع صلصة خضراء |
| `1529042410759-befb1204b468` | Charred meatballs on rocket | Menu, dish 3 | 4:3 | Charred kofta on a bed of rocket leaves on a white plate | كفتة مشوية على طبقة من الجرجير في طبق أبيض |
| `1603360946369-dc9bb6258143` | Lamb skewers on flatbread | Menu, dish 4 | 4:3 | Grilled lamb skewers on flatbread with sliced onion and tomato | أسياخ ضأن مشوية على خبز رقيق مع شرائح البصل والطماطم |
| `1600891964092-4316c288032e` | Sliced steak with chips, dark wood | Menu, dish 5 | 4:3 | A sliced rib eye steak with chips on a white plate | ستيك ريب آي مقطّع مع بطاطا مقلية في طبق أبيض |
| `1541518763669-27fef04b14ea` | Slow-cooked lamb in patterned dish, moody | Menu, dish 6 | 4:3 | Slow-cooked lamb with vegetables in a patterned earthenware dish | ضأن مطهو ببطء مع الخضار في طبق فخاري منقوش |
| `1414235077428-338989a2e8c0` | Set table, wine glasses, candlelight | CTA (full-bleed) | 16:9 | A set table at Zafaran with wine glasses and candlelight | طاولة مُعدّة في زعفران مع كؤوس وضوء الشموع |
| `1500217052183-bc01eee1a74e` | Single cocktail on wood in a light shaft | 404 page | 3:4 | A single cocktail on a wooden bar in a shaft of light | كأس كوكتيل واحد على بار خشبي تحت شعاع ضوء |

(Eleven rows, eight IDs used on the landing page plus one on the 404 and one shared hero/og.) Dropped from the suggested list after viewing: `1589378938275` (hot-pink cocktail, off-palette), `1776333887723` (grainy B&W, subject unclear), `1727352037068` (bright daylight interior, wrong mood), `1779173932688` (herbs, no use), `1616671285410` (high-key white plate, breaks the dark grid).

## 8. Icons

Phosphor only, `regular` weight, from `@phosphor-icons/core` (dev dependency), inlined by `Icon.astro`. Permitted names: `arrow-right`, `arrow-up-right`, `caret-down`, `phone`, `whatsapp-logo`, `envelope-simple`, `instagram-logo`, `map-pin`, `clock`, `car`, `fork-knife`, `globe`, `star` (fill weight, for the rating). Sizes: `size-4` (16) inline in buttons/labels, `size-5` (20) in list rows, `size-6` (24) in card headers.

**Mirroring in RTL:** only the two arrows mirror (`mirror` prop → `rtl:-scale-x-100`). Everything else — phone, clock, pin, car, logos, caret, star — is the same glyph in both directions. The hamburger/X is symmetric and needs nothing.

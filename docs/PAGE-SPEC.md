# Zafaran — page specification

Single source of truth for layout and copy. Implementers copy from this file and invent nothing. Every string here lands in `src/i18n/en.ts` / `src/i18n/ar.ts` under the key shown in `[brackets]`; components read the dictionary, never hardcode text. Design tokens, type roles and motion names are defined in `DESIGN-BRIEF.md`; component and CSS contracts in `BUILD-PLAN.md`.

Global conventions used below:
- "Desktop" = `md:` (768px) and up; "mobile" = below. `lg:` (1024px) is used only for type steps.
- Every section is `<section id="…" class="section-y"><div class="container-page">…</div></section>` unless marked full-bleed (`section-y` = `py-16 md:py-24`; `container-page` = `mx-auto w-full max-w-6xl px-4 md:px-8`; anchor offset is global). The **header block** is `<div data-reveal><p class="t-eyebrow">{eyebrow}</p><h2 class="t-h2 text-fg mt-2">{title}</h2>[<p class="t-lead mt-4 max-w-2xl">{lead}</p>]</div>`. Buttons are `<a class="btn btn-primary">` / `<a class="btn btn-secondary">`, plus `btn-lg` for the large size; an icon goes after the label as `<Icon name="…" class="size-4" />` (`size-5` inside `btn-lg`). Nothing else is a shared component: only `Photo`, `Icon` and the `Base` layout exist.
- All directional CSS is logical: `ms-/me-/ps-/pe-/start-/end-/text-start/rounded-s-*`. Never `ml-/mr-/pl-/pr-/left-/right-/text-left/text-right`. Flex/grid order is DOM order in both directions; `flex-row-reverse` is banned.
- Reveal: `[data-reveal]` elements get M1; the shared script staggers siblings that enter together by 120ms automatically, and `data-reveal-delay="ms"` overrides that per element where a value is given below. `data-reveal="scale"` (M2) goes on a wrapper `<div>` around `Photo`, never on `Photo` itself (it does not forward attributes). Never put `data-reveal` on an ancestor of a `.t-gradient` element.
- Numerals: Western. In Arabic text, every time range, phone number, e-mail and the Instagram handle are rendered inside `<span dir="ltr" class="inline-block">`. Prices are rendered by `formatPrice(locale, n)` from `src/lib/dict.ts` → EN `AED 92`, AR `92 د.إ`.

Routes: `/` (auto-detect redirect), `/en/`, `/ar/`, `/en/privacy/`, `/ar/privacy/`, `/en/terms/`, `/ar/terms/`, `/404`.

---

## 0. Document head `[meta]`

| | EN | AR |
|---|---|---|
| `<title>` | Zafaran — Wood-fired Arabian kitchen in DIFC, Dubai | زعفران — مطبخ على الحطب في مركز دبي المالي العالمي |
| `description` | Wood-fired cooking from the Gulf and the Levant in Gate Village, DIFC. Lunch from 12, dinner until late. Reserve on WhatsApp. | أطباق الخليج والشام على نار الحطب في جيت فيليدج، مركز دبي المالي العالمي. الغداء من الثانية عشرة والعشاء حتى وقت متأخر. احجز عبر واتساب. |
| `og:image` | `https://images.unsplash.com/photo-1663530761401-15eefb544889?w=1200&h=630&fit=crop&q=80&auto=format` (both) | |
| `[meta.ogAlt]` | hero alt EN (stored in the dictionary; `Base` does not emit `og:image:alt` today) | hero alt AR |
| `og:locale` (from `LOCALE_META`) | `en_US` | `ar_AE` |
| hreflang (from `Base`, same on every page) | `en` → `/en/`, `ar` → `/ar/`, `x-default` → `/en/` | |
| theme-color | `#131209` | |
| JSON-LD `Restaurant` | name, address, telephone, `servesCuisine: ["Middle Eastern","Levantine","Gulf"]`, openingHoursSpecification (from §7 hours), url, image (og) — emitted on `/en/` and `/ar/` only | |

Skip link: already rendered by `Base.astro` (EN "Skip to content" · AR "تخطَّ إلى المحتوى", target `#main`). Pages must therefore render `<main id="main">`. `Base` also emits hreflang for the two home pages on every page (known simplification), both `<Font>` preloads, og tags from `title`/`description`/`ogId`, and `noindex` when asked. JSON-LD is emitted by the landing page itself as `<script type="application/ld+json" set:html={JSON.stringify(jsonLd)} />` inside the slot.

---

## 1. Nav — `#nav` (fixed, not a section)

**Purpose.** Brand, three anchors, language switch, the booking CTA at zero scroll on desktop, the menu toggle on mobile.

**Layout.** `<header>` `fixed inset-x-0 top-0 z-50`. Inside: the pill `mt-6 mx-auto w-max rounded-full bg-ink/70 backdrop-blur-xl border border-line p-2 flex items-center gap-2`.
- Desktop, DOM order: wordmark (`.t-wordmark`, `px-4`, links to `/{locale}/`) → nav links (`.t-nav px-4 py-2 rounded-full text-fg-muted hover:text-fg transition-colors duration-700 ease-fluid`) × 3 → language switch (`.t-nav px-4 py-2 rounded-full`, `lang`/`dir`/`font-*` of the *target* language, `hreflang`) → `<a class="btn btn-primary">` `[common.reserveShort]` (icon `whatsapp-logo`, no mirror).
- Mobile: wordmark → language switch → hamburger button `<button id="nav-toggle" class="relative size-12 rounded-full md:hidden" aria-expanded="false" aria-controls="nav-overlay" aria-label={common.openMenu}>` (the shared script toggles `aria-expanded`; the label stays `[common.openMenu]` — a `<span class="sr-only">` is not needed since the state is in `aria-expanded`). Links and Reserve button are `hidden md:flex`.
- Hamburger: two bars `absolute start-3 top-1/2 h-0.5 w-6 bg-fg` (M5). Never a third bar, never fades out.
- Mobile overlay `<div id="nav-overlay" class="fixed inset-0 z-40 md:hidden bg-black/80 backdrop-blur-3xl invisible opacity-0 transition-[opacity,visibility] duration-700 ease-fluid [&.is-open]:visible [&.is-open]:opacity-100">` (M6), content `flex h-full flex-col justify-center px-8 gap-8`: the three links at `.t-h2` size (`text-fg`), then the language switch, then `<a class="btn btn-primary btn-lg w-full">` `[common.reserve]` — five items, each `<div style="--i: n">` with `translate-y-12 opacity-0` → `.is-open` `translate-y-0 opacity-100`, `transition-delay: calc(var(--i) * 80ms)` (M7). The shared `reveal.ts` already toggles `.is-open` + `aria-expanded`, locks page scroll, closes on `Escape` and on any link click, and moves focus. **Nav.astro ships no `<script>`**; its only `<style is:global>` block is for the two hamburger bars, the `--i` stagger and the overlay items (see BUILD-PLAN §2.5).

**Copy.**

| key | EN | AR |
|---|---|---|
| `[common.brand]` | Zafaran | زعفران |
| `[nav.links[0]]` → `#menu` | Menu | القائمة |
| `[nav.links[1]]` → `#visit` | Visit | زورونا |
| `[nav.links[2]]` → `#faq` | FAQ | الأسئلة الشائعة |
| `[common.reserveShort]` | Reserve | احجز |
| `[common.reserve]` | Reserve a table | احجز طاولة |
| `[common.call]` | Call us | اتصل بنا |
| `[common.mainNav]` | Main | الرئيسية |
| language switch label — `LOCALE_META[otherLocale(locale)].label`, not the dictionary | العربية *(lang="ar" dir="rtl" font-arabic)* | English *(lang="en" dir="ltr" font-sans)* |
| language switch href — `localePath(otherLocale(locale), samePath)` | `/ar/` (on legal pages `/ar/privacy/`, `/ar/terms/`) | `/en/` |
| `[common.openMenu]` (the toggle's `aria-label`; open/closed state is `aria-expanded`) | Open menu | افتح القائمة |
| `[common.whatsappMessage]` | Hello Zafaran, I'd like to book a table. | مرحبًا زعفران، أودّ حجز طاولة. |

Reserve links everywhere point to `whatsappUrl(locale)` (BUILD-PLAN §2.2), which prefills `[common.whatsappMessage]`. On legal pages the language switch href is the same page in the other locale (`/ar/privacy/`), not the home page.

**Accessibility.** `<nav aria-label={common.mainNav}>`. The switch link is a real `<a>` with `data-lang-switch={target}`; a tiny inline `<script is:inline>` in `Nav.astro` (the one permitted script, 4 lines) stores `zafaran:lang` in `localStorage` (try/catch) on click so `/` remembers it. Visible focus ring (global). The overlay is `invisible` when closed, so its links leave the tab order.

---

## 2. Hero — `#hero` (full-bleed)

**Purpose.** Say what the place is in two lines and put the booking CTA on screen before any scroll.

**Layout.** `<section id="hero" data-hero class="relative min-h-svh flex items-end scroll-mt-24">`. Photo: `<div class="absolute inset-0" data-reveal="scale"><Photo id={hero.photo.id} alt={hero.photo.alt} ratio="16/9" priority sizes="100vw" class="size-full object-cover" /></div>`. Scrim `absolute inset-0 bg-black/50`. Content container `container-page relative pt-24 pb-16 md:pb-24`: eyebrow → h1 → lead → button row, all `max-w-[680px]`, `text-start`.
- Desktop and mobile are the same stack; only type steps and padding differ. Buttons: `flex flex-wrap gap-4`; on mobile each button is `w-full sm:w-auto`.
- h1 (`.t-display`): each line `<span class="block t-gradient" data-reveal data-reveal-delay="…">` (`.t-gradient` already mirrors in RTL). Delays: eyebrow 0, line 1 120, line 2 240, lead 360, buttons 480 — set explicitly with `data-reveal-delay`.
- Lead colour on this photo is `text-fg` (not muted) for contrast over the scrim. Gaps: eyebrow→h1 `mt-4`, h1→lead `mt-4 md:mt-6`, lead→buttons `mt-8`.

**Copy.**

| key | EN | AR |
|---|---|---|
| `[hero.eyebrow]` | DIFC, Dubai · Since 2017 | مركز دبي المالي العالمي · منذ 2017 |
| `[hero.title]` (used only for JSON-LD/og fallback; equals the two lines joined with a space) | Cooked over fire, finished with saffron. | يُطهى على النار، ويُختَم بالزعفران. |
| `[hero.lines[0]]` | Cooked over fire, | يُطهى على النار، |
| `[hero.lines[1]]` | finished with saffron. | ويُختَم بالزعفران. |
| `[hero.lead]` | A wood-fired kitchen in Gate Village serving the Gulf and the Levant at one table. Lunch from 12, dinner until late, every day of the week. | مطبخ على الحطب في جيت فيليدج، يجمع أطباق الخليج والشام على مائدة واحدة. الغداء من الثانية عشرة، والعشاء حتى وقت متأخر، كل أيام الأسبوع. |
| `[hero.primary]` → WhatsApp | Reserve on WhatsApp | احجز عبر واتساب |
| `[hero.secondary]` → `#menu` | See the menu | تصفّح القائمة |
| `[hero.photo]` | id `1663530761401-15eefb544889`, alt per DESIGN-BRIEF §7 | |

Primary: `<a class="btn btn-primary btn-lg" href={whatsappUrl(locale)} target="_blank" rel="noopener">` + `<Icon name="whatsapp-logo" class="size-5" />`. Secondary: `<a class="btn btn-secondary btn-lg" href="#menu">` + `<Icon name="arrow-right" class="size-5" mirror />`.

**Accessibility.** The h1 is one `<h1>` with two `<span class="block">` children — screen readers read it as one sentence. Photo has alt (it is content, not decoration). Scrim guarantees ≥ 4.5:1 for the lead over the photo.

---

## 3. Trust strip — `#trust`

**Purpose.** Three seconds of proof under the hero: rating, press, tenure, scale.

**Layout.** `<section id="trust" class="py-12"><div class="container-page">` (a band, not a full section). One card `rounded-3xl border border-line bg-surface p-6 grid grid-cols-2 md:grid-cols-4 gap-8`, `data-reveal`. Each cell: value row (`.t-h3 text-fg flex items-center gap-2`, `<Icon name="star" weight="fill" class="size-5 text-saffron" />` on the first cell only) then label (`.t-small text-fg-muted mt-2`). No dividers.

**Copy `[trust.items]`.**

| # | icon | value EN | label EN | value AR | label AR |
|---|---|---|---|---|---|
| 0 | `star` | 4.7 | from 1,312 Google reviews | 4.7 | من 1,312 تقييمًا على جوجل |
| 1 | — | Time Out Dubai | Best new restaurants, 2018 | تايم آوت دبي | أفضل المطاعم الجديدة، 2018 |
| 2 | — | Since 2017 | Gate Village, DIFC | منذ 2017 | جيت فيليدج، مركز دبي المالي |
| 3 | — | 47 seats | and a chef's counter for six | 47 مقعدًا | وطاولة الشيف لستة أشخاص |

`[trust.ratingLabel]`: EN "4.7 out of 5" · AR "4.7 من 5".

**Accessibility.** `<ul>` of four `<li>`; star icon `aria-hidden`; the rating value span gets `aria-label={trust.ratingLabel}`.

---

## 4. Story — `#story`

**Purpose.** Who cooks, since when, and the one thing the room is built around. Short.

**Layout.** Standard section. Desktop: `grid grid-cols-12 gap-6 items-start`. Text `col-span-5`: header block (eyebrow, h2) then paragraphs `mt-8 space-y-4 t-body` (`data-reveal` delay 120), then caption `t-small mt-8` (delay 240). Photos `col-span-7 col-start-6 grid grid-cols-2 gap-6`: each photo in `<div class="rounded-3xl overflow-hidden aspect-[3/4]" data-reveal="scale">` with `<Photo ratio="3/4" sizes="(min-width:768px) 28vw, 50vw" class="size-full object-cover" />`; the second wrapper also has `mt-16` (offset) and `data-reveal-delay="200"`. Mobile: text first, then the two photos in the same 2-col grid with `gap-4`, second wrapper `mt-8`.

**Copy.**

| key | EN | AR |
|---|---|---|
| `[story.eyebrow]` | The kitchen | المطبخ |
| `[story.title]` | Built around one oven | بُني حول فرن واحد |
| `[story.paragraphs[0]]` | Zafaran opened in the autumn of 2017 with a single wood-fired oven, eleven tables and a short menu that changed with whatever the Deira fish market had that morning. The oven is still the first thing you see from the door. | افتتح زعفران في خريف 2017 بفرن حطب واحد وإحدى عشرة طاولة وقائمة قصيرة تتغيّر بحسب ما يصل من سوق السمك في ديرة كل صباح. وما زال الفرن أول ما تراه من الباب. |
| `[story.paragraphs[1]]` | Chef Yara Nassar cooks the food she grew up with between Beirut and Dubai, over fire, with saffron from Khorasan running through most of it. Bread is baked to order. The lamb shoulder goes into the coals at 4 in the afternoon and comes out at 11. | تطهو الشيف يارا نصّار الأطباق التي نشأت عليها بين بيروت ودبي، على النار، ويمرّ زعفران خراسان في معظمها. يُخبز الخبز عند الطلب. ويدخل كتف الضأن إلى الجمر في الرابعة عصرًا ويخرج في الحادية عشرة. |
| `[story.caption]` | Yara Nassar, chef and co-founder | يارا نصّار، الشيف والشريكة المؤسِّسة |
| `[story.photos]` | `1709548145082-04d0cde481d4`, `1760169799369-2b8574466735` with alts from DESIGN-BRIEF §7 | |

**Accessibility.** h2 from the header block. Photos are content — real alt text. Caption is a `<p>`, not `<figcaption>`.

---

## 5. Menu highlights — `#menu`

**Purpose.** Six dishes with photos and prices, not the full menu.

**Layout.** Standard section. Header block (eyebrow, h2, lead). Grid `<ul class="mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">`. Card: `<li class="group rounded-3xl border border-line bg-surface p-2 transition-colors duration-700 ease-fluid hover:border-saffron/60" data-reveal data-reveal-delay={index*120}>`. Inside: photo wrapper `rounded-2xl overflow-hidden aspect-[4/3]` → `<Photo ratio="4/3" sizes="(min-width:768px) 33vw, (min-width:640px) 50vw, 100vw" class="size-full object-cover transition-transform duration-700 ease-fluid group-hover:scale-[1.04]" />`. Text block `p-4`: row `flex items-baseline justify-between gap-4` with `<h3 class="t-h3 text-fg">` and `<span class="t-price text-saffron">{formatPrice(locale, price)}</span>`. Description `<p class="t-small text-fg-muted mt-2">`. Note under the grid `<p class="t-small text-fg-muted mt-8">`.

**Copy.**

| key | EN | AR |
|---|---|---|
| `[menu.eyebrow]` | Menu highlights | مختارات من القائمة |
| `[menu.title]` | Six plates we're known for | ستة أطباق عُرفنا بها |
| `[menu.lead]` | The full menu changes with the season. These stay. | القائمة الكاملة تتغيّر مع الموسم. هذه تبقى. |
| `[menu.note]` | Prices in AED, VAT included. Ask about allergens when you book. | الأسعار بالدرهم الإماراتي شاملة الضريبة. اسألوا عن مسبّبات الحساسية عند الحجز. |

**Dishes `[menu.dishes]`** (photo IDs and alts in DESIGN-BRIEF §7).

| # | photo | name EN | desc EN | name AR | desc AR | price |
|---|---|---|---|---|---|---|
| 0 | `1689672235501-6dc1e56d454c` | Saffron-cured salmon | Cured 36 hours in saffron and sumac salt, with labneh and pickled fennel. | سلمون مُملّح بالزعفران | يُملّح 36 ساعة في الزعفران وملح السماق، ويُقدَّم مع اللبنة والشمر المخلّل. | 92 |
| 1 | `1601050690597-df0568f70950` | Lamb sambousek | Hand-folded, fried to order, with green chilli labneh. | سمبوسة لحم الضأن | تُلفّ يدويًا وتُقلى عند الطلب، مع لبنة الفلفل الأخضر. | 48 |
| 2 | `1529042410759-befb1204b468` | Kofta, pomegranate molasses | Charred over the coals, on rocket, with a sharp pomegranate glaze. | كفتة بدبس الرمان | تُشوى على الجمر وتُقدَّم على الجرجير مع دبس رمان حامض. | 74 |
| 3 | `1603360946369-dc9bb6258143` | Coal-grilled lamb skewers | Shoulder marinated overnight in saffron yoghurt, on flatbread with sumac onions. | أسياخ الضأن على الفحم | كتف ضأن يُنقع طوال الليل في لبن الزعفران، على خبز رقيق مع بصل بالسماق. | 118 |
| 4 | `1600891964092-4316c288032e` | Dry-aged rib eye | Aged 45 days, brushed with smoked date butter, with hand-cut chips. | ريب آي معتّق | يُعتّق 45 يومًا ويُدهن بزبدة التمر المدخّنة، مع بطاطا مقطّعة يدويًا. | 285 |
| 5 | `1541518763669-27fef04b14ea` | Seven-hour lamb shoulder | For two. In the coals from four till eleven, with apricots and saffron broth. | كتف الضأن بسبع ساعات | لشخصين. في الجمر من الرابعة حتى الحادية عشرة، مع المشمش ومرق الزعفران. | 210 |

**Accessibility.** `<ul>`/`<li>`, h3 per card, price in the same reading flow as the name (no absolute positioning). Hover scale is decorative; nothing depends on hover.

---

## 6. Tagline — `#tagline` (B11, mandatory)

**Purpose.** The brand's one idea, in large type, mid-page, lit word by word as it scrolls through.

**Layout.** Standard section; inside `container-page` a `<div class="max-w-4xl">` (starts at the container start; `text-start`). One `<p data-tagline class="t-tagline text-fg">`. Each line is `<span class="block">`; each word inside is `<span data-word>`, separated by literal spaces (`{' '}`) so wrapping and selection behave. No `data-reveal` on this section (M4 is its animation). No photo.

**Word order in RTL.** Words are emitted in logical (DOM) order; in Arabic that IS reading order (right to left) because the browser lays inline content out in `dir="rtl"`. The script lights words in DOM order — nothing is reversed, no `flex-row-reverse`, no per-word positioning. Punctuation stays attached to its word (`"الجمر."` is one `data-word`).

**Copy `[tagline.lines]`.**

| EN | AR |
|---|---|
| Some things can't be rushed. | بعض الأشياء لا تُستعجل. |
| Bread that rises overnight, | خبزٌ يختمر طوال الليل، |
| lamb that sits seven hours in the coals. | وضأنٌ يمكث سبع ساعات فوق الجمر. |

**Accessibility.** It is a `<p>`; word spans have no role. Words are never below 30% opacity. Reduced motion: all words 100% from the start.

---

## 7. Visit — `#visit`

**Purpose.** What mobile users look for first: hours, where it is, how to get there, who to message.

**Layout.** Standard section. Header block (eyebrow, h2). Grid `mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6`. Four cards, DOM order = mobile order = desktop order (2×2): **Hours**, **Address**, **Contact**, **Parking**. Each card: `rounded-3xl border border-line bg-surface p-6`, `data-reveal` delay `index × 120`; header row `flex items-center gap-4`: icon in a chip (`size-12 rounded-full border border-line flex items-center justify-center`, icon `size-6 text-saffron`) + `<h3 class="t-h3 text-fg">`. Body `mt-6`.
- Hours: `<dl>` of two rows `flex justify-between gap-4 t-body`, `<dt class="text-fg-muted">` days, `<dd class="text-fg tabular-nums">` with `<span dir="ltr" class="inline-block">` around the time. Rows `space-y-2`. Note `.t-small text-fg-muted mt-4`.
- Address: `<address class="t-body text-fg">` with the three lines as `<span class="block">`, then two links `mt-6 flex flex-wrap gap-4`: `<a class="btn btn-secondary" target="_blank" rel="noopener">` + `<Icon name="arrow-up-right" class="size-4" mirror />`.
- Contact: `<ul class="space-y-4">` rows: phone (`tel:` + `site.phoneE164`), WhatsApp (`whatsappUrl(locale)`), email (`mailto:`), Instagram (`site.instagramUrl`) — each row `flex items-center gap-4 t-body`: `<Icon class="size-5 text-fg-muted" />` (`phone`, `whatsapp-logo`, `envelope-simple`, `instagram-logo`) + `<a class="text-fg hover:text-saffron transition-colors duration-700 ease-fluid underline-offset-4 hover:underline">`. Phone number, e-mail and handle are `dir="ltr" inline-block`.
- Parking: one `<p class="t-body text-fg-muted">`.

**Copy.**

| key | EN | AR |
|---|---|---|
| `[visit.eyebrow]` | Visit | زورونا |
| `[visit.title]` | Gate Village, ground floor | جيت فيليدج، الطابق الأرضي |
| `[visit.hours.title]` (icon `clock`) | Hours | ساعات العمل |
| `[visit.hours.rows[0]]` days / time | Sunday – Thursday / `12:00 – 23:30` | الأحد – الخميس / `12:00 – 23:30` |
| `[visit.hours.rows[1]]` days / time | Friday – Saturday / `12:00 – 00:30` | الجمعة – السبت / `12:00 – 00:30` |
| `[visit.hours.note]` | Kitchen closes 30 minutes before. | يُغلق المطبخ قبل الموعد بثلاثين دقيقة. |
| `[visit.address.title]` (icon `map-pin`) | Address | العنوان |
| `[visit.address.lines]` | Gate Village, Building 7 / Ground floor, DIFC / Dubai, United Arab Emirates | جيت فيليدج، المبنى 7 / الطابق الأرضي، مركز دبي المالي العالمي / دبي، الإمارات العربية المتحدة |
| `[visit.address.google]` | Open in Google Maps | افتح في خرائط جوجل |
| `[visit.address.apple]` | Open in Apple Maps | افتح في خرائط آبل |
| `[visit.contact.title]` (icon `phone`) | Contact | تواصل معنا |
| `[visit.contact.phoneLabel]` | `+971 4 385 2216` | `+971 4 385 2216` |
| `[visit.contact.whatsappLabel]` | Message on WhatsApp | راسلنا على واتساب |
| `[visit.contact.emailLabel]` | hello@zafaran.ae | hello@zafaran.ae |
| `[visit.contact.instagramLabel]` | @zafaran.dxb | @zafaran.dxb |
| `[visit.parking.title]` (icon `car`) | Parking | مواقف السيارات |
| `[visit.parking.body]` | Gate Village car park P3, validated for 4 hours at the host stand. Valet at the Gate Avenue entrance after 19:00. | موقف جيت فيليدج P3، مع تصديق 4 ساعات عند مكتب الاستقبال. خدمة صفّ السيارات عند مدخل جيت أفنيو بعد الساعة 19:00. |

Map URLs (locale-independent, in `site.ts`): Google `https://maps.google.com/?q=Gate+Village+Building+7+DIFC+Dubai`, Apple `https://maps.apple.com/?q=Gate+Village+Building+7+DIFC+Dubai`. There is no embedded map iframe: a link opens the user's native map app on mobile, which is what they want, and it keeps the privacy page's "no third-party scripts" statement true.

**Accessibility.** Hours as `<dl>`. `<address class="not-italic">` for the address (browsers default it to italic; `not-italic` is the one permitted use of that utility). External links get `rel="noopener"`; the arrow icon is `aria-hidden`. Chips are decorative; the h3 carries the meaning.

---

## 8. FAQ — `#faq`

**Purpose.** Remove the objections that stop a booking.

**Layout.** Standard section; inside `container-page` a `<div class="max-w-3xl">`. Header block (eyebrow, h2). List `<div class="mt-8 md:mt-12 space-y-4">`. Each item: `<details name="faq" class="group rounded-2xl border border-line bg-surface open:bg-surface-raised transition-colors duration-700 ease-fluid" data-reveal data-reveal-delay={index*80}>`. `<summary class="flex items-center justify-between gap-4 p-6 cursor-pointer list-none t-faq-q text-fg [&::-webkit-details-marker]:hidden">` question + `Icon caret-down` with `class="size-5 text-fg-muted transition-transform duration-700 ease-fluid group-open:rotate-180"`. Answer `<div class="px-6 pb-6 t-body text-fg-muted">`. Open/close animation is M11: `html` already has `interpolate-size: allow-keywords`; `Faq.astro` adds one scoped `<style>` for `details::details-content` (BUILD-PLAN §2.6). `name="faq"` makes it an exclusive accordion natively — no JS in this section.

**Copy `[faq.eyebrow]`** EN "Questions" · AR "أسئلة". **`[faq.title]`** EN "Before you book" · AR "قبل أن تحجز".

**`[faq.items]`**

| # | Q EN | A EN | Q AR | A AR |
|---|---|---|---|---|
| 0 | Do I need to book? | For dinner, yes. Most nights we're full by 8. Lunch is usually fine to walk in. Message us on WhatsApp and we'll confirm within the hour. | هل أحتاج إلى حجز؟ | للعشاء، نعم. في معظم الليالي نمتلئ بحلول الثامنة. أما الغداء فغالبًا ما يتّسع لمن يأتي دون حجز. راسلونا على واتساب ونؤكّد الحجز خلال ساعة. |
| 1 | How long do you hold a table? | Fifteen minutes past the booking time. Running late? A WhatsApp message keeps it for you. | كم تحتفظون بالطاولة؟ | خمس عشرة دقيقة بعد موعد الحجز. متأخّرون؟ رسالة على واتساب تُبقيها لكم. |
| 2 | Is the food halal? | Yes, all of it. Every cut of meat is halal-certified and there is no pork in the kitchen. | هل الطعام حلال؟ | نعم، كلّه. كل اللحوم معتمدة حلال، ولا يوجد لحم خنزير في المطبخ. |
| 3 | Do you serve alcohol? | We are licensed. The wine and cocktail list is short, and the non-alcoholic list is exactly as long. | هل تقدّمون الكحول؟ | لدينا رخصة. قائمة النبيذ والكوكتيل قصيرة، وقائمة المشروبات الخالية من الكحول بالطول نفسه تمامًا. |
| 4 | What about vegetarian and vegan dishes? | About a third of the menu is vegetarian, and most of that is vegan without changes. Tell us when you book and the kitchen plans ahead. | ماذا عن الأطباق النباتية؟ | نحو ثلث القائمة نباتي، ومعظمه نباتي صرف دون تعديل. أخبرونا عند الحجز ليستعدّ المطبخ مسبقًا. |
| 5 | Can I bring children? | Welcome at lunch, and at dinner until 8. We have high chairs and a small-plates menu for them. | هل يمكنني اصطحاب الأطفال؟ | أهلًا بهم على الغداء، وعلى العشاء حتى الثامنة. لدينا كراسٍ مرتفعة وقائمة أطباق صغيرة لهم. |
| 6 | Do you have private dining? | The chef's counter seats six and the back room seats fourteen. Email hello@zafaran.ae with your date and we'll send a menu. | هل لديكم صالة خاصة؟ | طاولة الشيف تتّسع لستة أشخاص، والغرفة الخلفية لأربعة عشر. راسلونا على hello@zafaran.ae بالتاريخ ونرسل لكم القائمة. |
| 7 | Is there a dress code? | Smart casual. No shorts or sportswear at dinner. | هل هناك قواعد للّباس؟ | أنيق وغير رسمي. لا شورتات ولا ملابس رياضية على العشاء. |
| 8 | Are you open during Ramadan? | Yes. Iftar is one seating from sunset with a set menu, and suhoor runs until 2 in the morning. Lunch service pauses for the month. | هل تفتحون في رمضان؟ | نعم. الإفطار جلسة واحدة من الغروب بقائمة محدّدة، والسحور حتى الثانية فجرًا. وتتوقّف خدمة الغداء طوال الشهر. |

**Accessibility.** Native `<details>`/`<summary>` — keyboard and screen-reader semantics for free. Caret `aria-hidden`. Focus ring on `summary` (global rule; `summary` must not have `outline-none`).

---

## 9. CTA — `#cta` (full-bleed)

**Purpose.** Repeat the booking ask now that the objections are gone; give the fallback for people who will not wait.

**Layout.** `<section id="cta" class="relative py-16 md:py-24 scroll-mt-24">`. `<div class="absolute inset-0" data-reveal="scale"><Photo ratio="16/9" sizes="100vw" class="size-full object-cover" /></div>`, scrim `absolute inset-0 bg-black/50`. Container `container-page relative` with an inner `max-w-[680px] text-start`: `<p class="t-eyebrow">`, `<h2 class="t-h2 text-fg mt-2">`, `<p class="t-lead text-fg mt-4">`, buttons `mt-8 flex flex-wrap gap-4` (`btn btn-primary btn-lg` → WhatsApp, `target="_blank" rel="noopener"`, `whatsapp-logo`; `btn btn-secondary btn-lg` → `tel:` with `phone` icon), fallback `<p class="t-small text-fg mt-8">`. Each of the five gets `data-reveal` with delays 0/120/240/360/480. On mobile buttons are `w-full sm:w-auto`.

**Copy.**

| key | EN | AR |
|---|---|---|
| `[cta.eyebrow]` | Reservations | الحجوزات |
| `[cta.title]` | Tonight, or the next free Friday. | الليلة، أو أول جمعة متاحة. |
| `[cta.lead]` | Tables are held for fifteen minutes. Message us and we'll confirm within the hour. | نحتفظ بالطاولة خمس عشرة دقيقة. راسلونا ونؤكّد الحجز خلال ساعة. |
| `[cta.primary]` | Reserve on WhatsApp | احجز عبر واتساب |
| `[cta.secondary]` | Call +971 4 385 2216 | اتصل على +971 4 385 2216 |
| `[cta.fallback]` | No reply after an hour? Walk in. We keep four seats at the counter for whoever arrives first. | لم يصلكم ردّ بعد ساعة؟ تعالوا مباشرة. نحتفظ بأربعة مقاعد عند الطاولة لمن يصل أولًا. |
| `[cta.photo]` | `1414235077428-338989a2e8c0` + alt | |

The AR secondary label contains the phone number: render it as `اتصل على <span dir="ltr" class="inline-block">+971 4 385 2216</span>` — store `cta.secondary` as the full string and let the component split on the first `+` (EN: "Call " / "+971 4 385 2216"; AR: "اتصل على " / "+971 4 385 2216").

**Accessibility.** Buttons are `<a>` with real hrefs (`https://wa.me/…`, `tel:+97143852216`).

---

## 10. Sticky CTA (mobile) — `#sticky-cta`

**Purpose.** Keep the booking CTA reachable through the whole scroll on phones.

**Layout.** `<div id="sticky-cta" class="fixed inset-x-0 bottom-0 z-40 md:hidden bg-ink/70 backdrop-blur-xl p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] flex gap-4">`: `<a class="btn btn-primary flex-1">` `[common.reserve]` with `whatsapp-logo`, `target="_blank" rel="noopener"`; then `<a class="btn btn-secondary size-12 p-0" href="tel:…" aria-label={common.call}>` with `phone` icon. Hidden (translated off-screen) while `#hero` is in view: the shared script toggles `.is-visible` on `#sticky-cta`; `StickyCta.astro` carries one scoped `<style>` — `#sticky-cta { translate: 0 100%; transition: translate var(--dur-fast) var(--ease-fluid) } #sticky-cta.is-visible { translate: 0 0 }` plus the reduced-motion `transition: none` (M12). Footer has `pb-24` on mobile so the bar never covers the legal links.

---

## 11. Footer — `<footer>`

**Layout.** `bg-surface-deep`, container `mx-auto max-w-6xl px-4 md:px-8`, `pt-16 pb-24 md:py-16`. Grid `grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12`: brand column (`<a class="t-wordmark text-fg">` to `/{locale}/`, blurb `.t-small text-fg-muted mt-4`), Explore, Contact, Hours. Column headings `<h2 class="t-eyebrow">` (saffron), lists `<ul class="mt-4 space-y-2 t-small">`, links `text-fg-muted hover:text-fg transition-colors duration-700 ease-fluid`. Bottom row `mt-12 flex flex-wrap items-center justify-between gap-4 t-small text-fg-muted`: copyright, then a `flex gap-4` of Privacy · Terms · language switch. No top border on the footer (it is a colour change, not a card).

**Copy.**

| key | EN | AR |
|---|---|---|
| `[footer.blurb]` | Wood-fired Arabian cooking in DIFC since 2017. | مطبخ عربي على الحطب في مركز دبي المالي العالمي منذ 2017. |
| `[footer.explore]` | Explore | استكشف |
| `[footer.contact]` | Contact | تواصل |
| `[footer.hours]` | Hours | ساعات العمل |
| Explore list | Menu, Visit, FAQ (`[nav.links]`, hrefs `/{locale}/#menu` etc. so they work from legal pages), Reserve a table (`[common.reserve]` → WhatsApp) | same keys |
| Contact list | `visit.address.lines[0]`, `lines[1]` (two `<li>`), phone (`tel:`), email (`mailto:`), Instagram — labels from `[visit.contact.*]`, LTR-wrapped in AR | |
| Hours list | two `<li>`: `{days}, {time}` from `[visit.hours.rows]` (time `dir="ltr"`) | |
| `[footer.privacy]` → `/{locale}/privacy/` | Privacy | الخصوصية |
| `[footer.terms]` → `/{locale}/terms/` | Terms | الشروط |
| `[footer.copyright]` | © 2026 Zafaran Restaurant LLC | © 2026 مطعم زعفران ذ.م.م |

**Accessibility.** `<footer>` landmark; column headings are real `<h2>`s. Language switch identical to the nav's (same href logic, same `data-lang-switch` attribute — the nav's inline script binds every `[data-lang-switch]` on the page).

---

## 12. Legal pages — `/{locale}/privacy/`, `/{locale}/terms/`

Layout: Nav + `<main id="main"><section id="legal" class="section-y pt-24"><div class="container-page"><div class="max-w-2xl">` — header block with `<h1 class="t-h2 text-fg mt-2">` (eyebrow `[common.brand]`, title), paragraphs `mt-8 space-y-4 t-body`; Footer; StickyCta is NOT rendered on legal pages. `Base` props: `title` = `{title} — Zafaran` / `{title} — زعفران`, `description` = paragraph 0.

**`[legal.privacy]`**

| | EN | AR |
|---|---|---|
| title | Privacy | سياسة الخصوصية |
| p0 | This website is a set of static pages. It sets no cookies, runs no analytics and collects no personal data. | هذا الموقع مجموعة صفحات ثابتة. لا يضع ملفات تعريف ارتباط، ولا يشغّل أدوات تحليل، ولا يجمع أي بيانات شخصية. |
| p1 | Photographs are served from Unsplash's image servers, which receive your IP address when an image loads, as any image host does. | تُحمَّل الصور من خوادم Unsplash، التي تتلقّى عنوان IP الخاص بك عند تحميل الصورة، شأنها شأن أي مضيف صور. |
| p2 | When you contact us on WhatsApp, by phone or by email, we keep the details you send only for as long as it takes to handle your booking or your question. | عندما تتواصل معنا عبر واتساب أو الهاتف أو البريد الإلكتروني، نحتفظ بما ترسله من تفاصيل للمدة اللازمة لإتمام حجزك أو الإجابة عن سؤالك فقط. |
| p3 | Questions about this policy: hello@zafaran.ae. Last updated 3 September 2026. | للاستفسار عن هذه السياسة: hello@zafaran.ae. آخر تحديث: 3 سبتمبر 2026. |

**`[legal.terms]`**

| | EN | AR |
|---|---|---|
| title | Terms | الشروط والأحكام |
| p0 | A booking is confirmed only once you receive a reply from us. Tables are held for fifteen minutes past the booking time. | يُعدّ الحجز مؤكّدًا فقط عند وصول ردّ منّا. نحتفظ بالطاولة خمس عشرة دقيقة بعد موعد الحجز. |
| p1 | For groups of eight or more we may ask for a card to hold the table. Nothing is charged unless the whole party fails to arrive without notice. | للمجموعات من ثمانية أشخاص فأكثر قد نطلب بطاقة لتثبيت الحجز. ولا يُخصم أي مبلغ إلا إذا تغيّبت المجموعة كاملة دون إشعار. |
| p2 | Prices on this site are in UAE dirhams and include VAT. The menu changes with the season, and a dish shown here may not be available on a given day. | الأسعار في هذا الموقع بالدرهم الإماراتي وتشمل ضريبة القيمة المضافة. تتغيّر القائمة مع الموسم، وقد لا يتوفّر طبق معروض هنا في يوم بعينه. |
| p3 | Zafaran Restaurant LLC, Gate Village Building 7, DIFC, Dubai. | مطعم زعفران ذ.م.م، جيت فيليدج المبنى 7، مركز دبي المالي العالمي، دبي. |

---

## 13. 404 — `/404`

One page, both languages (Astro's static 404 has no locale). `<Base locale="en" noindex title="Page not found — Zafaran" description={notFound.body}>`; the Arabic block is `<div lang="ar" dir="rtl" class="font-arabic mt-16">`. No nav, no sticky. `<main id="main" class="min-h-svh grid md:grid-cols-2">`: `<Photo ratio="3/4" sizes="(min-width:768px) 50vw, 100vw" class="w-full aspect-[3/4] md:aspect-auto md:min-h-svh object-cover" />` (404 ID) and a column `px-4 md:px-8 py-16 md:py-24 flex flex-col justify-center` with the EN block then the AR block, each: `<p class="t-eyebrow">`, `<h1|h2 class="t-h2 text-fg mt-2">` (EN is `h1`, AR is `h2`), `<p class="t-body mt-4">`, `<a class="btn btn-primary mt-8" href="/">` with `<Icon name="arrow-right" class="size-4" mirror />`.

**`[notFound]`**

| | EN | AR |
|---|---|---|
| eyebrow | 404 | 404 |
| title | This table doesn't exist. | هذه الطاولة غير موجودة. |
| body | The page you asked for has been cleared away. Try the front door. | الصفحة التي طلبتها رُفعت عن المائدة. جرّب الباب الرئيسي. |
| back | Back to Zafaran | العودة إلى زعفران |

---

## 14. `/` — language auto-detect

Already built (`src/pages/index.astro`): reads `localStorage['zafaran:lang']`, then walks `navigator.languages` for the first `ar*`/`en*`, `location.replace('/{lang}/')`, `<noscript>` shows two plain links. Do not touch it. The language switch in Nav/Footer must write the same key, `zafaran:lang`, with the value `'en'` or `'ar'`.

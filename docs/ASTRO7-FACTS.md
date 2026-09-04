# Astro 7.3.0 — verified API surface (read from node_modules, not from memory)

Verified 2026-09-03. Do NOT substitute Astro 5.x patterns.

## i18n — top-level, stable (since 3.5)
```js
i18n: {
  locales: ['en', 'ar'],
  defaultLocale: 'en',
  routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  // fallback?: { ar: 'en' }, fallbackType: 'redirect' | 'rewrite'
}
```
`prefixDefaultLocale: true` + `redirectToDefaultLocale: false` means BOTH `/en/` and `/ar/`
exist and `src/pages/index.astro` stays ours — that is where the language auto-detect lives.

## fonts — TOP-LEVEL in Astro 7 (no longer `experimental.fonts`)
```js
import { defineConfig, fontProviders } from 'astro/config';
fonts: [{
  provider: fontProviders.google(),
  name: 'Manrope',
  cssVariable: '--font-sans',
  weights: [400, 500, 600, 700],
  subsets: ['latin'],
  fallbacks: ['system-ui', 'sans-serif'],
  display: 'swap',
}]
```
Component: `import { Font } from 'astro:assets'` → `<Font cssVariable="--font-sans" preload />`
in `<head>`. It emits both the `@font-face` CSS and the preload links. Fonts are
downloaded and SELF-HOSTED at build time — no runtime request to Google.
Arabic families need `subsets: ['arabic', 'latin']`.

## images
- `image.layout` and `image.responsiveStyles` are stable top-level config.
- Components available: `Image`, `Picture`, `ResponsiveImage`, `ResponsivePicture`.
- Remote images through `<Image>` require `image.domains` / `image.remotePatterns`
  AND a build-time download of every photo. We are NOT doing that — Unsplash's own
  CDN already resizes. Use plain `<img>` with Unsplash URL params
  (`?w=…&q=75&auto=format&fit=crop`) + `srcset`, `loading`, `decoding`, `width/height`.

## view transitions
`import { ClientRouter } from 'astro:transitions'` → `<ClientRouter />` in `<head>`.
(`astro/components/ClientRouter.astro` exists; `ViewTransitions` is the old name.)

## tailwind
Tailwind v4 via `@tailwindcss/vite` in `vite.plugins`. NOT `@astrojs/tailwind`.
No `tailwind.config.js` — theme lives in CSS via `@theme`.

## network caveat
This machine has a slow path to GitHub (prefix `gh-proxy.com`). Google Fonts is fine.
If the build-time font fetch stalls, that is the network, not the config.

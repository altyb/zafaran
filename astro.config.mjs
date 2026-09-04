// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://zafaran.example',
  i18n: {
    locales: ['en', 'ar'],
    defaultLocale: 'en',
    // Both /en/ and /ar/ are real routes; `/` stays ours so it can auto-detect.
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Manrope',
      cssVariable: '--font-manrope',
      weights: [400, 500, 600, 700],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
      display: 'swap',
    },
    {
      provider: fontProviders.google(),
      name: 'Readex Pro',
      cssVariable: '--font-readex',
      weights: [400, 500, 600, 700],
      subsets: ['arabic', 'latin'],
      fallbacks: ['system-ui', 'sans-serif'],
      display: 'swap',
    },
  ],
  vite: { plugins: [tailwindcss()] },
});

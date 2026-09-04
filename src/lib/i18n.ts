export const LOCALES = ['en', 'ar'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export const LOCALE_META: Record<Locale, {
  dir: 'ltr' | 'rtl';
  /** Name of the language, written in that language. */
  label: string;
  ogLocale: string;
}> = {
  en: { dir: 'ltr', label: 'English', ogLocale: 'en_US' },
  ar: { dir: 'rtl', label: 'العربية', ogLocale: 'ar_AE' },
};

export const isLocale = (v: unknown): v is Locale =>
  typeof v === 'string' && (LOCALES as readonly string[]).includes(v);

export const otherLocale = (l: Locale): Locale => (l === 'en' ? 'ar' : 'en');

import type { Locale } from './i18n';
export type { Locale };

export interface Photo { id: string; alt: string }
export interface Link { label: string; href: string }
export interface Dish { name: string; desc: string; price: number; photo?: Photo; mark?: string }
export interface MenuSection { title: string; note?: string; items: Dish[] }
export interface DayStep { time: string; title: string; body: string }
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
  trust: { ratingLabel: string; items: { value: string; label: string; icon?: string }[] };
  story: Header & { paragraphs: string[]; caption: string; photos: [Photo, Photo] };
  menu: Header & { sections: MenuSection[]; note: string; tapHint: string };
  day: Header & { steps: DayStep[] };
  spices: string[];
  reserve: Header & {
    party: string; when: string; days: string[]; time: string; times: string[];
    send: string; note: string;
    /** {n} guests, {day}, {time} are filled in. */
    message: string;
  };
  tagline: { lines: string[] };                       // exactly 3
  visit: Header & {
    hours: { title: string; rows: HoursRow[]; note: string };
    address: { title: string; lines: string[]; google: string; apple: string };
    contact: { title: string; phoneLabel: string; whatsappLabel: string; emailLabel: string; instagramLabel: string };
    parking: { title: string; body: string };
  };
  faq: Header & { items: Faq[] };
  cta: Header & { lead: string; primary: string; secondary: string; fallback: string; photo: Photo };
  footer: { blurb: string; explore: string; contact: string; hours: string; privacy: string; terms: string; copyright: string };
  legal: { privacy: LegalPage; terms: LegalPage };
  notFound: { eyebrow: string; title: string; body: string; back: string };
}

export const site = {
  name: 'Zafaran',
  phoneE164: '+12025550199',
  phoneDisplay: '+1 202 555 0199',
  whatsappNumber: '12025550199',
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

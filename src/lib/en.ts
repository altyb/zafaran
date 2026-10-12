import type { Dictionary } from './dict';

export const en: Dictionary = {
  meta: {
    title: 'Zafaran — Wood-fired Arabian kitchen in DIFC, Dubai',
    description: 'Wood-fired cooking from the Gulf and the Levant in Gate Village, DIFC. Lunch from 12, dinner until late. Reserve on WhatsApp.',
    ogAlt: 'A chef spoons sauce over a plated dish in the dim light of the Zafaran kitchen',
  },
  common: {
    brand: 'Zafaran',
    reserve: 'Reserve a table',
    reserveShort: 'Reserve',
    call: 'Call us',
    openMenu: 'Open menu',
    mainNav: 'Main',
    whatsappMessage: "Hello Zafaran, I'd like to book a table.",
  },
  nav: {
    links: [
      { label: 'Menu', href: '#menu' },
      { label: 'Visit', href: '#visit' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
  hero: {
    eyebrow: 'DIFC, Dubai · Since 2017',
    title: 'Cooked over fire, finished with saffron.',
    lines: ['Cooked over fire,', 'finished with saffron.'],
    lead: 'A wood-fired kitchen in Gate Village serving the Gulf and the Levant at one table. Lunch from 12, dinner until late, every day of the week.',
    primary: 'Reserve on WhatsApp',
    secondary: 'See the menu',
    photo: { id: '1663530761401-15eefb544889', alt: 'A chef spoons sauce over a plated dish in the dim light of the Zafaran kitchen' },
  },
  trust: {
    ratingLabel: '4.7 out of 5',
    items: [
      { value: '4.7', label: 'from 1,312 Google reviews', icon: 'star' },
      { value: 'Time Out Dubai', label: 'Best new restaurants, 2018' },
      { value: 'Since 2017', label: 'Gate Village, DIFC' },
      { value: '47 seats', label: "and a chef's counter for six" },
    ],
  },
  story: {
    eyebrow: 'The kitchen',
    title: 'Built around one oven',
    paragraphs: [
      'Zafaran opened in the autumn of 2017 with a single wood-fired oven, eleven tables and a short menu that changed with whatever the Deira fish market had that morning. The oven is still the first thing you see from the door.',
      'Chef Yara Nassar cooks the food she grew up with between Beirut and Dubai, over fire, with saffron from Khorasan running through most of it. Bread is baked to order. The lamb shoulder goes into the coals at 4 in the afternoon and comes out at 11.',
    ],
    caption: 'Yara Nassar, chef and co-founder',
    photos: [
      { id: '1709548145082-04d0cde481d4', alt: 'The dining room at Zafaran at night, lit by low pendant lamps' },
      { id: '1760169799369-2b8574466735', alt: "A cook's hands at the pass, plates blurred in the foreground" },
    ],
  },
  menu: {
    eyebrow: 'The menu · Autumn 2026',
    title: 'Fire, smoke and saffron',
    lead: 'Most of it is cooked over oak and ghaf wood. Order a few plates each and share them.',
    note: 'Prices in AED, VAT included. V = vegetarian. Tell us about allergies when you book.',
    tapHint: 'Tap a dish with a photo to see it',
    sections: [
      {
        title: 'To start',
        items: [
          { name: "Saj bread, za'atar, olive oil", desc: 'Baked on the dome to order, still blistered when it lands.', price: 18, mark: 'V' },
          { name: 'Hummus, burnt butter, lamb crumbs', desc: 'Warm chickpeas, tahini from Nablus, a spoon of crisp spiced lamb.', price: 38 },
          { name: 'Lamb sambousek', desc: 'Hand-folded, fried to order, with green chilli labneh.', price: 48, photo: { id: '1601050690597-df0568f70950', alt: 'Three fried sambousek pastries on a wooden board with a green dip' } },
          { name: 'Saffron-cured salmon', desc: 'Cured 36 hours in saffron and sumac salt, with labneh and pickled fennel.', price: 92, photo: { id: '1689672235501-6dc1e56d454c', alt: 'Slices of cured salmon on a white plate with labneh and herbs' } },
        ],
      },
      {
        title: 'From the coals',
        items: [
          { name: 'Kofta, pomegranate molasses', desc: 'Charred over the coals, on rocket, with a sharp pomegranate glaze.', price: 74, photo: { id: '1529042410759-befb1204b468', alt: 'Charred kofta on a bed of rocket leaves on a white plate' } },
          { name: 'Lamb skewers, saffron yoghurt', desc: 'Shoulder marinated overnight, on flatbread with sumac onions.', price: 118, photo: { id: '1603360946369-dc9bb6258143', alt: 'Grilled lamb skewers on flatbread with sliced onion and tomato' } },
          { name: 'Whole hammour, tahini and chilli', desc: "From the morning's market in Deira. Grilled whole, for one or two.", price: 165 },
          { name: 'Dry-aged rib eye', desc: 'Aged 45 days, brushed with smoked date butter, with hand-cut chips.', price: 285, photo: { id: '1600891964092-4316c288032e', alt: 'A sliced rib eye steak with chips on a white plate' } },
        ],
      },
      {
        title: 'To share, slowly',
        items: [
          { name: 'Seven-hour lamb shoulder', desc: 'For two. In the coals from four till eleven, with apricots and saffron broth.', price: 210, photo: { id: '1541518763669-27fef04b14ea', alt: 'Slow-cooked lamb with vegetables in a patterned earthenware dish' } },
          { name: 'Machboos of the day', desc: 'Gulf spiced rice with black lime, cooked with whatever the market had.', price: 145 },
        ],
      },
      {
        title: 'Sweet',
        items: [
          { name: 'Kunafa from the oven', desc: 'Akkawi cheese, orange blossom syrup, baked for two.', price: 46, mark: 'V' },
          { name: 'Saffron and cardamom ice cream', desc: 'Churned here, with crushed Aleppo pistachio.', price: 32, mark: 'V' },
          { name: 'Gahwa and dates', desc: 'Cardamom coffee from the dallah, Khalas dates from Al Ain.', price: 18, mark: 'V' },
        ],
      },
    ],
  },
  day: {
    eyebrow: 'Behind the pass',
    title: 'A day at the oven',
    steps: [
      { time: '05:30', title: 'The dough goes in', body: 'Saj and khubz dough is mixed by hand and left to rise until lunch.' },
      { time: '08:00', title: 'Deira fish market', body: "Yara picks the day's hammour. Whatever is best becomes tonight's special." },
      { time: '11:00', title: 'The saffron soaks', body: 'Khorasan threads steep in warm milk for the salmon cure and the ice cream.' },
      { time: '16:00', title: 'Lamb into the coals', body: 'Shoulders are wrapped in vine leaves and buried in the embers.' },
      { time: '23:00', title: 'Lamb comes out', body: 'Seven hours later it reaches the table and falls off the bone.' },
    ],
  },
  spices: ['Saffron', 'Sumac', 'Oak smoke', 'Cardamom', "Za'atar", 'Date molasses', 'Orange blossom', 'Black lime'],
  reserve: {
    eyebrow: 'Reservations',
    title: 'Book in three taps.',
    party: 'Guests',
    when: 'Day',
    days: ['Tonight', 'Tomorrow', 'Friday', 'Saturday'],
    time: 'Time',
    times: ['12:30', '13:30', '19:00', '20:00', '21:30'],
    send: 'Send on WhatsApp',
    note: 'We reply within the hour and hold the table for fifteen minutes. No reply? Walk in: four seats at the counter are kept for whoever arrives first.',
    message: 'Hello Zafaran, a table for {n}, {day} at {time}, please.',
  },
  tagline: {
    lines: [
      "Some things can't be rushed.",
      'Bread that rises overnight,',
      'lamb that sits seven hours in the coals.',
    ],
  },
  visit: {
    eyebrow: 'Find us',
    title: 'Gate Village, ground floor',
    hours: {
      title: 'Hours',
      rows: [
        { days: 'Sunday – Thursday', time: '12:00 – 23:30' },
        { days: 'Friday – Saturday', time: '12:00 – 00:30' },
      ],
      note: 'Kitchen closes 30 minutes before.',
    },
    address: {
      title: 'Address',
      lines: ['Gate Village, Building 7', 'Ground floor, DIFC', 'Dubai, United Arab Emirates'],
      google: 'Open in Google Maps',
      apple: 'Open in Apple Maps',
    },
    contact: {
      title: 'Contact',
      phoneLabel: '+1 202 555 0199',
      whatsappLabel: 'Message on WhatsApp',
      emailLabel: 'hello@zafaran.ae',
      instagramLabel: '@zafaran.dxb',
    },
    parking: {
      title: 'Parking',
      body: 'Gate Village car park P3, validated for 4 hours at the host stand. Valet at the Gate Avenue entrance after 19:00.',
    },
  },
  faq: {
    eyebrow: 'Good to know',
    title: 'Before you book',
    items: [
      { q: 'Do I need to book?', a: "For dinner, yes. Most nights we're full by 8. Lunch is usually fine to walk in. Message us on WhatsApp and we'll confirm within the hour." },
      { q: 'Is the food halal?', a: 'Yes, all of it. Every cut of meat is halal-certified and there is no pork in the kitchen.' },
      { q: 'What about vegetarian and vegan dishes?', a: 'About a third of the menu is vegetarian, and most of that is vegan without changes. Tell us when you book and the kitchen plans ahead.' },
      { q: 'Can I bring children?', a: 'Welcome at lunch, and at dinner until 8. We have high chairs and a small-plates menu for them.' },
      { q: 'Are you open during Ramadan?', a: 'Yes. Iftar is one seating from sunset with a set menu, and suhoor runs until 2 in the morning. Lunch service pauses for the month.' },
    ],
  },
  cta: {
    eyebrow: 'Reservations',
    title: 'Tonight, or the next free Friday.',
    lead: "Tables are held for fifteen minutes. Message us and we'll confirm within the hour.",
    primary: 'Reserve on WhatsApp',
    secondary: 'Call +1 202 555 0199',
    fallback: 'No reply after an hour? Walk in. We keep four seats at the counter for whoever arrives first.',
    photo: { id: '1414235077428-338989a2e8c0', alt: 'A set table at Zafaran with wine glasses and candlelight' },
  },
  footer: {
    blurb: 'Wood-fired Arabian cooking in DIFC since 2017.',
    explore: 'Explore',
    contact: 'Contact',
    hours: 'Hours',
    privacy: 'Privacy',
    terms: 'Terms',
    copyright: '© 2026 Zafaran Restaurant LLC',
  },
  legal: {
    privacy: {
      title: 'Privacy',
      paragraphs: [
        'This website is a set of static pages. It sets no cookies, runs no analytics and collects no personal data.',
        "Photographs are served from Unsplash's image servers, which receive your IP address when an image loads, as any image host does.",
        'When you contact us on WhatsApp, by phone or by email, we keep the details you send only for as long as it takes to handle your booking or your question.',
        'Questions about this policy: hello@zafaran.ae. Last updated 3 September 2026.',
      ],
    },
    terms: {
      title: 'Terms',
      paragraphs: [
        'A booking is confirmed only once you receive a reply from us. Tables are held for fifteen minutes past the booking time.',
        'For groups of eight or more we may ask for a card to hold the table. Nothing is charged unless the whole party fails to arrive without notice.',
        'Prices on this site are in UAE dirhams and include VAT. The menu changes with the season, and a dish shown here may not be available on a given day.',
        'Zafaran Restaurant LLC, Gate Village Building 7, DIFC, Dubai.',
      ],
    },
  },
  notFound: {
    eyebrow: '404',
    title: "This table doesn't exist.",
    body: 'The page you asked for has been cleared away. Try the front door.',
    back: 'Back to Zafaran',
  },
};

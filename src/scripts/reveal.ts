/**
 * Every observer and listener on the site. IntersectionObserver only — a
 * `scroll` listener would reflow each frame and is banned by the brief.
 * Section and chrome components add markup only; they never add observers.
 */
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

/** 1. Generic reveal. Elements already in view animate in on load (the hero). */
function reveal() {
  const els = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (!els.length) return;
  if (reduced) {
    els.forEach((el) => el.classList.add('is-revealed'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      // Stagger only the elements crossing together, in document order.
      const shown = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) =>
          a.target.compareDocumentPosition(b.target) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1,
        );
      shown.forEach((entry, i) => {
        const el = entry.target as HTMLElement;
        el.style.transitionDelay = `${el.dataset.revealDelay ?? i * 120}ms`;
        el.classList.add('is-revealed');
        io.unobserve(el);
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
  );
  els.forEach((el) => io.observe(el));
}

/**
 * 2. Tagline word light-up (B11). Words are lit in DOM order, which is reading
 * order in both ltr and rtl — so Arabic sequences right-to-left with no extra
 * code. Reversible when the user scrolls back up.
 */
function tagline() {
  const words = document.querySelectorAll<HTMLElement>('[data-tagline] [data-word]');
  if (!words.length) return;
  if (reduced) {
    words.forEach((w) => w.classList.add('is-lit'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      let k = 0;
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${k++ * 90}ms`;
          el.classList.add('is-lit');
        } else if (entry.boundingClientRect.top > 0) {
          // Dropped back below the trigger line — the user scrolled up.
          el.style.transitionDelay = '0ms';
          el.classList.remove('is-lit');
        }
        // Left above the viewport: stay lit.
      }
    },
    { threshold: 0, rootMargin: '0px 0px -45% 0px' },
  );
  words.forEach((w) => io.observe(w));
}

/** 3. Sticky mobile booking bar, shown once the hero has scrolled away. */
function stickyCta() {
  const hero = document.getElementById('hero');
  const bar = document.getElementById('sticky-cta');
  if (!hero || !bar) return;
  new IntersectionObserver(
    ([entry]) => bar.classList.toggle('is-visible', !entry.isIntersecting),
    { threshold: 0 },
  ).observe(hero);
}

/** 4. Mobile menu: hamburger morph, overlay, staggered links, focus handling. */
function mobileMenu() {
  const toggle = document.getElementById('nav-toggle');
  const overlay = document.getElementById('nav-overlay');
  if (!toggle || !overlay) return;

  const setOpen = (open: boolean) => {
    toggle.setAttribute('aria-expanded', String(open));
    overlay.classList.toggle('is-open', open);
    // Stop the page scrolling behind a full-screen overlay.
    document.documentElement.style.overflow = open ? 'hidden' : '';
    if (open) overlay.querySelector<HTMLElement>('a')?.focus();
    else toggle.focus();
  };

  toggle.addEventListener('click', () =>
    setOpen(toggle.getAttribute('aria-expanded') !== 'true'),
  );
  overlay.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => setOpen(false)),
  );
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') setOpen(false);
  });
}

reveal();
tagline();
stickyCta();
mobileMenu();

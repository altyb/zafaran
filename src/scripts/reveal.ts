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

/** 3. Masthead turns to glass after the top; phone dock shows once the hero is gone. */
function chrome() {
  const hero = document.getElementById('hero');
  const head = document.getElementById('masthead');
  const dock = document.getElementById('dock');
  if (!hero) return;
  new IntersectionObserver(
    ([e]) => {
      head?.classList.toggle('is-scrolled', e.boundingClientRect.top < -40);
      dock?.classList.toggle('is-visible', !e.isIntersecting);
    },
    { threshold: [0, 0.98] },
  ).observe(hero);
}

/** 4. Timetable: the step crossing the middle of the screen lights up. */
function dayNow() {
  const steps = document.querySelectorAll<HTMLElement>('.day-step');
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.target.classList.toggle('is-now', e.isIntersecting)),
    { rootMargin: '-45% 0px -45% 0px' },
  );
  steps.forEach((s) => io.observe(s));
}

/** 5. Fade images in once they have loaded. */
function images() {
  const done = (img: HTMLImageElement) => img.classList.add('is-loaded');
  document.addEventListener('load', (e) => e.target instanceof HTMLImageElement && done(e.target), true);
  document.querySelectorAll('img').forEach((img) => img.complete && img.naturalWidth && done(img));
}

images();
reveal();
chrome();
dayNow();

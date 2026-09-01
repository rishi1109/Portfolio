// ============================================================
// Footer year
// ============================================================
document.getElementById('year').textContent = new Date().getFullYear();

// ============================================================
// Mobile nav toggle
// ============================================================
const navToggle = document.getElementById('navToggle');
const siteNav = document.querySelector('.site-nav');

navToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

siteNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ============================================================
// Active nav link on scroll
// ============================================================
const sections = ['work', 'projects', 'stack', 'contact']
  .map(id => document.getElementById(id))
  .filter(Boolean);

const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');

const setActiveLink = (id) => {
  navLinks.forEach(link => {
    link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
  });
};

if ('IntersectionObserver' in window && sections.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActiveLink(entry.target.id);
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

  sections.forEach(section => observer.observe(section));
}

// ============================================================
// Hero stat counters — animate once, on load
// ============================================================
const statNums = document.querySelectorAll('.stat-num');

const animateCount = (el) => {
  const target = parseInt(el.dataset.count, 10);
  const duration = 900;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.round(eased * target);
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = target;
    }
  };
  requestAnimationFrame(tick);
};

window.addEventListener('DOMContentLoaded', () => {
  // small delay so it reads as an orchestrated hero sequence,
  // in step with the latency bar animation in the CSS
  setTimeout(() => {
    statNums.forEach(animateCount);
  }, 250);
});
// =============================================
//  PORTFOLIO JEANNE CAROLLINE — main.js
// =============================================

// ── Hamburger Menu ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');

hamburger?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close nav when a link is clicked (mobile)
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── Active nav link on scroll ──
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const observerOptions = { rootMargin: '-40% 0px -40% 0px' };

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.style.background = '');
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.style.background = 'var(--lavender)';
    }
  });
}, observerOptions);

sections.forEach(s => sectionObserver.observe(s));

// ── Skill bar animation on scroll ──
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.style.width; // trigger reflow
      entry.target.classList.add('animated');
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(fill => {
  const targetWidth = fill.style.width;
  fill.style.width = '0%'; // start at 0
  skillObserver.observe(fill);

  // Store target width on element
  fill.dataset.width = targetWidth;
});

// Re-apply widths after observer fires
const realSkillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.width;
      realSkillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(fill => realSkillObserver.observe(fill));

// ── Card hover wiggle effect ──
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.15s ease, box-shadow 0.25s ease';
  });
});

// ── Fade-in on scroll (cards) ──
const fadeEls = document.querySelectorAll('.paper-card, .project-card, .sticker');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity    = '1';
      entry.target.style.transform  = entry.target.style.transform.replace('translateY(30px)', 'translateY(0)') || 'translateY(0)';
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => {
  el.style.opacity    = '0';
  el.style.transform  = (el.style.transform || '') + ' translateY(30px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  fadeObserver.observe(el);
});

// ── Smooth scroll offset for fixed navbar ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── Cursor sparkle effect ──
document.addEventListener('click', (e) => {
  const sparkles = ['✦', '✿', '★', '❀', '♡', '⭐', '🌸'];
  const el = document.createElement('span');
  el.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
  el.style.cssText = `
    position: fixed;
    left: ${e.clientX}px;
    top: ${e.clientY}px;
    pointer-events: none;
    font-size: 1.2rem;
    animation: sparkle-up 0.8s ease forwards;
    z-index: 9999;
    transform: translate(-50%, -50%);
  `;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 800);
});

// Add sparkle keyframe dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes sparkle-up {
    0%   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    100% { opacity: 0; transform: translate(-50%, -120%) scale(1.5); }
  }
`;
document.head.appendChild(style);

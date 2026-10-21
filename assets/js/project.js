// =============================================
//  PROJECT DETAIL PAGE — project.js
//  Shared across all project pages
// =============================================

// ── Hamburger ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');
hamburger?.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// ── Lightbox ──
const lightbox     = document.getElementById('lightbox');
const lbImg        = document.getElementById('lb-img');
const lbCaption    = document.getElementById('lb-caption');
const lbClose      = document.getElementById('lb-close');
const lbPrev       = document.getElementById('lb-prev');
const lbNext       = document.getElementById('lb-next');

const galleryItems = [...document.querySelectorAll('.gallery-item')];
let currentIndex   = 0;

function openLightbox(index) {
  currentIndex = index;
  const item  = galleryItems[index];
  const img   = item.querySelector('img');
  const cap   = item.querySelector('.gallery-caption');
  lbImg.src         = img.src;
  lbCaption.textContent = cap ? cap.textContent : '';
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function showNext() {
  currentIndex = (currentIndex + 1) % galleryItems.length;
  openLightbox(currentIndex);
}

function showPrev() {
  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  openLightbox(currentIndex);
}

galleryItems.forEach((item, i) => {
  item.addEventListener('click', () => openLightbox(i));
});

lbClose?.addEventListener('click', closeLightbox);
lbNext?.addEventListener('click', showNext);
lbPrev?.addEventListener('click', showPrev);

lightbox?.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox?.classList.contains('active')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowRight') showNext();
  if (e.key === 'ArrowLeft')  showPrev();
});

// ── Fade-in on scroll ──
const fadeEls = document.querySelectorAll('.gallery-item, .feature-chip, .paper-card');
const fadeObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity   = '1';
      entry.target.style.transform = entry.target.style.transform.replace('translateY(24px)', '') || '';
      fadeObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

fadeEls.forEach(el => {
  el.style.opacity    = '0';
  el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
  el.style.transform  = (el.style.transform || '') + ' translateY(24px)';
  fadeObs.observe(el);
});

// ── Click sparkle ──
document.addEventListener('click', (e) => {
  const sparkles = ['✦', '✿', '★', '❀', '♡'];
  const el = document.createElement('span');
  el.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
  el.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;pointer-events:none;
    font-size:1.2rem;z-index:9999;transform:translate(-50%,-50%);
    animation:sparkle-up 0.8s ease forwards;`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 800);
});

const sStyle = document.createElement('style');
sStyle.textContent = `@keyframes sparkle-up {
  0%   { opacity:1; transform:translate(-50%,-50%) scale(1); }
  100% { opacity:0; transform:translate(-50%,-120%) scale(1.5); }
}`;
document.head.appendChild(sStyle);

document.getElementById('year').textContent = new Date().getFullYear();

const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const current = window.scrollY;
  if (current > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  if (current > lastScroll && current > 200) {
    header.classList.add('hidden-header');
  } else {
    header.classList.remove('hidden-header');
  }
  lastScroll = current;
});

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
      const index = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 100);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));

const openBtn = document.getElementById('openPrivacy');
const closeBtn = document.getElementById('closePrivacy');
const modal = document.getElementById('privacyModal');

openBtn.addEventListener('click', () => {
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
});

closeBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
  document.body.style.overflow = '';
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
});

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = header.offsetHeight + 10;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

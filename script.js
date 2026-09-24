const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const fiverrUrl = 'https://www.fiverr.com/sellers/muhammadazzam20';

document.querySelector('#year').textContent = new Date().getFullYear();

if (fiverrUrl) {
  const fiverr = document.querySelector('.fiverr-link');
  fiverr.href = fiverrUrl;
  fiverr.hidden = false;
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

document.querySelectorAll('.reveal').forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
  revealObserver.observe(element);
});

if (!reduceMotion && window.matchMedia('(pointer: fine)').matches) {
  const glow = document.querySelector('.cursor-glow');
  let pointerX = innerWidth / 2;
  let pointerY = innerHeight / 2;
  let glowX = pointerX;
  let glowY = pointerY;

  window.addEventListener('pointermove', (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
  }, { passive: true });

  const animateGlow = () => {
    glowX += (pointerX - glowX) * 0.12;
    glowY += (pointerY - glowY) * 0.12;
    glow.style.left = `${glowX}px`;
    glow.style.top = `${glowY}px`;
    requestAnimationFrame(animateGlow);
  };
  animateGlow();

  document.querySelectorAll('.magnetic').forEach((item) => {
    item.addEventListener('pointermove', (event) => {
      const rect = item.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      item.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
    });
    item.addEventListener('pointerleave', () => {
      item.style.transform = '';
    });
  });

  const parallaxItems = [...document.querySelectorAll('[data-parallax]')];
  let ticking = false;
  const updateParallax = () => {
    parallaxItems.forEach((item) => {
      const speed = Number(item.dataset.parallax || 0);
      item.style.translate = `0 ${scrollY * speed}px`;
    });
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
}

let previousScroll = 0;
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  const current = window.scrollY;
  header.classList.toggle('hidden', current > previousScroll && current > 180);
  previousScroll = current;
}, { passive: true });

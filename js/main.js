// Countdown Timer
function initCountdown() {
  const countdownElements = {
    days: document.getElementById('cd-days'),
    hours: document.getElementById('cd-hours'),
    mins: document.getElementById('cd-mins'),
    secs: document.getElementById('cd-secs')
  };

  const launchDate = new Date('2026-08-01T00:00:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = launchDate - now;

    if (timeLeft < 0) {
      countdownElements.days.textContent = '00';
      countdownElements.hours.textContent = '00';
      countdownElements.mins.textContent = '00';
      countdownElements.secs.textContent = '00';
      return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((timeLeft % (1000 * 60)) / 1000);

    countdownElements.days.textContent = String(days).padStart(2, '0');
    countdownElements.hours.textContent = String(hours).padStart(2, '0');
    countdownElements.mins.textContent = String(mins).padStart(2, '0');
    countdownElements.secs.textContent = String(secs).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// Reveal on Scroll Animation
function initRevealOnScroll() {
  const revealElements = document.querySelectorAll('.reveal');
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => observer.observe(el));
}

// Mobile Navigation Toggle
function initMobileNav() {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navCta = document.querySelector('.nav-cta');

  if (!navToggle) return;

  navToggle.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    navToggle.setAttribute('aria-expanded', navLinks.style.display === 'flex');
  });

  // Close menu when a link is clicked
  const allLinks = document.querySelectorAll('.nav-links a');
  allLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.style.display = 'none';
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu when CTA is clicked
  if (navCta) {
    navCta.addEventListener('click', () => {
      navLinks.style.display = 'none';
      navToggle.setAttribute('aria-expanded', 'false');
    });
  }
}

// Initialize all
document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initRevealOnScroll();
  initMobileNav();
});

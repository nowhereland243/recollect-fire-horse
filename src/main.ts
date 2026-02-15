// ═══════════════════════════════════════════════════════════
// RECOLLECT — Main Entry Point (Landing Page)
// ═══════════════════════════════════════════════════════════

import { topics } from './data';
import { initParticles } from './particles';
import { initI18n } from './i18n';
import { initAudio } from './audio';

// ─── Build Topic Cards ───
function renderTopicCards() {
  const grid = document.getElementById('topics-grid');
  if (!grid) return;

  grid.innerHTML = topics.map(t => `
    <a href="/topic.html?t=${t.id}" class="topic-card" data-topic="${t.id}">
      <div class="topic-card__header">
        <span class="topic-card__numeral" data-en="${t.numeralEN}" data-cn="${t.numeral}">${t.numeralEN}</span>
        <div class="topic-card__titles">
          <span class="topic-card__title-cn">${t.titleCN}</span>
          <span class="topic-card__title-en">${t.titleEN}</span>
        </div>
      </div>
      <p class="topic-card__subtitle" data-en="${t.subtitleEN}" data-cn="${t.subtitleCN}">${t.subtitleEN}</p>
      <p class="topic-card__oneliner" data-en="${t.oneLinerEN}" data-cn="${t.oneLinerCN}">${t.oneLinerEN}</p>
      <div class="topic-card__tags">
        ${t.tags.map(tag => `<span class="topic-card__tag">${tag}</span>`).join('')}
      </div>
      <svg class="topic-card__arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
    </a>
  `).join('');
}

// ─── Scroll-Based Animations ───
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = (entry.target as HTMLElement).dataset.delay || '0';
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, parseInt(delay));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  // Observe intro
  const intro = document.querySelector('.intro__text');
  if (intro) observer.observe(intro);

  // Observe cards with stagger
  document.querySelectorAll('.topic-card').forEach((card, i) => {
    (card as HTMLElement).dataset.delay = String(i * 80);
    observer.observe(card);
  });
}

// ─── Nav Scroll Behaviour ───
function initNavScroll() {
  const nav = document.getElementById('nav');
  const scrollHint = document.querySelector('.hero__scroll');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;

    // Nav background on scroll
    if (y > 50) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }

    // Hide scroll hint after scrolling
    if (scrollHint && y > 100) {
      scrollHint.classList.add('hidden');
    }
  }, { passive: true });
}

// ─── Smooth Scroll for Anchor Links ───
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector((anchor as HTMLAnchorElement).getAttribute('href')!);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ─── Init ───
document.addEventListener('DOMContentLoaded', () => {
  renderTopicCards();
  initScrollAnimations();
  initNavScroll();
  initSmoothScroll();
  initParticles();
  initI18n();
  initAudio();
});

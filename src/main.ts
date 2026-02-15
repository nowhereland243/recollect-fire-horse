import { topics } from './data';

import { initI18n } from './i18n';
import { initAudio } from './audio';

import { initLenisScroll } from './scroll';
import { initNav } from './nav';
import gsap from 'gsap';

// ─── Build Topic Cards ───
function renderTopicCards() {
  const container = document.getElementById('topics-grid');
  if (!container) return;

  container.innerHTML = topics.map((t, i) => `
    <a href="/topic.html?t=${t.id}" class="topic-card" data-topic="${t.id}" style="transition-delay: ${i * 0.05}s">
      <div class="topic-card__header">
        <div class="topic-card__numeral">${t.numeralEN} <span class="cn">${t.numeral}</span></div>
      </div>
      <div class="topic-card__content">
        <h3 class="topic-card__title" data-en="${t.titleEN}" data-cn="${t.titleCN}">${t.titleEN}</h3>
        <p class="topic-card__subtitle" data-en="${t.subtitleEN}" data-cn="${t.subtitleCN}">${t.subtitleEN}</p>
        <div class="topic-card__tags">
          ${t.tags.map((tag, ti) => `<span class="topic-card__tag" data-en="${tag}" data-cn="${t.tagsCN[ti]}">${tag}</span>`).join('')}
        </div>
      </div>
      <svg class="topic-card__arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
    </a>
  `).join('');
}

// ─── Scroll Animations ───
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.topic-card').forEach(card => observer.observe(card));
  
  // Hero Ritual Sequence Entrance (GSAP)
  const heroContent = document.querySelector('.hero__content');
  if (heroContent) {
      // Animate the pre-title and subtitle/date normally
      const preTitle = heroContent.querySelector('.hero__pre');
      const subTitle = heroContent.querySelector('.hero__title-sub');
      const dateEl = heroContent.querySelector('.hero__date');
      const scrollEl = heroContent.querySelector('.hero__scroll');
      
      if (preTitle) {
        gsap.fromTo(preTitle, { y: 30, opacity: 0 }, { duration: 1.2, y: 0, opacity: 1, ease: "power3.out", delay: 0.2 });
      }
      
      // Ritual words — stagger cascade with wave feel
      const steps = heroContent.querySelectorAll('.hero__step');
      steps.forEach((step, i) => {
        const isHighlight = step.classList.contains('hero__step--highlight');
        gsap.fromTo(step,
          { y: 60 + i * 10, opacity: 0, scale: isHighlight ? 0.9 : 0.95 },
          {
            duration: isHighlight ? 1.8 : 1.2,
            y: 0,
            opacity: 1,
            scale: 1,
            ease: isHighlight ? "elastic.out(1, 0.75)" : "power3.out",
            delay: 0.5 + i * 0.25,
            clearProps: "transform"
          }
        );
      });
      
      // Sub-elements fade in after
      [subTitle, dateEl].forEach((el, i) => {
        if (el) {
          gsap.fromTo(el, { y: 20, opacity: 0 }, { duration: 1, y: 0, opacity: 1, ease: "power3.out", delay: 1.8 + i * 0.2, clearProps: "all" });
        }
      });

      // Scroll button — click to scroll, auto-hide on scroll
      if (scrollEl) {
        gsap.fromTo(scrollEl, { opacity: 0 }, { duration: 1, opacity: 1, ease: "power3.out", delay: 2.4, clearProps: "opacity" });

        scrollEl.addEventListener('click', () => {
          const intro = document.getElementById('intro');
          if (intro) intro.scrollIntoView({ behavior: 'smooth' });
        });

        let scrollHidden = false;
        window.addEventListener('scroll', () => {
          if (!scrollHidden && window.scrollY > window.innerHeight * 0.3) {
            scrollEl.classList.add('hidden');
            scrollHidden = true;
          }
        }, { passive: true });
      }
  }
}

// ... imports
import { SceneManager } from './webgl/Scene';
import { HeroParticles } from './webgl/HeroParticles';
import { CursorParticles } from './webgl/CursorParticles';
import { WaveParticles } from './webgl/WaveParticles';

// ... 

document.addEventListener('DOMContentLoaded', () => {
  renderTopicCards();
  initNav();
  initScrollAnimations();
  initLenisScroll();
  initI18n();
  initAudio();
  
  // Initialize Quantum Particles
  const scene = new SceneManager();
  const heroParticles = new HeroParticles();
  scene.add(heroParticles);
  scene.add(new CursorParticles()); // Gold Sparks
  scene.add(new WaveParticles());   // Flowing Terrain
  
  // Inject Global Grain
  const grain = document.createElement('div');
  grain.className = 'quantum-grain';
  document.body.appendChild(grain);
  
  // Inject Timeline Line
  const topicsGrid = document.querySelector('.topics');
  if (topicsGrid) {
      const timeline = document.createElement('div');
      timeline.className = 'timeline-line';
      topicsGrid.prepend(timeline);
  }
});

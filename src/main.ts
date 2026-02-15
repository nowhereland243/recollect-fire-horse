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
          ${t.tags.map(tag => `<span class="topic-card__tag">${tag}</span>`).join('')}
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
  
  // Hero Organic Arc Entrance (GSAP)
  const heroContent = document.querySelector('.hero__content');
  if (heroContent) {
      const elements = heroContent.children;
      gsap.fromTo(elements, 
        { 
            y: 100, 
            opacity: 0, 
            rotation: 2 
        },
        { 
            duration: 1.5, 
            y: 0, 
            opacity: 1, 
            rotation: 0, 
            stagger: 0.2, 
            ease: "power3.out",
            clearProps: "all"
        }
      );
  }
}

// ... imports
import { SceneManager } from './webgl/Scene';
import { HeroParticles } from './webgl/HeroParticles';

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
  scene.add(new HeroParticles());
  
  // Inject Global Grain
  const grain = document.createElement('div');
  grain.className = 'quantum-grain';
  document.body.appendChild(grain);
  
});

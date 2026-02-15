// ═══════════════════════════════════════════════════════════
// RECOLLECT — Topic Detail Page Logic
// ═══════════════════════════════════════════════════════════

import { topics } from './data';
import { initI18n } from './i18n';

function renderTopic() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('t') || '1');
  const topic = topics.find(t => t.id === id);

  if (!topic) {
    window.location.href = '/';
    return;
  }

  // Update page title
  document.title = `${topic.titleCN} ${topic.titleEN} — RECOLLECT`;

  // Header
  const numeral = document.getElementById('topic-numeral');
  const titleCN = document.getElementById('topic-title-cn');
  const titleEN = document.getElementById('topic-title-en');
  const subtitle = document.getElementById('topic-subtitle');
  const readTime = document.getElementById('topic-read-time');
  const tagsContainer = document.getElementById('topic-tags');

  if (numeral) {
    numeral.textContent = topic.numeralEN;
    numeral.setAttribute('data-en', topic.numeralEN);
    numeral.setAttribute('data-cn', topic.numeral);
  }
  if (titleCN) titleCN.textContent = topic.titleCN;
  if (titleEN) titleEN.textContent = topic.titleEN;
  if (subtitle) {
    subtitle.textContent = topic.subtitleEN;
    subtitle.setAttribute('data-en', topic.subtitleEN);
    subtitle.setAttribute('data-cn', topic.subtitleCN);
  }
  if (readTime) readTime.textContent = topic.readTime;
  if (tagsContainer) {
    tagsContainer.innerHTML = topic.tags.map(tag => 
      `<span class="topic-header__tag">${tag}</span>`
    ).join('');
  }

  // Sections (Q&A)
  const body = document.querySelector('#topic-body .container');
  if (body) {
    body.innerHTML = topic.sections.map((s, i) => `
      <article class="topic-section" style="animation-delay: ${i * 0.1}s">
        <h2 class="topic-section__question">${s.question}</h2>
        <div class="topic-section__answer">
          <p>${s.answer}</p>
        </div>
        ${i < topic.sections.length - 1 ? '<hr class="topic-section__divider" />' : ''}
      </article>
    `).join('') + `
      <div class="topic-closing">
        <p class="topic-closing__text"><em>${topic.closingLine}</em></p>
        <p class="topic-closing__attribution">— RECOLLECT: The Year of the Fire Horse</p>
      </div>
    `;
  }

  // Glossary
  const glossaryGrid = document.getElementById('glossary-grid');
  if (glossaryGrid) {
    glossaryGrid.innerHTML = topic.glossary.map(g => `
      <div class="topic-glossary__item">
        <span class="topic-glossary__term">${g.term}</span>
        <span class="topic-glossary__pinyin">${g.pinyin}</span>
        <span class="topic-glossary__meaning">${g.meaning}</span>
      </div>
    `).join('');
  }

  // Prev/Next navigation
  const prevLink = document.getElementById('topic-prev') as HTMLAnchorElement;
  const nextLink = document.getElementById('topic-next') as HTMLAnchorElement;
  const prevTitle = document.getElementById('prev-title');
  const nextTitle = document.getElementById('next-title');

  if (id > 1) {
    const prev = topics[id - 2];
    if (prevLink) prevLink.href = `/topic.html?t=${prev.id}`;
    if (prevTitle) prevTitle.textContent = `${prev.numeralEN} · ${prev.titleCN} · ${prev.titleEN}`;
  } else {
    if (prevLink) prevLink.style.visibility = 'hidden';
  }

  if (id < 10) {
    const next = topics[id];
    if (nextLink) nextLink.href = `/topic.html?t=${next.id}`;
    if (nextTitle) nextTitle.textContent = `${next.numeralEN} · ${next.titleCN} · ${next.titleEN}`;
  } else {
    if (nextLink) nextLink.style.visibility = 'hidden';
  }

  // Animate sections on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.topic-section').forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  renderTopic();
  initI18n();
});

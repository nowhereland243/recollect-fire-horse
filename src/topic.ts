// ═══════════════════════════════════════════════════════════
// RECOLLECT — Topic Detail Page Logic
// ═══════════════════════════════════════════════════════════

import { topics } from './data';
import { initI18n } from './i18n';
import { VisualFX } from './fx';

function renderTopic() {
  const params = new URLSearchParams(window.location.search);
  const idCursor = params.get('t');

  // Find topic by string ID
  const topicIndex = topics.findIndex(t => t.id === idCursor);
  const topic = topics[topicIndex];

  if (!topic) {
    // Fallback or redirect? 
    // If no ID, maybe default to first? Or redirect home.
    if (!idCursor) {
        window.location.href = '/?t=origins'; // Redirect to first if empty
        return;
    }
    // If invalid ID, redirect home
    window.location.href = '/';
    return;
  }

  // Apply Theme Color
  if (topic.themeColor) {
      document.documentElement.style.setProperty('--topic-color', topic.themeColor);
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
    numeral.style.color = topic.themeColor || 'var(--clr-gold)'; // Apply color to numeral
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
      `<span class="topic-header__tag" style="color:${topic.themeColor}; background:${topic.themeColor}1a">${tag}</span>`
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
        ${i < topic.sections.length - 1 ? `<hr class="topic-section__divider" style="border-color:${topic.themeColor}33" />` : ''}
      </article>
    `).join('') + `
      <div class="topic-closing" style="border-color:${topic.themeColor}33">
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
        <span class="topic-glossary__pinyin" style="color:${topic.themeColor}">${g.pinyin}</span>
        <span class="topic-glossary__meaning">${g.meaning}</span>
      </div>
    `).join('');
  }

  // Prev/Next navigation
  const prevLink = document.getElementById('topic-prev') as HTMLAnchorElement;
  const nextLink = document.getElementById('topic-next') as HTMLAnchorElement;
  const prevTitle = document.getElementById('prev-title');
  const nextTitle = document.getElementById('next-title');

  if (topicIndex > 0) {
    const prev = topics[topicIndex - 1];
    if (prevLink) prevLink.href = `/topic.html?t=${prev.id}`;
    if (prevTitle) prevTitle.textContent = `${prev.numeralEN} · ${prev.titleCN} · ${prev.titleEN}`;
  } else {
    if (prevLink) prevLink.parentElement!.style.visibility = 'hidden'; // Hide the container (link)
  }

  if (topicIndex < topics.length - 1) {
    const next = topics[topicIndex + 1];
    if (nextLink) nextLink.href = `/topic.html?t=${next.id}`;
    if (nextTitle) nextTitle.textContent = `${next.numeralEN} · ${next.titleCN} · ${next.titleEN}`;
  } else {
    if (nextLink) nextLink.parentElement!.style.visibility = 'hidden';
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
  // Init VisualFX (will add cursor trail, picking up theme color from style if implemented, 
  // currently FX defaults to gold, but we updated it to use default.
  // We can pass the color to FX if we update constructor, but standard gold trail is fine for consistency, 
  // or we can update FX to read --topic-color variable.)
  new VisualFX();
  // FX reads hoverColor from cards, but on detail page there are no cards. 
  // It defaults to Gold. 
});

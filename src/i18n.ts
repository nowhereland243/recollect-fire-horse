// ═══════════════════════════════════════════════════════════
// RECOLLECT — Bilingual Toggle (EN / 中)
// ═══════════════════════════════════════════════════════════

let currentLang: 'en' | 'cn' = 'en';
const langChangeCallbacks: Array<(lang: 'en' | 'cn') => void> = [];

export function initI18n() {
  const toggle = document.getElementById('lang-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'cn' : 'en';
    applyLanguage();
    toggle.textContent = currentLang === 'en' ? 'EN / 中' : '中 / EN';
    toggle.classList.toggle('active', currentLang === 'cn');

    // Fire callbacks for dynamic content re-rendering
    langChangeCallbacks.forEach(cb => cb(currentLang));
  });
}

function applyLanguage() {
  // Find all elements with data-en and data-cn attributes
  document.querySelectorAll('[data-en][data-cn]').forEach(el => {
    const text = el.getAttribute(`data-${currentLang}`);
    if (text) {
      el.textContent = text;
    }
  });

  // Update html lang attribute
  document.documentElement.lang = currentLang === 'en' ? 'en' : 'zh-CN';
}

export function getLang(): 'en' | 'cn' {
  return currentLang;
}

export function onLangChange(callback: (lang: 'en' | 'cn') => void) {
  langChangeCallbacks.push(callback);
}

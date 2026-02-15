// ═══════════════════════════════════════════════════════════
// RECOLLECT — Navigation Logic
// Handles mobile toggle and scroll effects
// ═══════════════════════════════════════════════════════════

export function initNav() {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('nav-toggle');
  
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('nav--open');
      
      // Accessibility update can go here 
      const isOpen = nav.classList.contains('nav--open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      
      if (isOpen) {
        document.body.style.overflow = 'hidden'; // Lock scroll
      } else {
        document.body.style.overflow = '';
      }
    });

    // Close on link click
    nav.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('nav--open');
        document.body.style.overflow = '';
      });
    });
  }

  // Scroll effect (glassmorphism on scroll)
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav?.classList.add('nav--scrolled');
    } else {
      nav?.classList.remove('nav--scrolled');
    }
  }, { passive: true });
}

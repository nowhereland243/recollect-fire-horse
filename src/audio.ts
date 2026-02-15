// ═══════════════════════════════════════════════════════════
// RECOLLECT — Scroll-Triggered Audio
// Sound plays ONLY while scrolling and ONLY on landing page
// ═══════════════════════════════════════════════════════════

let audio: HTMLAudioElement | null = null;
let isEnabled = false;
let isPlaying = false;
let fadeTimer: number | null = null;
let scrollStopTimer: number | null = null;

export function initAudio() {
  // Only initialize on landing page
  if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') return;

  const toggle = document.getElementById('audio-toggle');
  if (!toggle) return;

  audio = new Audio('/assets/ambient-audio.mp3');
  audio.loop = true;
  audio.volume = 0;

  toggle.addEventListener('click', () => {
    isEnabled = !isEnabled;
    toggle.textContent = isEnabled ? 'SOUND ON' : 'SOUND OFF';
    toggle.classList.toggle('active', isEnabled);

    if (!isEnabled && isPlaying) {
      fadeOut(() => {
        audio!.pause();
        isPlaying = false;
      });
    }
  });

  // Listen for scroll events
  window.addEventListener('scroll', onScroll, { passive: true });
}

function onScroll() {
  if (!isEnabled || !audio) return;

  // Start playing if not already
  if (!isPlaying) {
    audio.play().then(() => {
      isPlaying = true;
      fadeIn();
    }).catch(() => {});
  } else {
    // Already playing — boost volume
    fadeIn();
  }

  // Reset the stop timer — will fade out after 500ms of no scrolling
  if (scrollStopTimer) clearTimeout(scrollStopTimer);
  scrollStopTimer = window.setTimeout(() => {
    if (isPlaying && isEnabled) {
      fadeOut(() => {
        // Keep playing at 0 volume so we can resume instantly
      });
    }
  }, 500);
}

function fadeIn() {
  if (!audio) return;
  if (fadeTimer) clearInterval(fadeTimer);

  const targetVolume = 0.35;
  fadeTimer = window.setInterval(() => {
    if (!audio) return;
    if (audio.volume < targetVolume) {
      audio.volume = Math.min(targetVolume, audio.volume + 0.03);
    } else {
      if (fadeTimer) clearInterval(fadeTimer);
    }
  }, 30);
}

function fadeOut(callback?: () => void) {
  if (!audio) return;
  if (fadeTimer) clearInterval(fadeTimer);

  fadeTimer = window.setInterval(() => {
    if (!audio) return;
    if (audio.volume > 0.01) {
      audio.volume = Math.max(0, audio.volume - 0.04);
    } else {
      audio.volume = 0;
      if (fadeTimer) clearInterval(fadeTimer);
      if (callback) callback();
    }
  }, 30);
}

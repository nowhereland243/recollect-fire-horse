// ═══════════════════════════════════════════════════════════
// RECOLLECT — Audio Ambience Controller
// Handles background loop and user toggle
// ═══════════════════════════════════════════════════════════

export function initAudio() {
  const toggle = document.getElementById('audio-toggle');
  if (!toggle) return;

  const audio = new Audio('/assets/ambience.mp3');
  audio.loop = true;
  audio.volume = 0; // Start silent

  let isPlaying = false;

  toggle.addEventListener('click', () => {
    if (isPlaying) {
      // Fade out and pause
      fadeOut(audio, () => {
        audio.pause();
        toggle.textContent = 'SOUND OFF';
        toggle.classList.remove('active');
        isPlaying = false;
      });
    } else {
      // Play and fade in
      audio.play().then(() => {
        fadeIn(audio);
        toggle.textContent = 'SOUND ON';
        toggle.classList.add('active');
        isPlaying = true;
      }).catch(err => {
        console.warn('Audio autoplay blocked:', err);
      });
    }
  });
}

function fadeIn(audio: HTMLAudioElement) {
  const targetVolume = 0.5; // Max volume 50% for background
  const step = 0.02;
  const interval = 50;

  // Clear any existing fade
  // @ts-ignore
  if (audio.fadeInterval) clearInterval(audio.fadeInterval);

  // @ts-ignore
  audio.fadeInterval = setInterval(() => {
    if (audio.volume < targetVolume) {
      audio.volume = Math.min(targetVolume, audio.volume + step);
    } else {
      // @ts-ignore
      clearInterval(audio.fadeInterval);
    }
  }, interval);
}

function fadeOut(audio: HTMLAudioElement, callback: () => void) {
  const step = 0.05;
  const interval = 50;

  // Clear any existing fade
  // @ts-ignore
  if (audio.fadeInterval) clearInterval(audio.fadeInterval);

  // @ts-ignore
  audio.fadeInterval = setInterval(() => {
    if (audio.volume > 0) {
      audio.volume = Math.max(0, audio.volume - step);
    } else {
      // @ts-ignore
      clearInterval(audio.fadeInterval);
      callback();
    }
  }, interval);
}

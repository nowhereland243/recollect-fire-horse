// ═══════════════════════════════════════════════════════════
// RECOLLECT — Golden Particle System for Hero
// Floating embers / sparks over the Fire Horse hero image
// ═══════════════════════════════════════════════════════════

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  hue: number;
  life: number;
  maxLife: number;
}

export function initParticles() {
  const canvas = document.getElementById('particles') as HTMLCanvasElement;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Mobile-conscious particle count
  const isMobile = window.innerWidth < 768;
  const PARTICLE_COUNT = isMobile ? 30 : 60;
  const particles: Particle[] = [];

  function resize() {
    const rect = canvas.parentElement?.getBoundingClientRect();
    if (rect) {
      canvas.width = rect.width;
      canvas.height = rect.height;
    }
  }

  function createParticle(): Particle {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.4 - 0.1,
      radius: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.6 + 0.2,
      hue: 38 + Math.random() * 15,       // Gold range: 38-53
      life: 0,
      maxLife: 200 + Math.random() * 300,
    };
  }

  function init() {
    resize();
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = createParticle();
      p.life = Math.random() * p.maxLife;  // Stagger initial positions
      particles.push(p);
    }
  }

  let hueShift = 0;

  function update() {
    hueShift += 0.02;  // Very slow drift between gold → warm red → gold
    const globalHueOffset = Math.sin(hueShift) * 8;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.life++;
      p.x += p.vx;
      p.y += p.vy;

      // Gentle sine wave
      p.x += Math.sin(p.life * 0.01) * 0.15;

      // Fade in and out over lifetime
      const lifeRatio = p.life / p.maxLife;
      if (lifeRatio < 0.1) {
        p.alpha = (lifeRatio / 0.1) * 0.6;
      } else if (lifeRatio > 0.8) {
        p.alpha = ((1 - lifeRatio) / 0.2) * 0.6;
      }

      // Respawn when expired or off-screen
      if (p.life >= p.maxLife || p.y < -10 || p.x < -10 || p.x > canvas.width + 10) {
        Object.assign(p, createParticle());
        p.y = canvas.height + 10; // Start from bottom
      }
    }
  }

  function draw() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const globalHueOffset = Math.sin(hueShift) * 8;

    for (const p of particles) {
      const hue = p.hue + globalHueOffset;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${hue}, 75%, 60%, ${p.alpha})`;
      ctx.fill();

      // Soft glow
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${hue}, 75%, 60%, ${p.alpha * 0.15})`;
      ctx.fill();
    }
  }

  function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
  }

  init();
  loop();

  // Responsive resize
  let resizeTimer: ReturnType<typeof setTimeout>;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 200);
  });
}

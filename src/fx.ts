export class VisualFX {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    width: number = 0;
    height: number = 0;
    particles: Particle[] = [];
    mouseX: number = 0;
    mouseY: number = 0;
    hoveredCard: HTMLElement | null = null;
    
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '9999';
        this.canvas.style.mixBlendMode = 'screen'; 
        
        document.body.appendChild(this.canvas);
        
        this.ctx = this.canvas.getContext('2d')!;
        this.resize();
        
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => this.onMouseMove(e));
        
        this.initCardListeners();
        this.loop();
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    initCardListeners() {
        // Find all topic cards and attach hover listeners
        // We use event delegation or find them all
        const cards = document.querySelectorAll('.topic-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => this.hoveredCard = card as HTMLElement);
            card.addEventListener('mouseleave', () => this.hoveredCard = null);
        });
    }

    onMouseMove(e: MouseEvent) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        
        // Liquid Cursor Trail
        for(let i=0; i<2; i++) {
            this.particles.push(new Particle(this.mouseX, this.mouseY, 'cursor'));
        }
    }

    loop() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Topic Card Embers
        if (this.hoveredCard) {
            const rect = this.hoveredCard.getBoundingClientRect();
            // Emit from bottom edge
            // Random x between left and right
            const x = rect.left + Math.random() * rect.width;
            const y = rect.bottom; 
            
            // Add ember particles
            if (Math.random() > 0.5) { // Control density
                this.particles.push(new Particle(x, y, 'ember'));
            }
        }

        // Update and draw all particles
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            p.update();
            p.draw(this.ctx);
            
            if (p.life <= 0) {
                this.particles.splice(i, 1);
                i--;
            }
        }
        
        requestAnimationFrame(() => this.loop());
    }
}

class Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    size: number;
    color: string;
    type: 'cursor' | 'ember';

    constructor(x: number, y: number, type: 'cursor' | 'ember') {
        this.x = x;
        this.y = y;
        this.type = type;
        
        if (type === 'cursor') {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 0.5;
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
            this.maxLife = 40 + Math.random() * 40;
            this.size = 2 + Math.random() * 4;
            // Cursor Gold Palette
            const colors = ['#DFBD69', '#926F34', '#FBF5B7'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        } else {
            // Ember: floated upwards
            this.vx = (Math.random() - 0.5) * 1; // drift left/right
            this.vy = -1 - Math.random() * 1.5; // Upwards
            this.maxLife = 60 + Math.random() * 40;
            this.size = 1 + Math.random() * 2;
            // Fire/Gold Palette
            const colors = ['#D4380D', '#FF6B35', '#DFBD69'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        
        this.life = this.maxLife;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life--;
        this.size *= 0.96; // Shrink
        
        if (this.type === 'ember') {
            this.vy *= 0.98; // Slow down slightly
            this.x += Math.sin(this.life * 0.1) * 0.5; // Wiggle
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.globalAlpha = (this.life / this.maxLife) * 0.8;
        ctx.fillStyle = this.color;
        
        if (this.type === 'cursor') {
            ctx.shadowBlur = 15;
            ctx.shadowColor = this.color;
        } else {
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#D4380D';
        }
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

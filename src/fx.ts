import { topics } from './data';

export class VisualFX {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    width: number = 0;
    height: number = 0;
    particles: Particle[] = [];
    mouseX: number = 0;
    mouseY: number = 0;
    hoveredCard: HTMLElement | null = null;
    hoverColor: string = '#DFBD69';
    
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
        
        // Defer listener attachment to ensure DOM is ready
        setTimeout(() => this.initCardListeners(), 100);
        this.loop();
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    initCardListeners() {
        const cards = document.querySelectorAll('.topic-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.hoveredCard = card as HTMLElement;
                const topicId = (card as HTMLElement).dataset.topic;
                // Find topic color
                const topic = topics.find(t => t.id === topicId); // ID is string now
                this.hoverColor = topic?.themeColor || '#DFBD69';
                
                // EXPLOSION: Add burst of particles
                this.explode(card as HTMLElement, this.hoverColor);
            });
            card.addEventListener('mouseleave', () => this.hoveredCard = null);
        });
    }

    explode(element: HTMLElement, color: string) {
        const rect = element.getBoundingClientRect();
        // Burst from all sides
        for (let i = 0; i < 30; i++) {
            const side = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
            let x, y;
            if (side === 0) { x = rect.left + Math.random() * rect.width; y = rect.top; }
            else if (side === 1) { x = rect.right; y = rect.top + Math.random() * rect.height; }
            else if (side === 2) { x = rect.left + Math.random() * rect.width; y = rect.bottom; }
            else { x = rect.left; y = rect.top + Math.random() * rect.height; }
            
            this.particles.push(new Particle(x, y, 'burst', color));
        }
    }

    onMouseMove(e: MouseEvent) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        
        // Liquid Cursor Trail
        for(let i=0; i<2; i++) {
            this.particles.push(new Particle(this.mouseX, this.mouseY, 'cursor', '#DFBD69'));
        }
    }

    loop() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Topic Card Hover Embers (Continuous)
        if (this.hoveredCard) {
            const rect = this.hoveredCard.getBoundingClientRect();
            // Emit from bottom
            const x = rect.left + Math.random() * rect.width;
            const y = rect.bottom; 
            
            if (Math.random() > 0.5) {
                this.particles.push(new Particle(x, y, 'ember', this.hoverColor));
            }
        }

        // Update and draw
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
    type: 'cursor' | 'ember' | 'burst';

    constructor(x: number, y: number, type: 'cursor' | 'ember' | 'burst', colorBase: string) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.color = colorBase;
        
        if (type === 'cursor') {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 0.5;
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
            this.maxLife = 40 + Math.random() * 40;
            this.size = 2 + Math.random() * 4;
            const colors = ['#DFBD69', '#926F34', '#FBF5B7'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        } else if (type === 'burst') {
            // Explosive
            const angle = Math.random() * Math.PI * 2;
            const speed = 1 + Math.random() * 3;
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
            this.maxLife = 30 + Math.random() * 20;
            this.size = 2 + Math.random() * 3;
        } else {
            // Ember
            this.vx = (Math.random() - 0.5) * 1; 
            this.vy = -1 - Math.random() * 1.5;
            this.maxLife = 60 + Math.random() * 40;
            this.size = 1 + Math.random() * 2;
        }
        
        this.life = this.maxLife;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life--;
        this.size *= 0.96;
        
        if (this.type === 'ember') {
            this.vy *= 0.98;
            this.x += Math.sin(this.life * 0.1) * 0.5;
        } else if (this.type === 'burst') {
            this.vx *= 0.9;
            this.vy *= 0.9;
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.globalAlpha = (this.life / this.maxLife) * 0.8;
        ctx.fillStyle = this.color;
        
        if (this.type === 'cursor') {
            ctx.shadowBlur = 15;
            ctx.shadowColor = this.color;
        } else if (this.type === 'burst') {
             ctx.shadowBlur = 20;
             ctx.shadowColor = this.color;
             ctx.globalCompositeOperation = 'lighter';
        } else {
            ctx.shadowBlur = 8;
            ctx.shadowColor = this.color;
        }
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

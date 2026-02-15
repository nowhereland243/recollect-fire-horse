import * as THREE from 'three';
import { ParticleSystem } from './ParticleSystem';

const vertexShader = `
attribute float aSize;
attribute float aLife;
attribute vec3 aColor;

varying vec3 vColor;
varying float vLife;

void main() {
    vColor = aColor;
    vLife = aLife;
    
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    gl_PointSize = aSize * (1.0 / -mvPosition.z) * 2.0;
}
`;

const fragmentShader = `
varying vec3 vColor;
varying float vLife;

void main() {
    float r = distance(gl_PointCoord, vec2(0.5));
    if (r > 0.5) discard;
    
    float alpha = 1.0 - smoothstep(0.3, 0.5, r);
    gl_FragColor = vec4(vColor, alpha * vLife);
}
`;

export class CursorParticles extends ParticleSystem {
    particles: { pos: THREE.Vector3, vel: THREE.Vector3, life: number, size: number, color: THREE.Color }[] = [];
    maxParticles = 500;
    mouse = new THREE.Vector2(-1000, -1000);
    lastMouse = new THREE.Vector2(-1000, -1000);
    
    // Arrays for BufferGeometry
    positions: Float32Array;
    sizes: Float32Array;
    lifes: Float32Array;
    colors: Float32Array;

    constructor() {
        super(500);
        this.positions = new Float32Array(this.maxParticles * 3);
        this.sizes = new Float32Array(this.maxParticles);
        this.lifes = new Float32Array(this.maxParticles);
        this.colors = new Float32Array(this.maxParticles * 3);
        
        this.init();
        
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = -(e.clientY / window.innerHeight) * 2 + 1;
            this.mouse.set(x, y);
        });

        window.addEventListener('touchmove', (e) => {
             if (e.touches.length > 0) {
                 const x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
                 const y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
                 this.mouse.set(x, y);
             }
        });
    }

    init() {
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
        geometry.setAttribute('aSize', new THREE.BufferAttribute(this.sizes, 1));
        geometry.setAttribute('aLife', new THREE.BufferAttribute(this.lifes, 1));
        geometry.setAttribute('aColor', new THREE.BufferAttribute(this.colors, 3));
        
        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });
        
        this.mesh = new THREE.Points(geometry, material);
        this.mesh.frustumCulled = false;
        
        // Init pool
        for(let i=0; i<this.maxParticles; i++) {
            this.particles.push({
                pos: new THREE.Vector3(),
                vel: new THREE.Vector3(),
                life: 0,
                size: 0,
                color: new THREE.Color()
            });
        }
    }

    update(_time: number, _delta: number) {
        // Spawn on movement
        const speed = this.mouse.distanceTo(this.lastMouse);
        if (speed > 0.001) {
            // Spawn particles
            const count = Math.min(5, Math.ceil(speed * 100)); 
            for (let i = 0; i < count; i++) {
                this.spawn(this.mouse);
            }
        }
        this.lastMouse.copy(this.mouse);
        
        // Update particles
        let activeCount = 0;
        
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            
            if (p.life > 0) {
                p.life -= 0.02; // Fade out
                p.pos.add(p.vel);
                p.vel.y += 0.002; // Float up/Gravity
                
                // Update Arrays
                this.positions[i * 3] = p.pos.x;
                this.positions[i * 3 + 1] = p.pos.y;
                this.positions[i * 3 + 2] = p.pos.z;
                this.sizes[i] = p.size;
                this.lifes[i] = p.life;
                this.colors[i * 3] = p.color.r;
                this.colors[i * 3 + 1] = p.color.g;
                this.colors[i * 3 + 2] = p.color.b;
                
                activeCount++;
            } else {
                this.lifes[i] = 0;
            }
        }
        
        this.geometry.attributes.position.needsUpdate = true;
        this.geometry.attributes.aLife.needsUpdate = true;
        this.geometry.attributes.aSize.needsUpdate = true;
        this.geometry.attributes.aColor.needsUpdate = true;
    }

    spawn(mouse: THREE.Vector2) {
        // Recycle dead particle
        let idx = -1;
        for (let i = 0; i < this.particles.length; i++) {
            if (this.particles[i].life <= 0) {
                idx = i;
                break;
            }
        }
        
        if (idx === -1) return; // Pool full
        
        const p = this.particles[idx];
        
        // Map mouse (-1, 1) to rough world coordinates at z=0 (Camera z=5, FOV=75)
        const scaleX = 8.0; 
        const scaleY = 4.5; 
        
        p.pos.set(mouse.x * scaleX, mouse.y * scaleY, 0);
        
        // Random spread
        p.pos.x += (Math.random() - 0.5) * 0.2;
        p.pos.y += (Math.random() - 0.5) * 0.2;
        
        // Velocity (Explode)
        p.vel.set(
            (Math.random() - 0.5) * 0.05,
            (Math.random() - 0.5) * 0.05,
            (Math.random() - 0.5) * 0.05
        );
        
        p.life = 1.0;
        p.size = 10.0 + Math.random() * 10.0;
        p.color.setHex(0xFFD700); // Gold
        
        // Occasional red spark
        if (Math.random() > 0.8) p.color.setHex(0xD4380D);
    }
    
    resize(_width: number, _height: number) {}
}

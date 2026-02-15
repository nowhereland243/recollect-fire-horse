import * as THREE from 'three';
import { ParticleSystem } from './ParticleSystem';

/**
 * WaveParticles — Flowing energy terrain behind topics section.
 * Colorpong Cosmos-inspired: noise-driven mountain/wave terrain
 * that VISIBLY reacts to scroll and mouse.
 */

const vertexShader = `
uniform float uTime;
uniform float uScrollSpeed;
uniform vec2 uMouse;
uniform float uPixelRatio;

attribute float aRandom;

varying float vAlpha;
varying float vHeight;

// Simplex Noise (3D)
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
float snoise(vec3 v) {
  const vec2  C = vec2(1.0/6.0, 1.0/3.0);
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3  ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

void main() {
    vec3 pos = position;
    
    float t = uTime * 0.18;
    
    // Multi-octave terrain — stronger amplitude
    float n1 = snoise(vec3(pos.x * 0.25 + t, pos.z * 0.25 - t * 0.15, 0.0));
    float n2 = snoise(vec3(pos.x * 0.6 - t * 0.25, pos.z * 0.6 + t * 0.1, 1.0)) * 0.6;
    float n3 = snoise(vec3(pos.x * 1.2 + t * 0.08, pos.z * 1.2 - t * 0.3, 2.0)) * 0.3;
    
    float height = (n1 + n2 + n3) * 1.2;
    
    // Scroll energy — particles get MORE turbulent and rise when scrolling
    float scrollEnergy = uScrollSpeed;
    height += scrollEnergy * (0.3 + aRandom * 0.5);
    
    // Rising sparks when scrolling — some particles lift off
    float liftChance = step(0.85, aRandom);
    pos.y += liftChance * scrollEnergy * 2.0;
    
    // Mouse influence — particles rise toward cursor
    float mouseDist = length(pos.xz - uMouse);
    float mouseInfluence = smoothstep(4.0, 0.0, mouseDist) * 1.0;
    height += mouseInfluence;
    
    // Gentle random wiggle
    height += sin(uTime * 2.5 + aRandom * 6.28) * 0.05;
    
    pos.y += height;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    // Size: bigger on peaks + bigger during scroll
    float sizeBase = 1.8 + height * 0.6 + scrollEnergy * 1.0;
    gl_PointSize = sizeBase * uPixelRatio;
    gl_PointSize *= (1.0 / -mvPosition.z);
    
    // Alpha: much more visible now
    float edgeFade = smoothstep(10.0, 6.0, abs(pos.x)) * smoothstep(6.0, 3.0, abs(pos.z));
    float baseAlpha = 0.35 + height * 0.3 + mouseInfluence * 0.4 + scrollEnergy * 0.3;
    vAlpha = edgeFade * clamp(baseAlpha, 0.0, 0.9);
    vHeight = height;
}
`;

const fragmentShader = `
varying float vAlpha;
varying float vHeight;

void main() {
    float r = distance(gl_PointCoord, vec2(0.5));
    if (r > 0.5) discard;
    
    float alpha = (1.0 - smoothstep(0.1, 0.5, r)) * vAlpha;
    
    // Color: cream gold base, brighter warm on peaks
    vec3 baseColor = vec3(0.957, 0.941, 0.808); // #f4f0ce
    vec3 peakColor = vec3(1.0, 0.9, 0.75);      // warm highlight
    vec3 color = mix(baseColor, peakColor, clamp(vHeight * 0.4, 0.0, 1.0));
    
    gl_FragColor = vec4(color, alpha);
}
`;

export class WaveParticles extends ParticleSystem {
    private mouseWorld = new THREE.Vector2(0, 0);
    private scrollY = 0;
    private lastScrollY = 0;
    private scrollSpeed = 0;
    private topicsTop = 0;
    private topicsHeight = 0;

    constructor() {
        super(0);
        this.mesh = new THREE.Points(new THREE.BufferGeometry(), new THREE.MeshBasicMaterial());
        this.init();
    }

    init() {
        // Denser grid for more visible terrain
        const gridW = 150;
        const gridH = 80;
        const spacingX = 0.12;
        const spacingZ = 0.10;
        
        const positions: number[] = [];
        const randoms: number[] = [];
        
        for (let iz = 0; iz < gridH; iz++) {
            for (let ix = 0; ix < gridW; ix++) {
                const x = (ix - gridW / 2) * spacingX;
                const z = (iz - gridH / 2) * spacingZ;
                positions.push(x, 0, z);
                randoms.push(Math.random());
            }
        }
        
        this.count = positions.length / 3;
        
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('aRandom', new THREE.Float32BufferAttribute(randoms, 1));
        
        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uScrollSpeed: { value: 0 },
                uMouse: { value: new THREE.Vector2(0, 0) },
                uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) }
            },
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });
        
        this.mesh.geometry.dispose();
        this.mesh.geometry = geometry;
        this.mesh.material = material;
        
        // Position: closer to camera, tilted toward viewer
        this.mesh.rotation.x = -0.55;
        this.mesh.position.y = -1.8;
        this.mesh.position.z = 0;
        
        this.bindEvents();
    }

    private bindEvents() {
        window.addEventListener('scroll', () => {
            this.scrollY = window.scrollY;
        }, { passive: true });
        
        window.addEventListener('mousemove', (e) => {
            const nx = (e.clientX / window.innerWidth) * 2 - 1;
            const ny = -(e.clientY / window.innerHeight) * 2 + 1;
            this.mouseWorld.set(nx * 8, ny * 5);
        }, { passive: true });

        // Cache topics position after layout
        setTimeout(() => {
            const topics = document.querySelector('.topics');
            if (topics) {
                const rect = topics.getBoundingClientRect();
                this.topicsTop = rect.top + window.scrollY;
                this.topicsHeight = rect.height;
            }
        }, 500);
    }

    update(time: number, _delta: number) {
        // Calculate scroll speed (smoothed)
        const rawSpeed = Math.abs(this.scrollY - this.lastScrollY);
        this.scrollSpeed += (Math.min(rawSpeed * 0.08, 2.0) - this.scrollSpeed) * 0.1;
        this.lastScrollY = this.scrollY;
        
        // Visibility: only show when topics section is in viewport
        const viewportH = window.innerHeight;
        const progress = (this.scrollY - this.topicsTop + viewportH) / (this.topicsHeight + viewportH);
        const visible = progress > -0.1 && progress < 1.1;
        this.mesh.visible = visible;
        
        if (visible) {
            // Parallax
            const parallax = (progress - 0.5) * 2;
            this.mesh.position.y = -1.8 + parallax * 1.2;
        }
        
        const mat = this.mesh.material as THREE.ShaderMaterial;
        if (mat.uniforms) {
            mat.uniforms.uTime.value = time;
            mat.uniforms.uScrollSpeed.value = this.scrollSpeed;
            mat.uniforms.uMouse.value.copy(this.mouseWorld);
        }
    }

    resize(_width: number, _height: number) {
        const mat = this.mesh.material as THREE.ShaderMaterial;
        if (mat.uniforms) {
            mat.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2);
        }
        setTimeout(() => {
            const topics = document.querySelector('.topics');
            if (topics) {
                const rect = topics.getBoundingClientRect();
                this.topicsTop = rect.top + window.scrollY;
                this.topicsHeight = rect.height;
            }
        }, 100);
    }
}

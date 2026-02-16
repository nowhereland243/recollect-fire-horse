import * as THREE from 'three';
import { ParticleSystem } from './ParticleSystem';

// Gentle curl-noise particles — no scroll explosion
const vertexShader = `
uniform float uTime;
uniform float uPixelRatio;

attribute vec3 aRandom; 
attribute vec3 aColor; 

varying vec3 vColor;
varying float vAlpha;

// Simplex Noise
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
float snoise(vec3 v) {
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 = v - i + dot(i, C.xxx) ;
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
  float n_ = 0.142857142857;
  vec3  ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );
  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                dot(p2,x2), dot(p3,x3) ) );
}

void main() {
    float t = uTime * 0.12; 
    
    vec3 pos = position;
    
    // Subtle vertical float only — no horizontal drift
    float noiseVal = snoise(vec3(pos.x * 0.6 + t, pos.y * 0.6 - t * 0.3, pos.z + t * 0.5));
    float drift = noiseVal * 0.05 * aRandom.y;
    
    pos.y += drift;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    gl_PointSize = (2.0 * aRandom.z + 1.0) * uPixelRatio;
    gl_PointSize *= (1.0 / -mvPosition.z);
    
    vColor = aColor;
    vAlpha = 0.85;
}
`;

const fragmentShader = `
varying vec3 vColor;
varying float vAlpha;

void main() {
    float r = distance(gl_PointCoord, vec2(0.5));
    if (r > 0.5) discard;
    float alpha = 1.0 - smoothstep(0.2, 0.5, r);
    gl_FragColor = vec4(vColor, alpha * vAlpha);
}
`;

export class HeroParticles extends ParticleSystem {
    group = new THREE.Group();

    constructor() {
        super(0);
        this.mesh = new THREE.Points(new THREE.BufferGeometry(), new THREE.MeshBasicMaterial());
        this.init();
    }

    init() {
        const img = new Image();
        img.src = '/hero_horse.png';
        img.crossOrigin = 'Anonymous';
        img.onload = () => this.processImage(img);
    }

    processImage(img: HTMLImageElement) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const width = 300;
        const scale = width / img.width;
        const height = Math.floor(img.height * scale);
        
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        
        const data = ctx.getImageData(0, 0, width, height).data;
        const positions: number[] = [];
        const colors: number[] = [];
        const randoms: number[] = [];
        
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const i = (y * width + x) * 4;
                const r = data[i] / 255;
                const g = data[i + 1] / 255;
                const b = data[i + 2] / 255;
                
                const brightness = (r + g + b) / 3; 
                
                if (brightness > 0.1) {
                    const px = (x - width / 2) * 0.035;
                    const py = -(y - height / 2) * 0.035;
                    const pz = (Math.random() - 0.5) * 0.2;
                    
                    positions.push(px, py, pz);
                    colors.push(r, g, b);
                    randoms.push(Math.random(), Math.random(), Math.random());
                }
            }
        }
        
        this.count = positions.length / 3;
        
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('aColor', new THREE.Float32BufferAttribute(colors, 3));
        geometry.setAttribute('aRandom', new THREE.Float32BufferAttribute(randoms, 3));
        
        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) }
            },
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });

        this.mesh.geometry.dispose();
        this.mesh.geometry = geometry;
        this.mesh.material = material;
    }

    update(time: number, _delta: number) {
        if ((this.mesh.material as THREE.ShaderMaterial).uniforms) {
            (this.mesh.material as THREE.ShaderMaterial).uniforms.uTime.value = time;
        }
    }

    resize(_width: number, _height: number) {
        if ((this.mesh.material as THREE.ShaderMaterial).uniforms) {
            (this.mesh.material as THREE.ShaderMaterial).uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2);
        }
    }
}

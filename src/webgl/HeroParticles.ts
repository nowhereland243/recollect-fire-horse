import * as THREE from 'three';
import { ParticleSystem } from './ParticleSystem';

const vertexShader = `
uniform float uTime;
uniform vec2 uMouse;
uniform float uPixelRatio;

attribute vec3 aRandom; // x: random offset, y: speed factor, z: size variation

varying vec3 vColor;

// Simplex Noise (simplified)
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
  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y
  i = mod289(i);
  vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
  float n_ = 0.142857142857; // 1.0/7.0
  vec3  ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)
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
    float t = uTime * 0.2 * aRandom.y;
    
    // Base position
    vec3 pos = position;
    
    // Noise field movement (Flow)
    float noise1 = snoise(vec3(pos.x * 0.5 + t, pos.y * 0.5, pos.z * 0.5));
    float noise2 = snoise(vec3(pos.x * 0.5, pos.y * 0.5 + t, pos.z * 0.5));
    float noise3 = snoise(vec3(pos.x * 0.5, pos.y * 0.5, pos.z * 0.5 + t));
    
    pos.x += noise1 * 0.5;
    pos.y += noise2 * 0.5;
    pos.z += noise3 * 0.5;
    
    // Mouse interaction (Repel)
    // Convert world pos to screen space? Or just assume z=0 roughly
    // Simple 3D distance
    // vec3 mousePos = vec3(uMouse.x * 10.0, uMouse.y * 10.0, 0.0); // Simple map
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    // Size attenuation
    gl_PointSize = (4.0 * aRandom.z + 2.0) * uPixelRatio;
    gl_PointSize *= (1.0 / -mvPosition.z);
    
    // Color mixing based on noise
    vec3 gold = vec3(0.875, 0.741, 0.412); // #DFBD69
    vec3 red = vec3(0.831, 0.22, 0.051);   // #D4380D
    
    float mixFactor = smoothstep(-0.5, 0.5, noise1);
    vColor = mix(gold, red, mixFactor * 0.5); // Mostly gold, some red hints
}
`;

const fragmentShader = `
varying vec3 vColor;

void main() {
    // Round point
    vec2 cxy = 2.0 * gl_PointCoord - 1.0;
    if (dot(cxy, cxy) > 1.0) discard;
    
    // Soft edge
    float r = dot(cxy, cxy);
    float alpha = 1.0 - r;
    
    gl_FragColor = vec4(vColor, alpha * 0.8);
}
`;

export class HeroParticles extends ParticleSystem {
    constructor() {
        super(15000); // 15k particles
        this.init();
    }

    init() {
        // Create geometry
        const positions = new Float32Array(this.count * 3);
        const randoms = new Float32Array(this.count * 3);
        
        for (let i = 0; i < this.count; i++) {
            // Sphere or Horse Shape
            // For now, a sphere/cloud
            const r = 3 + Math.random() * 2;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            
            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);
            
            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;
            
            randoms[i * 3] = Math.random();     // offset
            randoms[i * 3 + 1] = Math.random(); // speed
            randoms[i * 3 + 2] = Math.random(); // size
        }
        
        this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        this.geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 3));
        
        this.material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uMouse: { value: new THREE.Vector2() },
                uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) }
            },
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });
        
        this.mesh = new THREE.Points(this.geometry, this.material);
    }

    update(time: number, _delta: number) {
        this.material.uniforms.uTime.value = time;
    }

    resize(_width: number, _height: number) {
        this.material.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2);
    }
}

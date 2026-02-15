import * as THREE from 'three';

export abstract class ParticleSystem {
    mesh: THREE.Points | THREE.InstancedMesh;
    geometry: THREE.BufferGeometry | THREE.InstancedBufferGeometry;
    material: THREE.ShaderMaterial;
    count: number;

    constructor(count: number) {
        this.count = count;
        // Default to Points for now, can override
        this.geometry = new THREE.BufferGeometry();
        this.material = new THREE.ShaderMaterial({
            vertexShader: `
                void main() {
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    gl_PointSize = 2.0;
                }
            `,
            fragmentShader: `
                void main() {
                    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
                }
            `
        });
        this.mesh = new THREE.Points(this.geometry, this.material);
    }

    abstract init(): void;
    abstract update(time: number, delta: number): void;
    abstract resize(width: number, height: number): void;
}

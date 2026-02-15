import * as THREE from 'three';

export class SceneManager {
    canvas: HTMLCanvasElement;
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    clock: THREE.Clock;
    animFrameId: number | null = null;
    
    // Modules
    modules: any[] = [];

    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'quantum-canvas';
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.zIndex = '-1'; // Behind Content or Overlay? 
        // User visual request implies the content IS particles. 
        // We might need z-index 0 and hide DOM background.
        this.canvas.style.pointerEvents = 'none'; // DOM handles click for now, unless we raycast.
        
        document.body.prepend(this.canvas);

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance'
        });
        
        this.scene = new THREE.Scene();
        // this.scene.fog = new THREE.FogExp2(0x000000, 0.02); // Deep void

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 5;

        this.clock = new THREE.Clock();

        window.addEventListener('resize', () => this.resize());
        this.resize();
        this.loop();
    }

    add(module: any) {
        if (module.mesh) {
            this.scene.add(module.mesh);
        }
        this.modules.push(module);
    }

    resize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Notify modules
        this.modules.forEach(m => {
            if (m.resize) m.resize(width, height);
        });
    }

    loop() {
        const time = this.clock.getElapsedTime();
        const delta = this.clock.getDelta();

        // Update modules
        this.modules.forEach(m => {
            if (m.update) m.update(time, delta);
        });

        this.renderer.render(this.scene, this.camera);
        this.animFrameId = requestAnimationFrame(() => this.loop());
    }

    dispose() {
        if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
        window.removeEventListener('resize', () => this.resize());
        this.canvas.remove();
        this.renderer.dispose();
    }
}

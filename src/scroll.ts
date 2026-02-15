import Lenis from 'lenis';

export const initLenisScroll = () => {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // exponential out
        touchMultiplier: 2,
    });

    // Velocity Skew Effect
    const content = document.body; // Or a specific wrapper
    
    function raf(time: number) {
        lenis.raf(time);
        
        // Add skew based on velocity
        // 0.1 is a factor to control intensity
        const skew = lenis.velocity * 0.15;
        content.style.transform = `skewY(${skew}deg)`;
        
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // GSAP Integration (if needed later)
    // gsap.ticker.add((time) => {
    //   lenis.raf(time * 1000)
    // })
}

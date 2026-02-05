import { useEffect, useState, useRef } from 'react';

const GravityMode = () => {
    const [isActive, setIsActive] = useState(false);
    const elementsRef = useRef([]);
    const frameRef = useRef();

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key.toLowerCase() === 'g') {
                if (!isActive) {
                    setIsActive(true);
                    triggerGravity();
                } else {
                    window.location.reload(); // Hard reset to restore layout
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isActive]);

    const triggerGravity = () => {
        // 1. Select all visible "block-like" elements
        // This selector tries to grab significant chunks without grabbing every single span
        const targets = document.querySelectorAll('h1, h2, h3, p, a, button, img, .glass-card, .nav-item');

        const physicsObjects = [];
        const floorY = window.innerHeight;

        targets.forEach(el => {
            const rect = el.getBoundingClientRect();
            // Skip elements that are off screen or tiny
            if (rect.width === 0 || rect.height === 0 || rect.top > floorY) return;

            // Clone element to position absolute (or just force style)
            // We'll style the existing element to avoid react re-render wars, 
            // but for a React app, direct DOM manipulation this heavy is "chaos" anyway.

            // Snapshot computed style to keep appearance
            const computed = window.getComputedStyle(el);

            // Create a physics object
            const obj = {
                el: el,
                x: rect.left,
                y: rect.top,
                vx: (Math.random() - 0.5) * 10, // Horizontal randomness
                vy: 0,
                rotation: 0,
                vr: (Math.random() - 0.5) * 0.2, // Rotation speed
                width: rect.width,
                height: rect.height,
                mass: rect.width * rect.height * 0.001, // Heavy things fall... same speed but momentum differs? Nah simple physics.
                restitution: 0.6 // Bounciness
            };

            // Lock styles
            el.style.position = 'fixed'; // Fixed to viewport
            el.style.left = '0px';
            el.style.top = '0px';
            el.style.margin = '0';
            el.style.width = `${rect.width}px`;
            el.style.height = `${rect.height}px`;
            el.style.transform = `translate(${obj.x}px, ${obj.y}px)`;
            el.style.transition = 'none'; // No CSS transitions allowed
            el.style.zIndex = '1000';
            el.style.pointerEvents = 'none'; // Ignore clicks while falling

            physicsObjects.push(obj);
        });

        elementsRef.current = physicsObjects;
        animate();
    };

    const animate = () => {
        const gravity = 0.5;
        const friction = 0.99;
        const floorY = window.innerHeight;

        elementsRef.current.forEach(obj => {
            // Apply forces
            obj.vy += gravity;
            obj.vx *= friction;

            // Update Position
            obj.x += obj.vx;
            obj.y += obj.vy;
            obj.rotation += obj.vr;

            // Floor Collision
            if (obj.y + obj.height > floorY) {
                obj.y = floorY - obj.height;
                obj.vy *= -obj.restitution; // Bounce
                obj.vx *= 0.8; // Floor friction
                obj.vr *= 0.8; // Rotation friction

                // Stop jitter if low energy
                if (Math.abs(obj.vy) < 1) obj.vy = 0;
            }

            // Wall Collision (Left/Right)
            if (obj.x < 0) {
                obj.x = 0;
                obj.vx *= -obj.restitution;
            } else if (obj.x + obj.width > window.innerWidth) {
                obj.x = window.innerWidth - obj.width;
                obj.vx *= -obj.restitution;
            }

            // Apply to DOM
            obj.el.style.transform = `translate(${obj.x}px, ${obj.y}px) rotate(${obj.rotation}rad)`;
        });

        // Continue running if things are still moving (or just run forever until reset)
        frameRef.current = requestAnimationFrame(animate);
    };

    if (!isActive) {
        return (
            <button
                className="fixed bottom-8 right-8 z-[50] group cursor-not-allowed"
                aria-label="Do Not Press"
            >
                <div className="relative flex items-center justify-center w-12 h-12 bg-red-900/20 rounded-full border border-red-500/50 backdrop-blur-sm transition-all duration-300 group-hover:bg-red-600 group-hover:scale-110 group-hover:border-red-400">
                    {/* Pulsing Core */}
                    <div className="w-4 h-4 bg-red-500 rounded-full animate-ping absolute opacity-75"></div>
                    <div className="w-3 h-3 bg-red-600 rounded-full shadow-[0_0_10px_rgba(255,0,0,0.8)]"></div>

                    {/* Tooltip Warning */}
                    <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 w-max opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="bg-black/90 text-red-500 px-4 py-2 rounded border border-red-900/50 text-xs font-mono tracking-widest uppercase shadow-2xl">
                            ⚠️ Critical Warning: Do Not Press 'G'
                        </div>
                    </div>
                </div>
            </button>
        );
    }

    return (
        <div className="fixed top-12 left-1/2 -translate-x-1/2 z-[9999] bg-red-600/90 text-white px-6 py-2 rounded-full font-bold animate-pulse shadow-xl border border-red-400 pointer-events-none text-center">
            ⚠️ GRAVITY FAILURE ⚠️<br />
            <span className="text-[10px] uppercase tracking-widest opacity-80">System Collapse Imminent • Press 'G' to Reboot</span>
        </div>
    );
};

export default GravityMode;

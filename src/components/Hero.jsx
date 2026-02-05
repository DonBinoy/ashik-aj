import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import MagneticButton from './MagneticButton';
import Hero3DScene from './Hero3DScene';
import { ArrowDown } from 'lucide-react';
import '../styles/hero.css';

const Hero = () => {
    // ... hooks ...
    // Note: keeping the hooks as they are
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    // Parallax Mouse Effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring for parallax
    const springConfig = { damping: 50, stiffness: 400 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    // Transforming mouse input to movement
    const moveXASHIK = useTransform(springX, [-0.5, 0.5], ["-2%", "2%"]);
    const moveYASHIK = useTransform(springY, [-0.5, 0.5], ["-2%", "2%"]);

    const moveXJOSE = useTransform(springX, [-0.5, 0.5], ["2%", "-2%"]); // Inverse movement for depth
    const moveYJOSE = useTransform(springY, [-0.5, 0.5], ["2%", "-2%"]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Normalize mouse position from -0.5 to 0.5
            const { innerWidth, innerHeight } = window;
            mouseX.set((e.clientX / innerWidth) - 0.5);
            mouseY.set((e.clientY / innerHeight) - 0.5);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div ref={containerRef} className="relative h-screen bg-premium-black overflow-hidden flex flex-col items-center justify-center perspective-px">

            {/* Layer 0: Massive Background Text with Parallax */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-none select-none overflow-hidden mix-blend-color-dodge">
                <motion.h1
                    initial={{ opacity: 0, scale: 1.2, y: 100 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut", type: "spring", damping: 20 }}
                    style={{ x: moveXASHIK, y: moveYASHIK, textShadow: "0 0 100px rgba(0,102,255,0.1)" }}
                    className="text-[22vw] leading-[0.8] font-display font-black text-[#E2E8F0] tracking-tighter text-center whitespace-nowrap opacity-10"
                >
                    ASHIK
                </motion.h1>
                <motion.h1
                    initial={{ opacity: 0, scale: 1.2, y: 100 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1.5, delay: 0.2, ease: "easeOut", type: "spring", damping: 20 }}
                    style={{
                        x: moveXJOSE,
                        y: moveYJOSE,
                        textShadow: "0 0 100px rgba(0,102,255,0.1)",
                        transform: "translateY(-2vw)" // Slight overlap adjustment
                    }}
                    className="text-[22vw] leading-[0.8] font-display font-black text-[#E2E8F0] tracking-tighter text-center whitespace-nowrap opacity-10"
                >
                    JOSE
                </motion.h1>
            </div>

            {/* Layer 1: 3D Scene (Floating Elements) - Standard */}
            <div className="absolute inset-0 z-10 opacity-100 pointer-events-none canvas-container">
                <Hero3DScene />
            </div>

            {/* Layer 2: Foreground Content (Metadata & CTA) */}
            <motion.div
                style={{ y, opacity }}
                className="relative z-50 text-center flex flex-col items-center justify-between h-full py-12 w-full px-4"
            >
                {/* Top Label & Intro */}
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 1, ease: "easeOut" }}
                    className="mt-8 flex flex-col items-center gap-4"
                >
                    <div className="px-6 py-2 glass-card rounded-full border border-white/5 backdrop-blur-xl">
                        <p className="text-white/60 text-[10px] md:text-xs tracking-[0.4em] uppercase font-medium">
                            Portfolio '25
                        </p>
                    </div>
                </motion.div>

                {/* Spacer to push content to edges */}
                <div className="flex-grow" />



                {/* Image moved to Hero3DScene.jsx per user request */}

                {/* Mobile-Only Ambient Glow Orb */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 0.6, scale: 1 }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-premium-blue/30 rounded-full blur-[80px] md:hidden z-10 pointer-events-none mix-blend-screen"
                />

                {/* Roles & Intro */}
                <div className="flex flex-col items-center justify-center relative w-full mb-12">
                    {/* Massive Intro Text */}
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1, duration: 1, ease: "easeOut" }}
                        className="text-[18vw] md:text-[8vw] font-display font-black text-white leading-none tracking-tighter relative z-30 drop-shadow-2xl"
                    >
                        I'M ASHIK
                    </motion.h2>

                    {/* Roles Background Text */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 1.5 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center items-center z-20 pointer-events-none select-none"
                    >
                        <div className="flex gap-4 md:gap-12 whitespace-nowrap opacity-20 blur-[1px]">
                            {['DIRECTOR', 'EDITOR', 'DESIGNER'].map((role) => (
                                <span key={role} className="text-4xl md:text-6xl font-black text-transparent stroke-text-white tracking-widest">
                                    {role}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5, duration: 0.8, type: "spring" }}
                    className="flex flex-col items-center gap-4 relative z-30"
                >
                    <MagneticButton>
                        <a href="#work" className="w-16 h-16 rounded-full glass-card flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 hover:scale-110 transition-all duration-300 border border-white/10 shadow-[0_0_30px_rgba(0,102,255,0.15)] backdrop-blur-md">
                            <ArrowDown size={24} strokeWidth={1} />
                        </a>
                    </MagneticButton>
                    <p className="text-white/60 text-[10px] uppercase tracking-[0.2em] animate-bounce font-medium">
                        Scroll to Explore
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Hero;

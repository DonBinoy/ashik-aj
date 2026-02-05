import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    // Mouse position state
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Smooth spring for the trailing ring
    const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            const { clientX, clientY } = e;

            // Direct update for the Main Dot (Instant)
            mouseX.set(clientX);
            mouseY.set(clientY);

            // Note: The spring values update automatically based on mouseX/Y changes
        };

        // Event Delegation for hover detection (Performance Optimization)
        const checkHover = (e) => {
            const target = e.target;
            // Check if the target or its parents are hoverable
            const isHoverable = target.closest('a') !== null ||
                target.closest('button') !== null ||
                target.closest('.cursor-pointer') !== null ||
                window.getComputedStyle(target).cursor === 'pointer';

            setIsHovered(isHoverable);
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', checkHover);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', checkHover);
        };
    }, [mouseX, mouseY]);

    return (
        <div className="hidden md:block pointer-events-none fixed inset-0 z-[9999]">
            {/* Trailing Ring - Smooth Physics */}
            <motion.div
                className="absolute w-8 h-8 border border-premium-yellow rounded-full mix-blend-difference"
                style={{
                    x: springX,
                    y: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                    scale: isHovered ? 1.5 : 1,
                    opacity: isHovered ? 0.8 : 0.5,
                }}
                transition={{ duration: 0.2 }} // transition for scale/opacity
            />

            {/* Main Dot - Instant Follow */}
            <motion.div
                className="absolute w-1.5 h-1.5 bg-white rounded-full mix-blend-difference"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            />
        </div>
    );
};

export default CustomCursor;

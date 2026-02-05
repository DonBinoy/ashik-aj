import { motion, useTime, useTransform } from 'framer-motion';

const FloatingShape = ({ delay, x, y, size, color }) => {
    const time = useTime();
    const rotate = useTransform(time, [0, 10000], [0, 360], { clamp: false });
    const rotateOpposite = useTransform(time, [0, 10000], [0, -360], { clamp: false });

    return (
        <motion.div
            style={{
                x, y,
                rotateX: rotate,
                rotateY: rotateOpposite,
                perspective: 1000
            }}
            className={`absolute ${size} flex items-center justify-center preserve-3d opacity-60`}
        >
            {/* Creating a CSS Cube-ish vibe or just a complex shape */}
            <div className={`absolute inset-0 border border-${color}/30 bg-${color}/5 backdrop-blur-sm`} style={{ transform: "translateZ(20px)" }} />
            <div className={`absolute inset-0 border border-${color}/30 bg-${color}/5 backdrop-blur-sm`} style={{ transform: "translateZ(-20px)" }} />
            <div className={`absolute inset-0 border border-${color}/30 bg-${color}/5 backdrop-blur-sm`} style={{ transform: "rotateY(90deg) translateZ(20px)" }} />
        </motion.div>
    );
}

const GeometricBackground = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none bg-premium-black perspective-px">
            {/* Ambient Gradient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-premium-accent/10 blur-[100px] rounded-full" />

            <FloatingShape x="20vw" y="20vh" size="w-32 h-32" color="premium-accent" />
            <FloatingShape x="80vw" y="60vh" size="w-48 h-48" color="premium-accent" />
            <FloatingShape x="50vw" y="80vh" size="w-24 h-24" color="white" />
        </div>
    );
};

export default GeometricBackground;

import { motion } from 'framer-motion';

const AuroraBackground = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                    opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{ willChange: 'transform' }}
                className="absolute -top-[20%] -left-[10%] w-[150vw] md:w-[70vw] h-[150vw] md:h-[70vw] bg-premium-yellow/10 md:bg-premium-yellow/5 rounded-full blur-[100px] md:blur-[120px]"
            />
            <motion.div
                animate={{
                    scale: [1, 1.5, 1],
                    x: [0, 100, 0],
                    opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 2 }}
                style={{ willChange: 'transform' }}
                className="absolute top-[40%] right-[0%] w-[120vw] md:w-[50vw] h-[120vw] md:h-[50vw] bg-blue-500/10 md:bg-blue-500/5 rounded-full blur-[120px] md:blur-[150px]"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    y: [0, -100, 0],
                    opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear", delay: 5 }}
                style={{ willChange: 'transform' }}
                className="absolute -bottom-[20%] left-[20%] w-[140vw] md:w-[60vw] h-[140vw] md:h-[60vw] bg-purple-500/10 md:bg-purple-500/5 rounded-full blur-[100px] md:blur-[130px]"
            />
        </div>
    );
};

export default AuroraBackground;

import { motion } from 'framer-motion';

const FluidBackground = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none bg-premium-black">
            {/* Removed obscuring overlay */}

            {/* Moving Orbs - Increased opacity and removed mix-blend for visibility */}
            <div className="absolute inset-0 z-0 blur-[80px]">
                <motion.div
                    animate={{
                        x: ["-20%", "20%", "-20%"],
                        y: ["-20%", "20%", "-20%"],
                        scale: [1, 1.4, 1],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-0 left-0 w-[70vw] h-[70vw] bg-purple-600 rounded-full opacity-40"
                />
                <motion.div
                    animate={{
                        x: ["20%", "-20%", "20%"],
                        y: ["20%", "-20%", "20%"],
                        scale: [1, 1.3, 1],
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-0 right-0 w-[80vw] h-[80vw] bg-blue-600 rounded-full opacity-40"
                />
                <motion.div
                    animate={{
                        x: ["-10%", "10%", "-10%"],
                        y: ["10%", "-10%", "10%"],
                        scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-premium-yellow rounded-full opacity-30"
                />
            </div>

            {/* Grain Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-20 mix-blend-overlay" />
        </div>
    );
};

export default FluidBackground;

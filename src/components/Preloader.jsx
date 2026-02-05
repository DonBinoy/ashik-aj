import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ setLoading }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => setLoading(false), 800);
                    return 100;
                }
                return prev + 1;
            });
        }, 20);

        return () => clearInterval(timer);
    }, [setLoading]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-premium-black flex items-center justify-center overflow-hidden"
            exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
            <div className="relative w-full text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-8"
                >
                    <h1 className="text-[10vw] font-display font-black text-transparent bg-clip-text bg-white tracking-tighter opacity-10">
                        ASHIK JOSE
                    </h1>
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ clipPath: "bg-white inset(100% 0 0 0)" }}
                        animate={{ clipPath: `inset(${100 - progress}% 0 0 0)` }}
                    >
                        <h1 className="text-[10vw] font-display font-black text-white tracking-tighter">
                            ASHIK JOSE
                        </h1>
                    </motion.div>
                </motion.div>

                <div className="flex justify-between items-end px-12 absolute bottom-[-30vh] w-full text-gray-400 font-display text-xs tracking-widest uppercase">
                    <span>Loading Assets</span>
                    <span className="text-4xl font-bold text-premium-yellow">{progress}%</span>
                </div>
            </div>
        </motion.div>
    );
};

export default Preloader;

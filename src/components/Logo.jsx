import { motion } from 'framer-motion';

const Logo = ({ className = "" }) => {
    return (
        <motion.div
            className={`relative flex items-center justify-center ${className}`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
            <svg
                width="48"
                height="48"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="overflow-visible"
            >
                <defs>
                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="50%" stopColor="#E2E8F0" />
                        <stop offset="100%" stopColor="#94A3B8" />
                    </linearGradient>
                    <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0066FF" />
                        <stop offset="100%" stopColor="#00BFFF" />
                    </linearGradient>
                    <filter id="glow-soft" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* Container/Backing (Optional for structure, kept invisible or subtle) */}

                {/* The 'A' - Sharp Architectural Peak */}
                <motion.path
                    d="M 20 85 L 50 15 L 80 85"
                    stroke="url(#logoGradient)"
                    strokeWidth="6"
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                />

                {/* Crossbar of A - Stylized as a floating element */}
                <motion.path
                    d="M 38 60 L 62 60"
                    stroke="url(#logoGradient)"
                    strokeWidth="6"
                    strokeLinecap="square"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "circOut" }}
                />

                {/* The 'J' - Interwoven Tech Line */}
                {/* Starts from top right, cuts through A, hooks at bottom */}
                <motion.path
                    d="M 68 25 V 70 C 68 82 60 88 48 88 C 40 88 35 84 32 80"
                    stroke="url(#blueGradient)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.4, delay: 0.4, ease: "easeInOut" }}
                    style={{ mixBlendMode: 'lighten' }}
                />

                {/* Accent Dot/Period */}
                <motion.circle
                    cx="88"
                    cy="85"
                    r="3"
                    fill="#0066FF"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.5, type: "spring" }}
                />
            </svg>
        </motion.div>
    );
};

export default Logo;

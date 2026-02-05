import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import MagneticButton from './MagneticButton';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Work', href: '#work' },
        { name: 'About', href: '#about' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <>
            {/* Floating Island Container */}
            <nav
                className={`fixed z-50 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]
                    ${isScrolled
                        ? 'top-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-auto rounded-full py-3 px-6 glass-card border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)]'
                        : 'top-0 left-0 right-0 w-full py-6 bg-transparent'
                    }`}
            >
                <div className={`flex items-center justify-between ${isScrolled ? 'w-full md:gap-12' : 'container mx-auto px-6'}`}>

                    {/* Brand Logo */}
                    <a href="#" className="flex items-center gap-3 group relative z-50">
                        <div className="scale-75 origin-left">
                            <Logo />
                        </div>
                        <div className="overflow-hidden h-6 relative">
                            <span className="block text-lg font-display font-bold tracking-tighter text-white transition-transform duration-500 group-hover:-translate-y-full">
                                ASHIK
                            </span>
                            <span className="block text-lg font-display font-bold tracking-tighter text-premium-yellow transition-transform duration-500 group-hover:-translate-y-full absolute top-full left-0">
                                JOSE
                            </span>
                        </div>
                    </a>

                    {/* Desktop Menu - Magnetic & Premium */}
                    <div className="hidden md:flex items-center gap-2">
                        {navLinks.map((link) => (
                            <MagneticButton key={link.name}>
                                <a
                                    href={link.href}
                                    className="relative px-4 py-2 text-sm uppercase tracking-widest text-white/70 hover:text-white transition-colors duration-300 block"
                                >
                                    {link.name}
                                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-premium-yellow rounded-full scale-0 transition-transform duration-300 hover:scale-100" />
                                </a>
                            </MagneticButton>
                        ))}

                        <div className="w-[1px] h-6 bg-white/10 mx-2" />

                        <MagneticButton>
                            <a
                                href="#contact"
                                className="px-5 py-2 rounded-full border border-white/20 text-white/90 hover:bg-white hover:text-black transition-all duration-300 uppercase text-[10px] tracking-[0.2em] font-bold"
                            >
                                Let's Talk
                            </a>
                        </MagneticButton>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center rounded-full active:scale-90 transition-transform"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay - Full Screen Premium */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
                        animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
                        exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
                        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed inset-0 z-40 bg-[#050505] flex flex-col items-center justify-center md:hidden"
                    >
                        {/* Noise Texture for mobile menu */}
                        <div className="absolute inset-0 opacity-20 pointer-events-none"
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
                        />

                        <div className="flex flex-col space-y-8 text-center relative z-10">
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                                    className="text-5xl font-display font-black text-transparent stroke-text-white hover:text-white transition-colors duration-300 tracking-tighter"
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;

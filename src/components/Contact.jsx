import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import MagneticButton from './MagneticButton';
import Logo from './Logo';

const Contact = () => {
    return (
        <section id="contact" className="min-h-screen bg-premium-black relative flex flex-col justify-between pt-32 pb-12 overflow-hidden">

            <div className="container mx-auto px-6 relative z-10 flex-grow flex flex-col justify-center">
                <div className="mb-8 mt-20 md:mt-0">
                    <span className="text-premium-yellow text-xs tracking-[0.3em] uppercase font-bold pl-1">What's Next?</span>
                </div>

                <div className="relative group cursor-pointer inline-block">
                    <h2 className="text-[14vw] leading-[0.8] font-display font-black text-white tracking-tighter mix-blend-difference transition-all duration-700 group-hover:opacity-10">
                        LET'S TALK
                    </h2>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <MagneticButton>
                            <a href="mailto:contact@ashikjose.com" className="w-48 h-48 rounded-full bg-premium-yellow flex flex-col items-center justify-center text-black font-bold uppercase tracking-widest text-sm hover:scale-110 transition-transform duration-500">
                                <span>Email Me</span>
                                <ArrowUpRight size={20} className="mt-2" />
                            </a>
                        </MagneticButton>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mt-24 border-t border-white/10 pt-12">
                    <div className="flex flex-col justify-between">
                        <div className="mb-4">
                            <Logo className="w-16 h-16 origin-left scale-150" />
                        </div>
                        <p className="text-gray-500 text-xs font-mono uppercase mt-4">
                            © 2025 Ashik Jose<br />
                            All Rights Reserved.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Socials</h4>
                        <ul className="space-y-2 text-gray-500 text-sm font-mono uppercase">
                            {[
                                { name: 'Instagram', url: 'https://www.instagram.com/a_j_ashik/' },
                                { name: 'Twitter', url: '#' },
                                { name: 'LinkedIn', url: '#' },
                                { name: 'Vimeo', url: '#' }
                            ].map(social => (
                                <li key={social.name}><a href={social.url} target="_blank" rel="noopener noreferrer" className="hover:text-premium-yellow transition-colors">{social.name}</a></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Contact</h4>
                        <ul className="space-y-2 text-gray-500 text-sm font-mono uppercase">
                            <li><a href="mailto:hello@ashikjose.com" className="hover:text-premium-yellow transition-colors">hello@ashikjose.com</a></li>
                            <li>+91 987 654 3210</li>
                        </ul>
                    </div>
                    <div className="flex flex-col justify-between">
                        <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Location</h4>
                        <p className="text-gray-500 text-sm font-mono uppercase">
                            Kerala, India <br />
                            Available Worldwide
                        </p>
                    </div>
                </div>
            </div>

            {/* Giant Name at bottom */}
            <div className="w-full overflow-hidden mt-12 opacity-80 flex">
                <motion.div
                    className="flex whitespace-nowrap"
                    initial={{ x: 0 }}
                    animate={{ x: "-50%" }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                    <h1 className="text-[20vw] font-display font-black text-white/10 leading-none tracking-tighter shrink-0 pr-12">
                        ASHIK JOSE — DIRECTOR — EDITOR — DESIGNER —
                    </h1>
                    <h1 className="text-[20vw] font-display font-black text-white/10 leading-none tracking-tighter shrink-0 pr-12">
                        ASHIK JOSE — DIRECTOR — EDITOR — DESIGNER —
                    </h1>
                </motion.div>
            </div>

        </section>
    );
};

export default Contact;

import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" className="py-20 md:py-32 bg-premium-black relative z-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
                    {/* Left Column: Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative w-full aspect-[3/4] md:aspect-[4/5] rounded-lg overflow-hidden group"
                    >
                        <img
                            src="/ashik.jpg"
                            alt="Ashik Jose Portrait"
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-premium-yellow/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    </motion.div>

                    {/* Right Column: Content */}
                    <div>
                        <div className="mb-8">
                            <span className="block w-12 h-[1px] bg-premium-yellow mb-6" />
                            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400">The Artist</h2>
                        </div>

                        <p className="text-3xl md:text-5xl font-display font-light text-white leading-[1.2] mb-12">
                            I craft <span className="text-premium-yellow italic font-serif">visual narratives</span> that bridge the gap between imagination and reality. As a director and editor, my obsession is with the <span className="underline decoration-premium-yellow/50 decoration-1 underline-offset-8">rhythm of the cut</span> and the soul of the frame.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-white/10 pt-12">
                            <div>
                                <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-widest">Expertise</h3>
                                <ul className="space-y-4 text-gray-400 font-light text-sm tracking-wide">
                                    <li className="flex items-center gap-3">
                                        <span className="w-1.5 h-1.5 bg-premium-yellow rounded-full" /> Narrative Direction
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="w-1.5 h-1.5 bg-premium-yellow rounded-full" /> High-End Color Grading
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="w-1.5 h-1.5 bg-premium-yellow rounded-full" /> Motion Graphics & VFX
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="w-1.5 h-1.5 bg-premium-yellow rounded-full" /> Sound Design
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-widest">Connect</h3>
                                <div className="space-y-4 text-gray-400 font-light text-sm tracking-wide">
                                    <p>Based in India, Available Worldwide</p>
                                    <a href="mailto:contact@ashikjose.com" className="block text-white hover:text-premium-yellow transition-colors cursor-pointer">contact@ashikjose.com</a>
                                    <div className="flex gap-4 pt-2">
                                        <a href="#" className="uppercase text-xs font-bold tracking-widest border-b border-transparent hover:border-premium-yellow transition-all">Ig</a>
                                        <a href="#" className="uppercase text-xs font-bold tracking-widest border-b border-transparent hover:border-premium-yellow transition-all">Tw</a>
                                        <a href="#" className="uppercase text-xs font-bold tracking-widest border-b border-transparent hover:border-premium-yellow transition-all">In</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About;

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
    {
        id: 1,
        title: "Neon Nights",
        category: "Music Video",
        video: "https://cdn.pixabay.com/video/2016/11/28/6567-193437253_large.mp4",
        image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=1000&auto=format&fit=crop",
        year: "2024"
    },
    {
        id: 2,
        title: "Urban Decay",
        category: "Documentary",
        video: "https://cdn.pixabay.com/video/2021/04/14/71068-537166166_large.mp4",
        image: "https://images.unsplash.com/photo-1550100136-e074fa714874?q=80&w=1000&auto=format&fit=crop",
        year: "2023"
    },
    {
        id: 3,
        title: "Golden Hour",
        category: "Fashion Edit",
        video: "https://cdn.pixabay.com/video/2020/09/20/49964-460676450_large.mp4",
        image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop",
        year: "2023"
    },
    {
        id: 4,
        title: "Cyber Pulse",
        category: "VFX Showcase",
        video: "https://cdn.pixabay.com/video/2023/10/22/186175-877190479_large.mp4",
        image: "https://images.unsplash.com/photo-1535868463750-c78d9543614f?q=80&w=1000&auto=format&fit=crop",
        year: "2024"
    },
    {
        id: 5,
        title: "Void Walker",
        category: "Short Film",
        video: "https://cdn.pixabay.com/video/2024/02/09/199958-911694865_large.mp4",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop",
        year: "2022"
    }
];

const Portfolio = () => {
    const [hoveredProject, setHoveredProject] = useState(null);
    const cursorRef = useRef(null);

    const handleMouseMove = (e) => {
        if (cursorRef.current) {
            const { clientX, clientY } = e;
            // Move the floating preview image
            cursorRef.current.style.transform = `translate(${clientX}px, ${clientY}px) translate(-50%, -50%) rotate(${(clientX - window.innerWidth / 2) * 0.01}deg)`;
        }
    }

    return (
        <section
            onMouseMove={handleMouseMove}
            id="work"
            className="py-32 bg-premium-black relative z-20 overflow-hidden"
        >
            {/* Floating Preview Image */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-[400px] h-[250px] pointer-events-none z-50 rounded-lg overflow-hidden hidden md:block mix-blend-normal contrast-125 brightness-110 shadow-2xl transition-opacity duration-300"
                style={{ opacity: hoveredProject ? 1 : 0 }}
            >
                <AnimatePresence mode='wait'>
                    {hoveredProject && (
                        <motion.div
                            key={hoveredProject.id}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="w-full h-full"
                        >
                            {/* We use video for ultra premium feel */}
                            <video
                                src={hoveredProject.video}
                                autoPlay loop muted playsInline
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="container mx-auto px-6 md:px-16">
                <div className="mb-24 border-b border-white/10 pb-8 flex items-end justify-between">
                    <div>
                        <span className="text-premium-yellow font-bold uppercase tracking-[0.2em] text-xs mb-2 block">Selected Portfolio</span>
                        <h2 className="text-5xl md:text-8xl font-display font-light text-white tracking-tighter">
                            WORKS
                        </h2>
                    </div>
                    <div className="hidden md:block text-right">
                        <p className="text-sm text-gray-400 font-mono">SCROLL TO EXPLORE</p>
                    </div>
                </div>

                <div className="flex flex-col">
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            onMouseEnter={() => setHoveredProject(project)}
                            onMouseLeave={() => setHoveredProject(null)}
                            className="group border-b border-white/10 py-12 flex flex-col md:flex-row md:items-center justify-between cursor-pointer transition-all duration-300 hover:px-8 hover:border-premium-yellow/30"
                        >
                            <div className="flex items-center gap-12">
                                <span className="hidden md:block text-gray-400 font-display text-xl">0{project.id}</span>
                                <h3 className="text-4xl md:text-7xl font-display font-bold text-gray-200 group-hover:text-white transition-colors duration-300 uppercase tracking-tighter relative overflow-hidden">
                                    {project.title}
                                    <span className="absolute left-0 top-full text-premium-yellow transition-transform duration-300 group-hover:-translate-y-full block">
                                        {project.title}
                                    </span>
                                </h3>
                            </div>

                            <div className="mt-4 md:mt-0 flex items-center gap-8 opacity-0 md:opacity-100 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="text-xs uppercase tracking-[0.2em] text-premium-yellow">{project.category}</span>
                                <span className="text-sm font-mono text-gray-500">{project.year}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-24 text-center">
                    <a href="#" className="inline-block px-12 py-4 border border-white/20 rounded-full uppercase tracking-widest text-xs font-bold hover:bg-white hover:text-black transition-all duration-300">
                        View All Projects
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Portfolio;

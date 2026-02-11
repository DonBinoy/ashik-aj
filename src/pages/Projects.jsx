import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Projects = () => {
    const [mainFilter, setMainFilter] = useState('Video'); // 'Video' or 'Design'
    const [subFilter, setSubFilter] = useState('All');

    // Dummy Data
    const allProjects = [
        // Video Projects
        { id: 1, title: "Neon Nights", type: "Video", category: "Directed", year: "2024", image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=1000&auto=format&fit=crop" },
        { id: 2, title: "Urban Decay", type: "Video", category: "Ad", year: "2023", image: "https://images.unsplash.com/photo-1550100136-e074fa714874?q=80&w=1000&auto=format&fit=crop" },
        { id: 3, title: "Golden Hour", type: "Video", category: "Edited", year: "2023", image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop" },
        { id: 4, title: "Cyber Pulse", type: "Video", category: "VFX", year: "2024", image: "https://images.unsplash.com/photo-1535868463750-c78d9543614f?q=80&w=1000&auto=format&fit=crop" },
        { id: 5, title: "Void Walker", type: "Video", category: "Ad", year: "2022", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop" },

        // Design Projects
        { id: 6, title: "Minimalist Brand", type: "Design", category: "Branding", year: "2023", image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1000&auto=format&fit=crop" },
        { id: 7, title: "Eco Poster", type: "Design", category: "Poster", year: "2024", image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?q=80&w=1000&auto=format&fit=crop" },
        { id: 8, title: "Tech Logo", type: "Design", category: "Logo", year: "2023", image: "https://images.unsplash.com/photo-1626785774573-4b799314346d?q=80&w=1000&auto=format&fit=crop" },
        { id: 9, title: "Fashion Ad", type: "Design", category: "Ad", year: "2024", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop" },
        { id: 10, title: "Retro Poster", type: "Design", category: "Poster", year: "2022", image: "https://images.unsplash.com/photo-1588616335122-d5cb368b6883?q=80&w=1000&auto=format&fit=crop" },
    ];

    const subFilters = useMemo(() => {
        if (mainFilter === 'Video') return ['All', 'Ad', 'Directed', 'Edited', 'VFX'];
        if (mainFilter === 'Design') return ['All', 'Ad', 'Poster', 'Logo', 'Branding'];
        return ['All'];
    }, [mainFilter]);

    // Reset sub-filter when main filter changes
    const handleMainFilterChange = (filter) => {
        setMainFilter(filter);
        setSubFilter('All');
    };

    const filteredProjects = useMemo(() => {
        return allProjects.filter(project => {
            const matchesType = project.type === mainFilter;
            const matchesSub = subFilter === 'All' || project.category === subFilter;
            return matchesType && matchesSub;
        });
    }, [mainFilter, subFilter]);

    return (
        <section className="min-h-screen bg-premium-black pt-32 pb-20 px-6">
            <div className="container mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-8">
                    <div>
                        <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-6 group">
                            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Back to Home
                        </Link>
                        <h1 className="text-5xl md:text-8xl font-display font-light text-white tracking-tighter">
                            ALL PROJECTS
                        </h1>
                    </div>

                    {/* Main Filter (Video / Design) */}
                    <div className="flex bg-white/5 p-1 rounded-full backdrop-blur-sm border border-white/10">
                        {['Video', 'Design'].map(filter => (
                            <button
                                key={filter}
                                onClick={() => handleMainFilterChange(filter)}
                                className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 ${mainFilter === filter
                                        ? 'bg-premium-yellow text-white shadow-lg'
                                        : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Sub Filters */}
                <div className="flex flex-wrap gap-4 mb-16">
                    {subFilters.map(filter => (
                        <button
                            key={filter}
                            onClick={() => setSubFilter(filter)}
                            className={`px-6 py-2 rounded-full text-xs font-mono uppercase tracking-wider border transition-all duration-300 ${subFilter === filter
                                    ? 'border-premium-yellow text-premium-yellow bg-premium-yellow/10'
                                    : 'border-white/10 text-gray-400 hover:border-white/30 hover:text-white'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map(project => (
                            <motion.div
                                layout
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer"
                            >
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center">
                                    <span className="text-premium-yellow text-xs font-bold uppercase tracking-widest mb-2">
                                        {project.category}
                                    </span>
                                    <h3 className="text-3xl font-display font-bold text-white mb-4">
                                        {project.title}
                                    </h3>
                                    <span className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                                        {mainFilter === 'Video' ? <Play className="w-5 h-5 text-white fill-white" /> : <ImageIcon className="w-5 h-5 text-white" />}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredProjects.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        <p>No projects found in this category.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Projects;

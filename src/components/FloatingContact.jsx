import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Facebook, Linkedin, X, MessageSquare, Phone } from 'lucide-react';

const WhatsAppIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

const FloatingContact = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    const contactOptions = [
        {
            name: 'WhatsApp',
            icon: <WhatsAppIcon className="w-6 h-6" />,
            link: 'https://wa.me/919947887960',
            bg: 'bg-[#25D366]',
            glow: 'shadow-[0_0_20px_rgba(37,211,102,0.6)]',
            delay: 0.05
        },
        {
            name: 'Facebook',
            icon: <Facebook className="w-6 h-6" />,
            link: 'https://www.facebook.com/ashik.josemundananickal',
            bg: 'bg-[#1877F2]',
            glow: 'shadow-[0_0_20px_rgba(24,119,242,0.6)]',
            delay: 0.1
        },
        {
            name: 'Email',
            icon: <Mail className="w-6 h-6" />,
            link: 'mailto:ashikjose324@gmail.com',
            bg: 'bg-premium-yellow',
            glow: 'shadow-[0_0_20px_rgba(0,102,255,0.6)]',
            delay: 0.15
        },
        {
            name: 'LinkedIn',
            icon: <Linkedin className="w-6 h-6" />,
            link: 'https://www.linkedin.com/in/ashik-jose-54867b250',
            bg: 'bg-[#0077B5]',
            glow: 'shadow-[0_0_20px_rgba(0,119,181,0.6)]',
            delay: 0.2
        }
    ];

    return (
        <div className="fixed bottom-10 right-10 z-[100] flex flex-col items-end gap-6">
            <AnimatePresence>
                {isOpen && (
                    <div className="flex flex-col items-end gap-4 mb-2">
                        {contactOptions.map((option, index) => (
                            <motion.a
                                key={option.name}
                                href={option.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 50, scale: 0.5, rotate: -20 }}
                                animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                                exit={{ opacity: 0, y: 50, scale: 0.5, rotate: -20 }}
                                transition={{ type: "spring", stiffness: 400, damping: 20, delay: index * 0.05 }}
                                className={`group flex items-center gap-3 p-4 rounded-full text-white ${option.bg} ${option.glow} backdrop-blur-md border border-white/20`}
                                whileHover={{ scale: 1.15, rotate: 5 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {/* Tooltip removed as per request for cleaner look */}
                                {option.icon}
                            </motion.a>
                        ))}
                    </div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={toggleOpen}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-16 h-16 rounded-full flex items-center justify-center relative z-[101] group"
            >
                {/* Premium Glass Orb Effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-premium-yellow to-premium-accent opacity-90 blur-sm group-hover:opacity-100 group-hover:blur-md transition-all duration-300 shadow-[0_0_30px_rgba(0,102,255,0.5)]"></div>
                <div className="absolute inset-0 rounded-full bg-premium-yellow/20 backdrop-blur-md border border-white/30"></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent"></div>

                {/* Icon */}
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="relative z-10 text-white"
                        >
                            <X className="w-8 h-8 drop-shadow-md" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="message"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="relative z-10 text-white"
                        >
                            <MessageSquare className="w-8 h-8 drop-shadow-md" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
};

export default FloatingContact;

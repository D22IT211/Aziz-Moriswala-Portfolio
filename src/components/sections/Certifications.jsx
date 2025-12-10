import React from 'react';
import { motion } from 'framer-motion';
import { certifications } from '../../data/portfolioData';
import { FaAward, FaExternalLinkAlt } from 'react-icons/fa';
import GridWaves from '../backgrounds/GridWaves';
import { Carousel } from '../ui/carousel';

const Certifications = () => {
    return (
        <section id="certifications" className="py-20 relative overflow-hidden bg-slate-100 dark:bg-slate-950 transition-colors duration-300">
            <GridWaves />
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="section-title">Certifications</h2>
                    <p className="text-lg max-w-2xl mx-auto mt-4" style={{ color: 'var(--text-secondary)' }}>
                        Professional credentials and technical achievements.
                    </p>
                </motion.div>

                <div className="relative">
                    <Carousel
                        options={{ align: 'start', loop: true }}
                        slides={certifications.map((cert) => (
                            <div key={cert.id} className="h-full pr-4">
                                <a
                                    href={cert.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative block h-full bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10"
                                >
                                    {/* Image Area */}
                                    <div className="relative h-48 overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <img
                                            src={cert.image}
                                            alt={cert.title}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-4 group-hover:translate-x-0">
                                            <div className="w-10 h-10 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                                                <FaExternalLinkAlt className="text-blue-500 w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Area */}
                                    <div className="p-6">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                                                <FaAward className="w-5 h-5" />
                                            </div>
                                            <span className="text-sm font-mono text-slate-500 dark:text-slate-400">
                                                {cert.date}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 group-hover:text-blue-500 transition-colors">
                                            {cert.name}
                                        </h3>

                                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                                            {cert.issuer}
                                        </p>

                                        {/* Skills/Tags */}
                                        <div className="flex flex-wrap gap-2">
                                            {cert.skills && cert.skills.map((skill, index) => (
                                                <span
                                                    key={index}
                                                    className="px-2 py-1 text-xs font-medium rounded-md bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600/50"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </a>
                            </div>
                        ))}
                    />
                </div>
            </div>
        </section>
    );
};

export default Certifications;

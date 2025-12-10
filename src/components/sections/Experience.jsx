import React from 'react';
import { motion } from 'framer-motion';
import { experience } from '../../data/portfolioData';
import { FaBriefcase, FaCalendarAlt, FaLaptopCode } from 'react-icons/fa';
import OrbitalPaths from '../backgrounds/OrbitalPaths';

const Experience = () => {
    return (
        <section id="experience" className="py-24 relative overflow-hidden bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
            <OrbitalPaths />

            {/* Creative Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-24 text-center relative"
                >
                    <h2 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 tracking-tight mb-4">
                        Experience
                    </h2>
                    <div className="h-1 w-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-sm"></div>
                    <p className="text-slate-600 dark:text-slate-400 mt-6 max-w-2xl mx-auto text-lg font-light tracking-wide">
                        Crafting digital experiences & engineering robust solutions.
                    </p>
                </motion.div>

                <div className="relative max-w-6xl mx-auto">
                    {/* Glowing Energy Beam Timeline */}
                    <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-blue-500 to-transparent opacity-50 shadow-[0_0_20px_rgba(59,130,246,0.6)]"></div>

                    <div className="space-y-20 md:space-y-32">
                        {experience.map((exp, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, delay: index * 0.1, type: "spring", bounce: 0.4 }}
                                className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                                    } items-center justify-between gap-10 md:gap-0`}
                            >
                                {/* Central Node */}
                                <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 w-12 h-12 flex items-center justify-center z-20">
                                    <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-ping absolute opacity-75"></div>
                                    <div className="w-8 h-8 bg-white dark:bg-slate-900 rounded-full border-2 border-blue-400 flex items-center justify-center relative z-10 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                    </div>
                                </div>

                                {/* Holographic Card */}
                                <div className="w-full md:w-[45%] pl-16 md:pl-0 group perspective-1000">
                                    <div className="relative transform transition-all duration-500 group-hover:scale-[1.02] group-hover:-translate-y-2 group-hover:rotate-y-2">

                                        {/* Animated Border Gradient */}
                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-70 blur group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-tilt"></div>

                                        <div className="relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl p-8 border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden">

                                            {/* Glass Reflection Effect */}
                                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>

                                            {/* Content */}
                                            <div className="relative z-10">
                                                <div className="flex flex-col gap-1 mb-6">
                                                    <span className="text-sm font-bold tracking-wider text-blue-400 uppercase flex items-center gap-2">
                                                        <FaCalendarAlt /> {exp.duration}
                                                    </span>
                                                    <h3 className="text-3xl font-bold text-slate-800 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                                                        {exp.role}
                                                    </h3>
                                                    <div className="text-lg font-medium text-slate-600 dark:text-slate-300 flex items-center gap-2">
                                                        <FaBriefcase className="text-purple-400" />
                                                        {exp.company}
                                                    </div>
                                                </div>

                                                <div className="space-y-4">
                                                    {exp.description.map((desc, i) => (
                                                        <div key={i} className="flex items-start gap-4 group/item">
                                                            <div className="mt-1.5 w-2 h-2 rounded-full bg-purple-500 group-hover/item:bg-blue-400 group-hover/item:shadow-[0_0_10px_rgba(59,130,246,0.8)] transition-all duration-300"></div>
                                                            <p className="text-slate-600 dark:text-slate-400 group-hover/item:text-slate-900 dark:group-hover/item:text-slate-200 transition-colors duration-300 text-sm md:text-base leading-relaxed">
                                                                {desc}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Tech Decoration */}
                                                <div className="absolute bottom-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                                                    <FaLaptopCode className="text-6xl text-slate-200 dark:text-white" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Empty space for the other side of the timeline */}
                                <div className="hidden md:block w-[45%]"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;

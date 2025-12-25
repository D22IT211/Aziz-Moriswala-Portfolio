import React from 'react';

// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { personalInfo } from '../../data/portfolioData';
import { FaUser, FaCode, FaLaptopCode, FaRocket } from 'react-icons/fa';
import CyberGrid from '../backgrounds/CyberGrid';

import { useState, useEffect } from 'react';

const SkillBadge = ({ skills, delay = 0 }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const interval = setInterval(() => {
                setIndex((prev) => (prev + 1) % skills.length);
            }, 3000);
            return () => clearInterval(interval);
        }, delay);
        return () => clearTimeout(timeout);
    }, [skills.length, delay]);

    return (
        <div className="h-4 overflow-hidden relative w-24">
            <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex items-center"
            >
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200 whitespace-nowrap">
                    {skills[index]}
                </span>
            </motion.div>
        </div>
    );
};

const About = () => {
    return (
        <section id="about" className="py-20 relative overflow-hidden bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
            <CyberGrid />
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Left Side - Visual Profile */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-5/12 w-full"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-[2rem] transform rotate-6 opacity-20 blur-lg"></div>
                            <div className="glass-card p-2 rounded-[2rem] relative overflow-hidden border-2 border-white/20 max-w-full">
                                <div className="bg-slate-200 dark:bg-slate-800 rounded-[1.8rem] aspect-[4/5] flex items-center justify-center relative overflow-hidden group">
                                    <img
                                        src="/assets/images/programmer-3d.png"
                                        alt="3D Programmer Character"
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    />

                                    {/* Floating Badges */}
                                    <motion.div
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                        className="absolute top-8 right-8 glass px-4 py-2 rounded-xl hidden sm:flex items-center gap-2 scale-75 md:scale-100 origin-right"
                                    >
                                        <FaCode className="text-blue-500" />
                                        <SkillBadge skills={["Full Stack", "Web Dev", "UI/UX Design"]} />
                                    </motion.div>

                                    <motion.div
                                        animate={{ y: [0, 10, 0] }}
                                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                        className="absolute bottom-12 left-8 glass px-4 py-2 rounded-xl hidden sm:flex items-center gap-2 scale-75 md:scale-100 origin-left"
                                    >
                                        <FaRocket className="text-purple-500" />
                                        <SkillBadge skills={["Cloud/DevOps", "Data Eng", "InfoSec"]} delay={2000} />
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:w-7/12 w-full"
                    >
                        <h2 className="text-5xl font-bold mb-6 font-signature tracking-wide" style={{ color: 'var(--text-primary)' }}>
                            About Me
                        </h2>

                        <div className="glass-card p-8 rounded-3xl relative">
                            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
                                <span className="w-10 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
                                Who I Am
                            </h3>
                            <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
                                {personalInfo.summary}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 transition-colors hover:bg-blue-100/50 dark:hover:bg-blue-900/20">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                                            <FaLaptopCode />
                                        </div>
                                        <h4 className="font-bold" style={{ color: 'var(--text-primary)' }}>Full Stack</h4>
                                    </div>
                                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Building end-to-end solutions with modern technologies.</p>
                                </div>

                                <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-800 transition-colors hover:bg-purple-100/50 dark:hover:bg-purple-900/20">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500">
                                            <FaRocket />
                                        </div>
                                        <h4 className="font-bold" style={{ color: 'var(--text-primary)' }}>Innovation</h4>
                                    </div>
                                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Always exploring new tech and best practices.</p>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex gap-8">
                                <div>
                                    <span className="block text-3xl font-bold text-blue-500">1</span>
                                    <span className="text-xs uppercase tracking-wider opacity-70" style={{ color: 'var(--text-secondary)' }}>Years Exp.</span>
                                </div>
                                <div>
                                    <span className="block text-3xl font-bold text-purple-500">5+</span>
                                    <span className="text-xs uppercase tracking-wider opacity-70" style={{ color: 'var(--text-secondary)' }}>Projects</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;

import React from 'react';

// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { education } from '../../data/portfolioData';
import { FaGraduationCap } from 'react-icons/fa';
import MathBackground from '../backgrounds/MathBackground';

const Education = () => {
    return (
        <section id="education" className="py-20 relative overflow-hidden bg-slate-100 dark:bg-slate-950 transition-colors duration-300">
            <MathBackground />
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 text-center"
                >
                    <h2 className="section-title">Education</h2>
                </motion.div>

                <div className="max-w-3xl mx-auto">
                    <div className="relative border-l-2 ml-3 space-y-12" style={{ borderColor: 'var(--border-color)' }}>
                        {education.map((edu, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                className="relative pl-8"
                            >
                                <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-500 border-4 shadow-md" style={{ borderColor: 'var(--bg-base)' }}></span>
                                <div className="glass-card p-6 hover:shadow-lg transition-shadow" style={{ background: 'var(--bg-card)' }}>
                                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                                        <h4 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{edu.degree}</h4>
                                        <span className="text-sm font-semibold text-purple-500 px-3 py-1 rounded-full bg-purple-500/10 w-fit mt-2 md:mt-0">{edu.year}</span>
                                    </div>
                                    <h5 className="text-md font-medium flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                                        <FaGraduationCap /> {edu.institution}
                                    </h5>
                                    <p className="mt-2 font-medium" style={{ color: 'var(--text-secondary)' }}>{edu.score}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Education;

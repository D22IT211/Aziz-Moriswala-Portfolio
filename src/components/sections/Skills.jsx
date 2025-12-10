import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '../../data/portfolioData';
import TechIcons from '../backgrounds/TechIcons';

const Marquee = ({ items, direction = 1, speed = 40 }) => {
    return (
        <div className="relative flex overflow-hidden py-8">
            <motion.div
                className="flex gap-8 whitespace-nowrap"
                animate={{ x: direction === 1 ? [0, -1000] : [-1000, 0] }}
                transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
            >
                {[...items, ...items, ...items].map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-3 px-6 py-4 rounded-2xl border text-lg font-semibold shadow-lg backdrop-blur-md transition-transform hover:scale-110"
                        style={{
                            background: 'var(--bg-card)',
                            borderColor: 'var(--border-color)',
                            color: 'var(--text-primary)'
                        }}
                    >
                        {item.icon && <item.icon className="text-2xl" style={{ color: 'var(--primary)' }} />}
                        <span>{item.name}</span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

const Skills = () => {
    // Flatten all skills into a single array
    const allSkills = skills.flatMap(category => category.items);

    return (
        <section id="skills" className="py-20 relative overflow-hidden bg-slate-100 dark:bg-slate-950 transition-colors duration-300">
            <TechIcons />
            <div className="container mx-auto px-6 mb-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h2 className="section-title">Technical Skills</h2>
                    <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                        The tools and technologies I use to bring ideas to life.
                    </p>
                </motion.div>
            </div>

            {/* Single Marquee Line */}
            <div className="mask-linear-gradient relative z-10">
                <Marquee items={allSkills} direction={1} speed={60} />
            </div>
        </section>
    );
};

export default Skills;

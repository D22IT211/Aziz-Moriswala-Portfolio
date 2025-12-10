import React from 'react';
import { motion } from 'framer-motion';
import { projects, skills } from '../../data/portfolioData';
import { FaArrowRight } from 'react-icons/fa';
import AuroraCanvas from '../ui/ambient-aurora';
import { Link } from 'react-router-dom';
import { ProjectShowcase } from '../ui/project-showcase';
import VSCodeFrame from '../VSCodeFrame';

const Projects = ({ limit }) => {
    const displayedProjects = limit ? projects.slice(0, limit) : projects;

    // Helper to find icon for a tool
    const getTechIcon = (toolName) => {
        for (const category of skills) {
            const found = category.items.find(item => item.name.toLowerCase() === toolName.toLowerCase());
            if (found && found.icon) {
                return found.icon;
            }
        }
        return null;
    };

    return (
        <section id="projects" className="py-20 relative overflow-hidden bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
            <AuroraCanvas />
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center"
                >
                    <h2 className="section-title">{limit ? "Featured Projects" : "All Projects"}</h2>
                    <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                        A showcase of my recent work and technical experiments.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* VS Code Frame - Visible on Mobile (below title) and Desktop (sticky) */}
                    <div className="block lg:sticky top-24 h-[500px] lg:h-[calc(100vh-8rem)] mb-12 lg:mb-0 w-full">
                        <VSCodeFrame />
                    </div>

                    {/* Right Side: Project List */}
                    <div className="w-full">
                        <ProjectShowcase projects={displayedProjects} />
                        {limit && (
                            <div className="mt-12 flex justify-center lg:justify-start">

                                <Link
                                    to="/projects"
                                    data-magnetic
                                    className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold border-2 border-blue-500 hover:opacity-90 transition-all group"
                                >
                                    <span>View All Projects</span> <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;

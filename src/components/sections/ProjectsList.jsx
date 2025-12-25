import React from 'react';

// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { projects } from '../../data/portfolioData';
import { FaGithub, FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProjectsList = ({ limit }) => {
    const displayedProjects = limit ? projects.slice(0, limit) : projects;

    return (
        <section id="projects" className="py-20 relative overflow-hidden bg-transparent transition-colors duration-300">
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

                <div className="space-y-24">
                    {displayedProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            id={project.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
                        >
                            {/* Project Image with Tilt Effect */}
                            <motion.div
                                className="w-full lg:w-1/2 perspective-1000"
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <Link to={`/project/${project.id}`} state={{ from: 'all-projects' }} className="block">
                                    <div className="relative rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300 z-10"></div>
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                                        />

                                        {/* Overlay Content */}
                                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                            <div className="flex gap-4">
                                                <span className="text-white font-medium flex items-center gap-2">
                                                    View Details <FaArrowRight />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>

                            {/* Project Details */}
                            <div className="w-full lg:w-1/2">
                                <span className="text-blue-500 font-mono text-sm tracking-wider mb-2 block">Featured Project</span>
                                <h3 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>{project.title}</h3>

                                <div className="glass-card p-6 rounded-xl mb-6 relative z-10" style={{ background: 'var(--bg-card)' }}>
                                    <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                        {project.description}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {project.tools.map((tech, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 text-sm font-medium rounded-full bg-blue-500/10 text-blue-500"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-4">
                                    <Link
                                        to={`/project/${project.id}`}
                                        state={{ from: 'all-projects' }}
                                        className="btn btn-primary group"
                                        data-magnetic
                                    >
                                        <span>Learn More</span>
                                    </Link>
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-outline"
                                        >
                                            <FaGithub className="mr-2" /> GitHub
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {limit && (
                    <div className="mt-20 text-center">
                        <Link
                            to="/projects"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-blue-500/30"
                        >
                            Explore More Projects <FaArrowRight />
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProjectsList;

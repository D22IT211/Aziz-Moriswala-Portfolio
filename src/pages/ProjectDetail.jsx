import React, { useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '../data/portfolioData';
import { FaArrowLeft, FaGithub, FaExternalLinkAlt, FaTools, FaListUl, FaCheckCircle, FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaPhp, FaDatabase, FaAndroid, FaAws } from 'react-icons/fa';
import { SiMongodb, SiFirebase, SiMysql, SiFlutter, SiDart, SiExpress, SiRedux, SiSocketdotio, SiStripe, SiGithubactions, SiMaterialdesign } from 'react-icons/si';
import { Helmet } from 'react-helmet-async';
import AuroraCanvas from '../components/ui/ambient-aurora';
import { MouseTrackerProvider, Pointer, PointerFollower } from '../components/ui/cursor';
import { MousePointer2 } from 'lucide-react';

const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const project = projects.find((p) => p.id === id);

    const handleBack = () => {
        if (location.state?.from === 'home') {
            navigate('/#projects'); // Go to home projects section
        } else {
            navigate('/projects'); // Default/All Projects
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const getTechIcon = (techName) => {
        const name = techName.toLowerCase();
        if (name.includes('react')) return <FaReact className="text-[#61DAFB]" />;
        if (name.includes('node')) return <FaNodeJs className="text-[#339933]" />;
        if (name.includes('mongo')) return <SiMongodb className="text-[#47A248]" />;
        if (name.includes('express')) return <SiExpress className="text-gray-500" />;
        if (name.includes('flutter')) return <SiFlutter className="text-[#02569B]" />;
        if (name.includes('dart')) return <SiDart className="text-[#0175C2]" />;
        if (name.includes('firebase')) return <SiFirebase className="text-[#FFCA28]" />;
        if (name.includes('android')) return <FaAndroid className="text-[#3DDC84]" />;
        if (name.includes('html')) return <FaHtml5 className="text-[#E34F26]" />;
        if (name.includes('css')) return <FaCss3Alt className="text-[#1572B6]" />;
        if (name.includes('javascript') || name.includes('js')) return <FaJs className="text-[#F7DF1E]" />;
        if (name.includes('php')) return <FaPhp className="text-[#777BB4]" />;
        if (name.includes('mysql') || name.includes('sql')) return <SiMysql className="text-[#4479A1]" />;
        if (name.includes('redux')) return <SiRedux className="text-[#764ABC]" />;
        if (name.includes('socket')) return <SiSocketdotio className="text-gray-500" />;
        if (name.includes('stripe')) return <SiStripe className="text-[#008CDD]" />;
        if (name.includes('github actions')) return <SiGithubactions className="text-[#2088FF]" />;
        if (name.includes('material')) return <SiMaterialdesign className="text-[#757575]" />;
        return <FaTools className="text-gray-400" />;
    };

    if (!project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
                <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">Project Not Found</h2>
                <Link to="/" className="btn btn-primary">Go Home</Link>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>{project.title} | Aziz Moriswala</title>
                <meta name="description" content={`Details about ${project.title} project.`} />
            </Helmet>

            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300 relative overflow-hidden">
                <AuroraCanvas />

                {/* Hero Section */}
                <div className="relative pt-32 pb-12 lg:pt-40 lg:pb-20">
                    <div className="container mx-auto px-6 relative z-10">
                        <motion.button
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            onClick={handleBack}
                            className="flex items-center text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium mb-8 group"
                        >
                            <FaArrowLeft className="mr-2 transform group-hover:-translate-x-1 transition-transform" /> Back to Projects
                        </motion.button>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                            {/* Left Column: Image */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="relative group"
                            >
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                                    <img src={project.image} alt={project.title} className="w-full h-auto object-cover" />
                                </div>

                                <div className="flex gap-4 mt-8 justify-center lg:justify-start">
                                    {project.demo && (
                                        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn btn-primary flex-1 lg:flex-none justify-center">
                                            <FaExternalLinkAlt className="mr-2" /> Live Demo
                                        </a>
                                    )}
                                    {project.github && (
                                        <MouseTrackerProvider className="flex-1 lg:flex-none relative">
                                            <Pointer>
                                                <MousePointer2 className="fill-purple-500 stroke-white/10" size={30} />
                                            </Pointer>
                                            <PointerFollower align="bottom-right">
                                                <div className="bg-purple-500 text-white border border-white/10 text-xs px-3 py-1 rounded-md shadow-md">
                                                    Open GitHub
                                                </div>
                                            </PointerFollower>
                                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline w-full justify-center">
                                                <FaGithub className="mr-2" /> View Code
                                            </a>
                                        </MouseTrackerProvider>
                                    )}
                                </div>
                            </motion.div>

                            {/* Right Column: Content */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <span className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-6 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                                    {project.tech}
                                </span>
                                <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-900 dark:text-white leading-tight">
                                    {project.title}
                                </h1>

                                <div className="prose dark:prose-invert max-w-none mb-10">
                                    <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                                        {project.description}
                                    </p>
                                </div>

                                <div className="space-y-8">
                                    {/* Key Features */}
                                    <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
                                            <FaListUl className="text-blue-500" /> Key Features
                                        </h3>
                                        <ul className="grid gap-3">
                                            {project.features.map((feature, index) => (
                                                <li key={index} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                                                    <FaCheckCircle className="mt-1 text-green-500 flex-shrink-0" size={16} />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Tools Used */}
                                    <div>
                                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
                                            <FaTools className="text-purple-500" /> Technologies
                                        </h3>
                                        <div className="flex flex-wrap gap-3">
                                            {project.tools.map((tool, index) => (
                                                <span
                                                    key={index}
                                                    className="px-4 py-2 rounded-lg text-sm font-medium bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-sm hover:border-blue-500 dark:hover:border-blue-500 transition-colors flex items-center gap-2"
                                                >
                                                    {getTechIcon(tool)}
                                                    {tool}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProjectDetail;

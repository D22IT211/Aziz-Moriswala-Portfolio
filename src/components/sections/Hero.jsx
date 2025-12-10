import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../../data/portfolioData';
import { FaDownload, FaArrowRight, FaTerminal, FaCircle } from 'react-icons/fa';
import ParticleNetwork from '../backgrounds/ParticleNetwork';

const CodeWindow = () => {
    return (
        <div className="rounded-xl overflow-hidden shadow-2xl bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-700 font-mono text-sm md:text-base w-full max-w-lg mx-auto transform hover:scale-[1.02] transition-transform duration-300">
            {/* Window Header */}
            <div className="bg-gray-100 dark:bg-[#2d2d2d] px-4 py-2 flex items-center gap-2 border-b border-gray-200 dark:border-gray-700">
                <div className="flex gap-1.5">
                    <FaCircle className="text-red-500 text-[10px]" />
                    <FaCircle className="text-yellow-500 text-[10px]" />
                    <FaCircle className="text-green-500 text-[10px]" />
                </div>
                <div className="flex-1 text-center text-gray-500 dark:text-gray-400 text-xs">portfolio.js</div>
            </div>

            {/* Code Content */}
            <div className="p-6 text-gray-800 dark:text-gray-300 overflow-x-auto">
                <pre>
                    <code>
                        <span className="text-purple-600 dark:text-purple-400">const</span> <span className="text-blue-600 dark:text-blue-400">developer</span> <span className="text-gray-800 dark:text-white">=</span> {'{'}
                        {'\n'}  <span className="text-blue-500 dark:text-blue-300">name</span>: <span className="text-green-600 dark:text-green-400">"{personalInfo.name}"</span>,
                        {'\n'}  <span className="text-blue-500 dark:text-blue-300">role</span>: <span className="text-green-600 dark:text-green-400">"Full Stack Developer"</span>,
                        {'\n'}  <span className="text-blue-500 dark:text-blue-300">skills</span>: [
                        {'\n'}    <span className="text-green-600 dark:text-green-400">"React"</span>, <span className="text-green-600 dark:text-green-400">"Node.js"</span>,
                        {'\n'}    <span className="text-green-600 dark:text-green-400">"Cloud"</span>, <span className="text-green-600 dark:text-green-400">"DevOps"</span>
                        {'\n'}  ],
                        {'\n'}  <span className="text-blue-500 dark:text-blue-300">status</span>: <span className="text-green-600 dark:text-green-400">"Ready to Build"</span>,
                        {'\n'}  <span className="text-blue-500 dark:text-blue-300">hireable</span>: <span className="text-purple-600 dark:text-purple-400">true</span>
                        {'\n'}{'}'};
                        {'\n'}
                        {'\n'}<span className="text-gray-500">// Let's create something amazing!</span>
                        {'\n'}<span className="text-blue-600 dark:text-blue-400">developer</span>.<span className="text-yellow-500 dark:text-yellow-300">buildFuture</span>();
                    </code>
                </pre>
            </div>
        </div>
    );
};

const Hero = () => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);
    const [showScroll, setShowScroll] = useState(true);

    const roles = personalInfo.roles;

    useEffect(() => {
        const handleType = () => {
            const i = loopNum % roles.length;
            const fullText = roles[i];

            setText(isDeleting
                ? fullText.substring(0, text.length - 1)
                : fullText.substring(0, text.length + 1)
            );

            setTypingSpeed(isDeleting ? 30 : 150);

            if (!isDeleting && text === fullText) {
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && text === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };

        const timer = setTimeout(handleType, typingSpeed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum, roles, typingSpeed]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setShowScroll(false);
            } else {
                setShowScroll(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
            {/* Particle Network Background */}
            <ParticleNetwork />

            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

                {/* Text Content - Left Side */}
                <div className="text-center lg:text-left relative">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 mb-6 backdrop-blur-sm">
                            <FaTerminal className="text-xs text-blue-500" />
                            <span className="text-xs font-mono font-semibold tracking-wider uppercase" style={{ color: 'var(--primary)' }}>System Online</span>
                        </div>

                        <h1 className="text-4xl lg:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
                            <span className="block text-2xl lg:text-3xl font-medium mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">
                                Hi👋! I am
                            </span>
                            <span className="gradient-text text-5xl lg:text-8xl">{personalInfo.name}</span>
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="h-12 mb-8 flex justify-center lg:justify-start items-center gap-3 text-2xl lg:text-3xl font-light font-mono"
                        style={{ color: 'var(--text-secondary)' }}
                    >
                        <span className="text-green-500">{'>'}</span>
                        <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                            {text}
                            <span className="animate-pulse">_</span>
                        </span>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="mb-10 text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed opacity-80"
                        style={{ color: 'var(--text-secondary)' }}
                    >
                        Transforming complex problems into elegant, scalable solutions. Let's build the next generation of digital experiences.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        className="flex flex-wrap justify-center lg:justify-start gap-4 mb-12 lg:mb-0"
                    >
                        <a href="#projects" className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold border-2 border-blue-500 hover:opacity-90 transition-all group" data-magnetic>
                            <span className="font-semibold">Explore Projects</span> <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a href={personalInfo.resumePdf} download className="btn btn-outline">
                            <FaDownload /> Resume
                        </a>
                    </motion.div>

                    {/* Mobile Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: showScroll ? 1 : 0, y: showScroll ? 0 : 10 }}
                        transition={{ duration: 0.5 }}
                        className="lg:hidden absolute left-1/2 transform -translate-x-1/2 -bottom-16 flex flex-col items-center gap-2 z-30 pointer-events-none"
                    >
                        <span className="text-[10px] uppercase tracking-widest opacity-60" style={{ color: 'var(--text-secondary)' }}>Scroll</span>
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="w-5 h-8 border-2 rounded-full flex justify-center p-1 bg-slate-900/50 backdrop-blur-sm"
                            style={{ borderColor: 'var(--text-secondary)' }}
                        >
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                className="w-1 h-1.5 rounded-full bg-blue-500"
                            />
                        </motion.div>
                    </motion.div>
                </div>

                {/* Visual - Right Side (Code Editor) */}
                <div className="flex justify-center lg:justify-end perspective-1000">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotateY: -10 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        transition={{ duration: 1, type: "spring" }}
                        className="w-full max-w-lg"
                    >
                        <CodeWindow />

                        {/* Decorative Elements */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-10 -right-10 w-24 h-24 bg-blue-500/20 rounded-full blur-xl"
                        ></motion.div>
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"
                        ></motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Desktop Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: showScroll ? 1 : 0, y: showScroll ? 0 : 10 }}
                transition={{ duration: 0.5 }}
                className="hidden lg:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 flex-col items-center gap-2 z-20 pointer-events-none"
            >
                <span className="text-xs uppercase tracking-widest opacity-60" style={{ color: 'var(--text-secondary)' }}>Scroll to Explore</span>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-6 h-10 border-2 rounded-full flex justify-center p-1"
                    style={{ borderColor: 'var(--text-secondary)' }}
                >
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-1 h-2 rounded-full bg-blue-500"
                    />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;

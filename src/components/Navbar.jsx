import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent scrolling when menu is open & toggle body class
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.body.classList.add('mobile-menu-open');
        } else {
            document.body.style.overflow = 'unset';
            document.body.classList.remove('mobile-menu-open');
        }

        return () => {
            document.body.style.overflow = 'unset';
            document.body.classList.remove('mobile-menu-open');
        };
    }, [isOpen]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/#about' },
        { name: 'Skills', path: '/#skills' },
        { name: 'Experience', path: '/#experience' },
        { name: 'Projects', path: '/#projects' },
        { name: 'Contact', path: '/#contact' },
    ];

    const toggleMenu = () => setIsOpen(!isOpen);

    // Smooth scroll for anchor links
    // Smooth scroll for anchor links


    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'
                }`}
            style={{
                width: '100%',
                top: 0,
                left: 0,
            }}
        >
            <div
                className={`container mx-auto px-4 md:px-6 py-3 rounded-full flex justify-between items-center transition-all duration-300 ${scrolled ? 'glass' : 'bg-transparent'
                    }`}
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    backdropFilter: scrolled ? 'blur(12px)' : 'none',
                    background: scrolled ? 'var(--glass-bg)' : 'transparent',
                    border: scrolled ? '1px solid var(--glass-border)' : 'none',
                    boxShadow: scrolled ? '0 4px 6px -1px var(--shadow-color)' : 'none',
                }}
            >
                <Link to="/" className="text-4xl font-bold font-signature" style={{ color: 'var(--text-primary)' }} onClick={() => window.scrollTo(0, 0)}>
                    Aziz
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            data-magnetic
                            onClick={() => setIsOpen(false)}
                            className="font-medium relative group overflow-hidden transition-colors duration-300"
                            style={{ textDecoration: 'none', color: 'var(--text-primary)' }}
                        >
                            <span className="group-hover:text-[var(--text-primary)] transition-colors duration-300">
                                {link.name}
                            </span>
                            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                        </Link>
                    ))}

                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-xl"
                        style={{ color: 'var(--text-primary)' }}
                        aria-label="Toggle Theme"
                    >
                        {theme === 'light' ? <FaMoon /> : <FaSun className="text-yellow-400" />}
                    </button>
                </div>

                {/* Mobile Menu Button - Visible when closed */}
                <div className={`md:hidden flex items-center gap-4 transition-all duration-300 relative z-50 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-xl"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        {theme === 'light' ? <FaMoon /> : <FaSun className="text-yellow-400" />}
                    </button>

                    <button
                        onClick={toggleMenu}
                        className="focus:outline-none p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                        style={{ color: 'var(--text-primary)' }}
                        aria-label="Toggle Menu"
                    >
                        <motion.div
                            animate="closed"
                            className="w-6 h-6 flex flex-col justify-center items-center gap-1.5"
                        >
                            <motion.span className="w-6 h-0.5 bg-current block origin-center transition-all" />
                            <motion.span className="w-6 h-0.5 bg-current block transition-all" />
                            <motion.span className="w-6 h-0.5 bg-current block origin-center transition-all" />
                        </motion.div>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 md:hidden bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur-xl flex flex-col justify-center items-center"
                    >
                        {/* Mobile Controls (Theme & Close) - Fixed inside Overlay */}
                        <div className="absolute top-6 right-6 flex items-center gap-4 z-50">
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-xl"
                                style={{ color: 'var(--text-primary)' }}
                            >
                                {theme === 'light' ? <FaMoon /> : <FaSun className="text-yellow-400" />}
                            </button>

                            <button
                                onClick={toggleMenu}
                                className="focus:outline-none p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                                style={{ color: 'var(--text-primary)' }}
                                aria-label="Close Menu"
                            >
                                <motion.div
                                    animate="open"
                                    className="w-6 h-6 flex flex-col justify-center items-center gap-1.5"
                                >
                                    <motion.span
                                        variants={{ open: { rotate: 45, y: 6 } }}
                                        className="w-6 h-0.5 bg-current block origin-center transition-all"
                                    />
                                    <motion.span
                                        variants={{ open: { opacity: 0 } }}
                                        className="w-6 h-0.5 bg-current block transition-all"
                                    />
                                    <motion.span
                                        variants={{ open: { rotate: -45, y: -8 } }}
                                        className="w-6 h-0.5 bg-current block origin-center transition-all"
                                    />
                                </motion.div>
                            </button>
                        </div>

                        {/* Background Gradients */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

                        <motion.div
                            className="flex flex-col items-center space-y-8 relative z-10"
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={{
                                open: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
                                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
                            }}
                        >
                            {navLinks.map((link) => (
                                <motion.div
                                    key={link.name}
                                    variants={{
                                        open: { y: 0, opacity: 1 },
                                        closed: { y: 20, opacity: 0 }
                                    }}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className="text-4xl font-bold tracking-tight hover:text-blue-600 transition-colors cursor-pointer block"
                                        style={{ color: 'var(--text-primary)' }}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;

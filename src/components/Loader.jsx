import React from 'react';
import { motion } from 'framer-motion';

const Loader = ({ fullscreen = true }) => {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`flex items-center justify-center bg-slate-50 dark:bg-slate-900 transition-colors duration-300 ${fullscreen ? 'fixed inset-0 z-50' : 'w-full h-full min-h-[60vh] z-10'
                }`}
        >
            <div className="relative flex flex-col items-center">
                {/* Logo Animation */}
                <motion.svg
                    viewBox="0 0 300 100"
                    className="w-64 h-auto"
                >
                    {/* Placeholder for "Aziz" signature path if real SVG existed. 
                        Since we utilize a font, we will simulate the drawing effect on text 
                        using clip-path or just simple opacity/scale for now as we don't have the font path data.
                    */}
                    <text
                        x="50%"
                        y="50%"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        className="text-6xl font-signature font-bold"
                        fill="none"
                        stroke="var(--primary)"
                        strokeWidth="2"
                    >
                        Aziz
                    </text>
                </motion.svg>

                {/* Text Animation Overlay */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    <span className="text-6xl font-bold font-signature" style={{ color: 'var(--text-primary)' }}>
                        Aziz
                    </span>
                </motion.div>

                {/* Subtitle/Loading bar */}
                <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 100, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}
                    className="h-1 bg-blue-500 rounded-full mt-4"
                />
            </div>
        </motion.div >
    );
};

// Alternative implementation using simple text if SVG stroke is tricky with just font
const SimpleLoader = () => {
    return (
        <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-50 dark:bg-slate-900"
            initial={{ opacity: 1 }}
            exit={{
                opacity: 0,
                transition: { duration: 0.8, ease: "easeInOut" }
            }}
        >
            <div className="relative">
                <motion.h1
                    className="text-6xl md:text-8xl font-bold font-signature"
                    style={{ color: 'var(--text-primary)' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Aziz<span className="text-blue-500">.</span>
                </motion.h1>

                {/* Glare/Pulse effect */}
                <motion.div
                    className="absolute -inset-4 bg-blue-500/20 blur-2xl rounded-full"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: [0, 0.5, 0], scale: [0.8, 1.2, 1.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </div>
        </motion.div>
    );
};

export default SimpleLoader;

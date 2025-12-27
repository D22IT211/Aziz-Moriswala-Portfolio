import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills } from '../../data/portfolioData';
import TechIcons from '../backgrounds/TechIcons';
import { useCursor } from '../ui/magnetic-cursor';

// Styled Node Component
const Node = ({ label, icon: Icon, onClick, isOpen, hasChildren, isLeaf }) => {
    const { setCursorType } = useCursor();
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center relative z-20 group"
        >
            <div
                onClick={onClick}
                onMouseEnter={() => !isLeaf && setCursorType('pointer')}
                onMouseLeave={() => !isLeaf && setCursorType('default')}
                className={`
                    flex items-center gap-3 px-5 py-3 rounded-xl border shadow-xl backdrop-blur-md cursor-pointer
                    transition-all duration-300 hover:scale-105 active:scale-95
                    ${isLeaf
                        ? 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-200 dark:border-blue-800'
                        : 'bg-gradient-to-br from-white to-slate-100 dark:from-slate-800 dark:to-slate-900 border-slate-200 dark:border-slate-700'
                    }
                    ${isOpen ? 'ring-2 ring-blue-500/30 shadow-blue-500/20' : ''}
                `}
            >
                {Icon && typeof Icon === 'function' && (
                    <div className={`
                        p-2 rounded-full bg-white/80 dark:bg-black/50 shadow-sm
                        ${isLeaf ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-300'}
                    `}>
                        <Icon size={32} />
                    </div>
                )}
                <span className={`
                    font-bold tracking-wide whitespace-normal md:whitespace-nowrap
                    ${isLeaf
                        ? 'text-sm text-slate-700 dark:text-slate-200'
                        : 'text-base text-slate-800 dark:text-slate-100'
                    }
                `}>
                    {label}
                </span>

                {/* Expand/Collapse Indicator for branches */}
                {!isLeaf && (
                    <div className={`
                        ml-2 w-5 h-5 rounded-full flex items-center justify-center border transition-colors
                        ${isOpen
                            ? 'bg-blue-500 border-blue-500 text-white'
                            : 'bg-transparent border-slate-400 text-slate-400 group-hover:border-blue-400 group-hover:text-blue-400'
                        }
                    `}>
                        <span className="text-xs leading-none mb-[1px]">{isOpen ? '−' : '+'}</span>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

// Simplified Horizontal Tree with CSS Connectors
const HorizontalTreeBranch = ({ data, isRoot = false }) => {
    const [expanded, setExpanded] = useState(true); // Default open for all nodes

    const label = data.category || data.name;
    const items = data.subcategories || data.items || [];
    const isLeaf = items.length === 0;

    // Toggle only if it's a branch
    const toggle = () => !isLeaf && setExpanded(!expanded);

    return (
        <div className="flex items-center">
            <Node
                label={label}
                icon={data.icon}
                onClick={toggle}
                isOpen={expanded}
                isLeaf={isLeaf}
                hasChildren={!isLeaf}
            />

            {/* If branched & expanded: Draw connector and render children column */}
            <AnimatePresence>
                {expanded && !isLeaf && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center"
                    >
                        {/* Horizontal Link from Parent to Children Column */}
                        <div className="w-12 h-[2px] bg-slate-300 dark:bg-slate-700"></div>

                        {/* Children Column */}
                        <div className="flex flex-col justify-center relative">
                            {items.map((item, idx) => (
                                <div key={idx} className="flex items-center relative pl-8 py-3">
                                    {/* 
                                         Vertical Spine Logic:
                                         We need a line that connects all children to the parent's horizontal output.
                                         The parent's output hits the "middle" of this column.
                                         
                                         Actually, standard tree implementation:
                                         A vertical line at left: 0 (the spine).
                                         Horizontal lines branching off it to each child.
                                     */}

                                    {/* Vertical Spine Segment for this child */}
                                    {items.length > 1 && (
                                        <div className={`
                                            absolute left-0 w-[2px] bg-slate-300 dark:bg-slate-700
                                            ${idx === 0 ? 'top-1/2 h-1/2 rounded-tl-full' : ''}
                                            ${idx === items.length - 1 ? 'top-0 h-1/2 rounded-bl-full' : ''}
                                            ${idx > 0 && idx < items.length - 1 ? 'top-0 h-full' : ''}
                                         `} />
                                    )}

                                    {/* Horizontal Connector to Node */}
                                    <div className={`
                                        absolute left-0 top-1/2 w-8 h-[2px] bg-slate-300 dark:bg-slate-700
                                        ${idx === 0 && items.length > 1 ? 'rounded-tl-full' : ''}
                                        ${idx === items.length - 1 && items.length > 1 ? 'rounded-bl-full' : ''}
                                     `} />

                                    {/* Recursive call */}
                                    <HorizontalTreeBranch data={item} />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const VerticalTreeBranch = ({ data, level = 0 }) => {
    const [expanded, setExpanded] = useState(true);
    const label = data.category || data.name;
    const items = data.subcategories || data.items || [];
    const isLeaf = items.length === 0;

    const toggle = () => !isLeaf && setExpanded(!expanded);

    return (
        <div className="flex flex-col w-full">
            <div className="flex items-center relative py-2">
                {/* Connector line from parent */}
                {level > 0 && (
                    <div className="absolute left-[-24px] top-1/2 w-6 h-[2px] bg-slate-300 dark:bg-slate-700"></div>
                )}

                <Node
                    label={label}
                    icon={data.icon}
                    onClick={toggle}
                    isOpen={expanded}
                    isLeaf={isLeaf}
                    hasChildren={!isLeaf}
                />
            </div>

            <AnimatePresence>
                {expanded && !isLeaf && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col ml-8 border-l-2 border-slate-300 dark:border-slate-700 pl-6"
                    >
                        {items.map((item, idx) => (
                            <VerticalTreeBranch key={idx} data={item} level={level + 1} />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const Skills = () => {
    const { setCursorType } = useCursor();
    const scrollContainerRef = useRef(null);
    const wasOverScrollbar = useRef(false);

    useEffect(() => {
        const checkScrollbarHover = (e) => {
            if (!scrollContainerRef.current) return;

            const rect = scrollContainerRef.current.getBoundingClientRect();
            // Define scrollbar detection zone (bottom 20px of the container)
            const isHorizontalInBounds = e.clientX >= rect.left && e.clientX <= rect.right;
            const distFromBottom = rect.bottom - e.clientY;
            const isVerticalInBounds = distFromBottom <= 24 && distFromBottom >= 0; // Increased to 24px for better hit testing

            const isOver = isHorizontalInBounds && isVerticalInBounds;

            if (isOver && !wasOverScrollbar.current) {
                setCursorType('grab');
                wasOverScrollbar.current = true;
            } else if (!isOver && wasOverScrollbar.current) {
                setCursorType('default');
                wasOverScrollbar.current = false;
            }
        };

        window.addEventListener('mousemove', checkScrollbarHover);
        return () => window.removeEventListener('mousemove', checkScrollbarHover);
    }, [setCursorType]);

    return (
        <section id="skills" className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 relative overflow-hidden">
            <TechIcons />
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="section-title text-4xl font-bold mb-4 text-slate-900 dark:text-white">Technical Proficiency</h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Hierarchical breakdown of technical expertise.
                    </p>
                </div>

                <div className="flex flex-col gap-20 pb-20">
                    {skills.map((category, idx) => {
                        // Determine the roots for this category's forest
                        const forestRoots = category.subcategories || category.items || [];

                        return (
                            <div key={idx} className="relative">
                                {/* Category Title Divider */}
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-slate-300 dark:to-slate-700"></div>
                                    <div className="flex items-center gap-3 bg-white dark:bg-slate-900 px-6 py-2 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm">
                                        {/* Safety check for icon */}
                                        {category.icon && typeof category.icon === 'function' && <category.icon className="text-4xl text-blue-600 dark:text-blue-400" />}
                                        <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100 whitespace-normal md:whitespace-nowrap text-center md:text-left">
                                            {category.category}
                                        </h3>
                                    </div>
                                    <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-slate-300 dark:to-slate-700"></div>
                                </div>

                                {/* Mobile Layout: Vertical Tree */}
                                <div className="md:hidden flex flex-col gap-4 ml-4">
                                    {forestRoots.map((root, rootIdx) => (
                                        <VerticalTreeBranch key={rootIdx} data={root} />
                                    ))}
                                </div>

                                {/* Desktop Layout: Horizontal Tree */}
                                <div
                                    ref={scrollContainerRef}
                                    className="hidden md:flex flex-row flex-wrap md:flex-nowrap gap-x-16 gap-y-8 ml-8 border-l-2 border-slate-200 dark:border-slate-800 pl-8 py-4 overflow-x-auto w-full max-w-full pb-12 pr-24 scroll-smooth sleek-scrollbar overscroll-x-contain transform-gpu"
                                >
                                    {forestRoots.map((root, rootIdx) => (
                                        <div key={rootIdx} className="min-w-[max-content]">
                                            <HorizontalTreeBranch data={root} isRoot={true} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Skills;

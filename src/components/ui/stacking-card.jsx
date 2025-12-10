'use client';
import { ReactLenis } from 'lenis/react';
import { useTransform, motion, useScroll } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { ArrowRight, MousePointer2 } from 'lucide-react';
import AuroraCanvas from './ambient-aurora';
import { MouseTrackerProvider, Pointer, PointerFollower } from './cursor';

const Card = ({
    i,
    title,
    description,
    image,
    link,
    color,
    progress,
    range,
    targetScale,
}) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'start start'],
    });

    const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        <div
            ref={container}
            className='h-screen flex items-center justify-center sticky top-0'
        >
            <motion.div
                style={{
                    backgroundColor: color,
                    scale,
                    top: `calc(-5vh + ${i * 25}px)`,
                }}
                className={`flex flex-col relative -top-[10%] md:-top-[25%] h-auto min-h-[500px] md:h-[500px] w-[95%] md:w-[70%] rounded-3xl p-6 md:p-12 origin-top shadow-2xl overflow-hidden text-white`}
            >
                <MouseTrackerProvider className="relative w-full h-full block">
                    <Pointer>
                        <MousePointer2 className="fill-blue-500 stroke-white/10" size={30} />
                    </Pointer>
                    <PointerFollower align="bottom-right">
                        <div className="bg-blue-500 text-white border border-white/10 text-xs px-3 py-1 rounded-md shadow-md">
                            View Project
                        </div>
                    </PointerFollower>
                    <div className="flex justify-between items-center mb-8">
                        <h2 className='text-3xl md:text-4xl font-bold'>{title}</h2>
                    </div>

                    <div className={`flex flex-col md:flex-row h-full gap-8 md:gap-12`}>
                        <div className={`w-full md:w-[40%] relative flex flex-col justify-between`}>
                            <div>
                                <p className='text-base md:text-lg opacity-90 leading-relaxed'>{description}</p>
                            </div>

                            <span className='flex items-center gap-2 pt-6'>
                                <Link
                                    to={link}
                                    state={{ from: 'all-projects' }}
                                    className='flex items-center gap-2 text-white font-semibold hover:underline group'
                                >
                                    View Project
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </span>
                        </div>

                        <div
                            className={`relative w-full md:w-[60%] h-[200px] md:h-full rounded-2xl overflow-hidden border border-white/20 flex-shrink-0`}
                        >
                            <motion.div
                                className={`w-full h-full`}
                                style={{ scale: imageScale }}
                            >
                                <img src={image} alt={title} className='absolute inset-0 w-full h-full object-cover' />
                            </motion.div>
                        </div>
                    </div>
                </MouseTrackerProvider>
            </motion.div>
        </div>
    );
};

export default function StackingCards({ projects }) {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end'],
    });

    // Vibrant, project-specific color palette
    const colors = [
        '#0f172a', // Slate 900 (Attendance)
        '#1e3a8a', // Blue 900 (HopeLift)
        '#064e3b', // Emerald 900 (Medicare)
        '#7f1d1d', // Red 900 (Global Cart)
        '#581c87', // Purple 900 (Intouch)
        '#713f12', // Yellow 900 (Notes)
        '#171717', // Neutral 900 (Portfolio)
        '#881337', // Rose 900 (Extra)
    ];

    return (
        <ReactLenis root>
            <div className='bg-[var(--bg-base)] transition-colors duration-300 min-h-screen' ref={container}>
                <div className="fixed inset-0 pointer-events-none z-0">
                    <AuroraCanvas />
                </div>
                <section className='text-[var(--text-primary)] h-[60vh] w-full bg-transparent transition-colors duration-300 grid place-content-center sticky top-0 z-10'>
                    <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,var(--border-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--border-color)_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>

                    <div className="relative z-10 text-center px-4">
                        <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-[var(--text-primary)] to-[var(--text-secondary)]'>
                            All Projects
                        </h1>
                        <p className="text-[var(--text-secondary)] text-lg md:text-xl max-w-2xl mx-auto">
                            A curated collection of my technical work and creative experiments.
                            <br />
                            <span className="text-sm mt-4 block opacity-70">Scroll down to explore</span>
                        </p>
                    </div>
                </section>

                <section className='text-[var(--text-primary)] w-full bg-transparent transition-colors duration-300 relative z-20 pb-20'>
                    {projects.map((project, i) => {
                        // Improved scaling logic: only scale down for the number of items *following* this one
                        // This prevents the first items from being too small in a large list
                        const itemsBelow = Math.min(projects.length - 1 - i, 5);
                        const targetScale = 1 - (itemsBelow * 0.05);

                        // Cycle through colors
                        const color = colors[i % colors.length];

                        return (
                            <Card
                                key={project.id || i}
                                i={i}
                                image={project.image}
                                title={project.title}
                                color={color}
                                // Truncate description for the card
                                description={project.description.length > 150 ? project.description.substring(0, 150) + "..." : project.description}
                                link={`/project/${project.id}`}
                                progress={scrollYProgress}
                                range={[i * 0.25, 1]}
                                targetScale={targetScale}
                            />
                        );
                    })}
                </section>

                {/* Spacer at the bottom */}
                <div className="h-20 bg-[var(--bg-base)] transition-colors duration-300"></div>
            </div>
        </ReactLenis>
    );
}

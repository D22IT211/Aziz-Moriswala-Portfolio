"use client"

import React, { useState, useRef, useEffect } from "react"
import { ArrowUpRight, MousePointer2 } from "lucide-react"
import { Link } from "react-router-dom"
import { MouseTrackerProvider, Pointer, PointerFollower } from "./cursor"

export function ProjectShowcase({ projects = [] }) {
    const [hoveredIndex, setHoveredIndex] = useState(null)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 })
    const [isVisible, setIsVisible] = useState(false)
    const containerRef = useRef(null)
    const animationRef = useRef(null)

    useEffect(() => {
        const lerp = (start, end, factor) => {
            return start + (end - start) * factor
        }

        const animate = () => {
            setSmoothPosition((prev) => ({
                x: lerp(prev.x, mousePosition.x, 0.15),
                y: lerp(prev.y, mousePosition.y, 0.15),
            }))
            animationRef.current = requestAnimationFrame(animate)
        }

        animationRef.current = requestAnimationFrame(animate)

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [mousePosition])

    const handleMouseMove = (e) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect()
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            })
        }
    }

    const handleMouseEnter = (index) => {
        setHoveredIndex(index)
        setIsVisible(true)
    }

    const handleMouseLeave = () => {
        setHoveredIndex(null)
        setIsVisible(false)
    }



    const [containerPos, setContainerPos] = useState({ left: 0, top: 0 });

    useEffect(() => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setContainerPos({ left: rect.left, top: rect.top });
        }
    }, [smoothPosition, isVisible]); // Update when these change or on scroll potentially

    // Ideally attach scroll listener too if needed, but fixed positioning relative to viewport usually needs just once or scroll.
    // If "fixed", left/top should be relative to viewport.
    // Logic: `left: rect.left` means it stays attached to the container visually but using fixed?

    // ... rest of component ...

    return (
        <div ref={containerRef} onMouseMove={handleMouseMove} className="relative w-full py-8">
            <div
                className="pointer-events-none fixed z-50 overflow-hidden rounded-xl shadow-2xl hidden md:block"
                style={{
                    left: containerPos.left,
                    top: containerPos.top,
                    transform: `translate3d(${smoothPosition.x + 20}px, ${smoothPosition.y - 100}px, 0)`,
                    opacity: isVisible ? 1 : 0,
                    scale: isVisible ? 1 : 0.8,
                    transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), scale 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
            >
                <div className="relative w-[280px] h-[180px] bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden">
                    {projects.map((project, index) => (
                        <img
                            key={project.id || index}
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out"
                            style={{
                                opacity: hoveredIndex === index ? 1 : 0,
                                scale: hoveredIndex === index ? 1 : 1.1,
                                filter: hoveredIndex === index ? "none" : "blur(10px)",
                            }}
                        />
                    ))}
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
            </div>

            <div className="space-y-0">
                {projects.map((project, index) => (
                    <MouseTrackerProvider key={project.id || index} className="block">
                        <Pointer>
                            <MousePointer2 className="fill-blue-500 stroke-white/10" size={30} />
                        </Pointer>
                        <PointerFollower align="bottom-right">
                            <div className="bg-blue-500 text-white border border-white/10 text-xs px-3 py-1 rounded-md shadow-md">
                                View Project
                            </div>
                        </PointerFollower>
                        <Link
                            to={`/project/${project.id}`}
                            state={{ from: 'home' }}
                            className="group block"
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="relative py-9 border-t border-slate-200 dark:border-slate-800 transition-all duration-300 ease-out">
                                {/* Background highlight on hover */}
                                <div
                                    className={`
                      absolute inset-0 -mx-4 px-4 bg-slate-100/50 dark:bg-slate-800/50 rounded-lg
                      transition-all duration-300 ease-out
                      ${hoveredIndex === index ? "opacity-100 scale-100" : "opacity-0 scale-95"}
                    `}
                                />

                                <div className="relative flex items-start justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                        {/* Title with animated underline */}
                                        <div className="inline-flex items-center gap-2">
                                            <h3 className="text-slate-900 dark:text-white font-medium text-lg tracking-tight">
                                                <span className="relative">
                                                    {project.title}
                                                    {/* Animated underline */}
                                                    <span
                                                        className={`
                                absolute left-0 -bottom-0.5 h-px bg-slate-900 dark:bg-white
                                transition-all duration-300 ease-out
                                ${hoveredIndex === index ? "w-full" : "w-0"}
                              `}
                                                    />
                                                </span>
                                            </h3>

                                            {/* Arrow that slides in */}
                                            <ArrowUpRight
                                                className={`
                            w-4 h-4 text-slate-500 dark:text-slate-400
                            transition-all duration-300 ease-out
                            ${hoveredIndex === index
                                                        ? "opacity-100 translate-x-0 translate-y-0"
                                                        : "opacity-0 -translate-x-2 translate-y-2"
                                                    }
                          `}
                                            />
                                        </div>

                                        {/* Description with fade effect */}
                                        <p
                                            className={`
                          text-sm mt-1 leading-relaxed line-clamp-2
                          transition-all duration-300 ease-out
                          ${hoveredIndex === index ? "text-slate-700 dark:text-slate-300" : "text-slate-500 dark:text-slate-400"}
                        `}
                                        >
                                            {project.description}
                                        </p>
                                    </div>

                                    {/* Year/Tech badge */}
                                    <span
                                        className={`
                        text-xs font-mono tabular-nums whitespace-nowrap
                        transition-all duration-300 ease-out
                        ${hoveredIndex === index ? "text-slate-600 dark:text-slate-300" : "text-slate-400 dark:text-slate-500"}
                      `}
                                    >
                                        {project.tech}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </MouseTrackerProvider>
                ))}

                {/* Bottom border for last item */}
                <div className="border-t border-slate-200 dark:border-slate-800" />
            </div>
        </div>
    )
}

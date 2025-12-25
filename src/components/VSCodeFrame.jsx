import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
    Folder, File, ChevronRight, ChevronDown, X, Minus, Square,
    Search, GitBranch, Bug, Blocks, Settings, User,
    Play, SplitSquareVertical, MoreHorizontal
} from "lucide-react";

const files = [
    {
        name: "src", type: "folder", expanded: true, children: [
            {
                name: "components", type: "folder", expanded: true, children: [
                    { name: "Hero.tsx", type: "file", active: true },
                    { name: "Button.tsx", type: "file" },
                    { name: "Card.tsx", type: "file" },
                ]
            },
            {
                name: "styles", type: "folder", children: [
                    { name: "globals.css", type: "file" },
                ]
            },
            { name: "App.tsx", type: "file" },
        ]
    },
    { name: "package.json", type: "file" },
];

const codeLines = [
    { text: "import { motion } from 'framer-motion';", type: "import" },
    { text: "import { Button } from './Button';", type: "import" },
    { text: "", type: "empty" },
    { text: "export const Hero = () => {", type: "function" },
    { text: "  return (", type: "code" },
    { text: "    <section className=\"min-h-screen\">", type: "jsx" },
    { text: "      <motion.div", type: "jsx" },
    { text: "        initial={{ opacity: 0, y: 20 }}", type: "prop" },
    { text: "        animate={{ opacity: 1, y: 0 }}", type: "prop" },
    { text: "        className=\"container mx-auto\"", type: "prop" },
    { text: "      >", type: "jsx" },
    { text: "        <h1 className=\"text-6xl font-bold\">", type: "jsx" },
    { text: "          Explore my Projects!", type: "text" },
    { text: "        </h1>", type: "jsx" },
    { text: "        <p className=\"text-xl text-muted\">", type: "jsx" },
    { text: "          Transform your ideas into reality", type: "text" },
    { text: "        </p>", type: "jsx" },
    { text: "        <Button variant=\"primary\">", type: "jsx" },
    { text: "          Get Started", type: "text" },
    { text: "        </Button>", type: "jsx" },
    { text: "      </motion.div>", type: "jsx" },
    { text: "    </section>", type: "jsx" },
    { text: "  );", type: "code" },
    { text: "};", type: "function" },
];

function FileTree({ items, level = 0 }) {
    const [expanded, setExpanded] = useState({ src: true, components: true });

    return (
        <div className="space-y-0.5">
            {items.map((item) => (
                <div key={item.name}>
                    <div
                        className={`flex items-center gap-2 py-1.5 px-2 rounded-lg cursor-pointer transition-all text-sm ${item.type === "file" && item.active
                            ? "bg-blue-500/10 text-blue-600 dark:text-blue-500 font-semibold"
                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-200"
                            }`}
                        style={{ paddingLeft: `${level * 16 + 8}px` }}
                        onClick={() => item.type === "folder" && setExpanded(e => ({ ...e, [item.name]: !e[item.name] }))}
                    >
                        {item.type === "folder" ? (
                            <>
                                {expanded[item.name] ? (
                                    <ChevronDown className="w-4 h-4 flex-shrink-0" />
                                ) : (
                                    <ChevronRight className="w-4 h-4 flex-shrink-0" />
                                )}
                                <Folder className="w-4 h-4 text-blue-500 flex-shrink-0" />
                            </>
                        ) : (
                            <>
                                <span className="w-4" />
                                <File className="w-4 h-4 text-blue-400 flex-shrink-0" />
                            </>
                        )}
                        <span className="truncate">{item.name}</span>
                    </div>
                    {item.type === "folder" && expanded[item.name] && item.children && (
                        <FileTree items={item.children} level={level + 1} />
                    )}
                </div>
            ))}
        </div>
    );
}

export default function VSCodeFrame() {
    const [activeLineIndex, setActiveLineIndex] = useState(0);
    const [activeCharIndex, setActiveCharIndex] = useState(0);
    const [isWaiting, setIsWaiting] = useState(false);

    useEffect(() => {
        let timeout;

        // Logic handled inside the effect, effect runs on every deps change
        if (isWaiting) {
            // Pause between lines or before resetting
            if (activeLineIndex >= codeLines.length) {
                // End of all lines, wait longer then reset
                timeout = setTimeout(() => {
                    setActiveLineIndex(0);
                    setActiveCharIndex(0);
                    setIsWaiting(false);
                }, 3000);
            } else {
                // Pause between lines
                timeout = setTimeout(() => {
                    setActiveLineIndex(prev => prev + 1);
                    setActiveCharIndex(0);
                    setIsWaiting(false);
                }, 50); // Fast pause between lines
            }
        } else {
            // Typing characters
            if (activeLineIndex < codeLines.length) {
                const currentLine = codeLines[activeLineIndex];
                if (activeCharIndex < currentLine.text.length) {
                    timeout = setTimeout(() => {
                        setActiveCharIndex(prev => prev + 1);
                    }, 30); // Typing speed
                } else {
                    // Line finished
                    setTimeout(() => setIsWaiting(true), 0);
                }
            } else {
                // All lines finished, trigger wait
                setTimeout(() => setIsWaiting(true), 0);
            }
        }

        return () => clearTimeout(timeout);
    }, [activeLineIndex, activeCharIndex, isWaiting]);

    const getLineColor = (type) => {
        switch (type) {
            case "import": return "text-purple-600 dark:text-purple-400";
            case "function": return "text-blue-600 dark:text-blue-500";
            case "jsx": return "text-blue-500 dark:text-blue-300";
            case "prop": return "text-pink-500 dark:text-pink-400";
            case "text": return "text-slate-600 dark:text-slate-200";
            default: return "text-slate-500";
        }
    };

    return (
        <div className="relative w-full h-full">
            <div className="absolute -inset-6 bg-gradient-to-r from-purple-500/20 via-blue-500/15 to-blue-400/20 rounded-3xl blur-3xl opacity-60" />

            <div className="relative h-full bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl overflow-hidden shadow-[0_20px_80px_-20px_rgba(0,0,0,0.5)] border border-slate-200 dark:border-slate-700/50 rounded-2xl flex flex-col">
                {/* Title Bar */}
                <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700/50">
                    <div className="flex items-center gap-4">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-110 transition-all cursor-pointer" />
                            <div className="w-3 h-3 rounded-full bg-[#febc2e] hover:brightness-110 transition-all cursor-pointer" />
                            <div className="w-3 h-3 rounded-full bg-[#28c840] hover:brightness-110 transition-all cursor-pointer" />
                        </div>
                        <span className="text-sm font-semibold text-slate-600 dark:text-slate-400 hidden sm:block">Hero.tsx — Portfolio</span>
                    </div>

                </div>

                {/* Main Content Area */}
                <div className="flex flex-1 overflow-hidden">
                    {/* Sidebar Icons */}
                    <div className="hidden sm:flex w-14 lg:w-16 bg-slate-50/80 dark:bg-slate-900/80 border-r border-slate-200 dark:border-slate-700/50 flex-col items-center py-4 gap-2">
                        <button className="p-3 rounded-xl text-blue-500 bg-blue-500/10 shadow-lg">
                            <File className="w-5 h-5" />
                        </button>
                        <button className="p-3 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all hover:scale-105">
                            <Search className="w-5 h-5" />
                        </button>
                        <button className="p-3 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all hover:scale-105">
                            <GitBranch className="w-5 h-5" />
                        </button>
                        <button className="p-3 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all hover:scale-105">
                            <Bug className="w-5 h-5" />
                        </button>
                        <button className="p-3 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all hover:scale-105">
                            <Blocks className="w-5 h-5" />
                        </button>
                        <div className="flex-1" />
                        <button className="p-3 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all hover:scale-105">
                            <User className="w-5 h-5" />
                        </button>
                        <button className="p-3 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all hover:scale-105">
                            <Settings className="w-5 h-5" />
                        </button>
                    </div>

                    {/* File Explorer */}
                    <div className="hidden md:block w-56 lg:w-64 bg-slate-50/60 dark:bg-slate-900/60 border-r border-slate-200 dark:border-slate-700/50 overflow-hidden flex-shrink-0">
                        <div className="p-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center justify-between">
                            Explorer
                            <ChevronDown className="w-4 h-4" />
                        </div>
                        <div className="px-2">
                            <FileTree items={files} />
                        </div>
                    </div>

                    {/* Code Editor */}
                    <div className="flex-1 flex flex-col bg-white/40 dark:bg-slate-900/40 min-w-0">
                        {/* Tabs */}
                        <div className="flex items-center border-b border-slate-200 dark:border-slate-700/50 bg-slate-50/40 dark:bg-slate-900/40 overflow-x-auto">
                            <div className="flex items-center gap-2 px-4 py-3 bg-white/50 dark:bg-slate-800/50 border-r border-slate-200 dark:border-slate-700/50 min-w-fit">
                                <File className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Hero.tsx</span>
                                <X className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 cursor-pointer transition-colors" />
                            </div>
                            <div className="flex items-center gap-2 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors cursor-pointer min-w-fit">
                                <File className="w-4 h-4" />
                                <span className="text-sm">Button.tsx</span>
                            </div>
                            <div className="flex-1" />
                            <div className="flex items-center gap-1 px-2">
                                <button className="p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 transition-all">
                                    <SplitSquareVertical className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                                </button>
                                <button className="p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 transition-all">
                                    <MoreHorizontal className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                                </button>
                            </div>
                        </div>

                        {/* Code Content */}
                        <div className="flex-1 overflow-auto p-4 sm:p-6 font-mono text-sm sm:text-base leading-relaxed relative">
                            <div className="space-y-0">
                                {codeLines.map((line, index) => {
                                    // Determine what text to show for this line
                                    let displayText = "";
                                    let showCursor = false;

                                    if (index < activeLineIndex) {
                                        displayText = line.text;
                                    } else if (index === activeLineIndex) {
                                        displayText = line.text.slice(0, activeCharIndex);
                                        showCursor = true;
                                    }

                                    // Only render if we have something to show or it's the active line (for cursor)
                                    if (index > activeLineIndex) return null;

                                    return (
                                        <div key={index} className="flex">
                                            <span className="w-10 sm:w-12 text-slate-400 dark:text-slate-600 select-none text-right pr-4 sm:pr-6 flex-shrink-0 font-medium">
                                                {index + 1}
                                            </span>
                                            <span className={`${getLineColor(line.type)} whitespace-pre font-medium`}>
                                                {displayText}
                                                {showCursor && (
                                                    <span className="inline-block w-0.5 h-5 bg-blue-500 animate-pulse ml-0.5 align-middle" />
                                                )}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Minimap */}
                            <div className="hidden lg:block absolute right-3 top-4 w-20 h-full opacity-40 pointer-events-none">
                                {codeLines.map((_, i) => (
                                    <div key={i} className="h-1 mx-1 my-0.5 bg-slate-500/30 rounded-sm" style={{ width: `${30 + (i * 7 % 50)}%` }} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status Bar */}
                <div className="flex items-center justify-between px-4 sm:px-5 py-2 sm:py-3 bg-blue-600 text-white text-xs sm:text-sm font-medium">
                    <div className="flex items-center gap-5">
                        <span className="flex items-center gap-2 font-semibold">
                            <GitBranch className="w-4 h-4" />
                            <span className="hidden sm:inline">main</span>
                        </span>
                        <span className="hidden sm:flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-white/80" />
                            0 errors, 0 warnings
                        </span>
                        <button className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition-all">
                            <Play className="w-3.5 h-3.5" />
                            <span className="text-xs font-bold">Run</span>
                        </button>
                    </div>
                    <div className="flex items-center gap-5">
                        <span className="hidden sm:inline font-semibold">TypeScript React</span>
                        <span className="font-bold">UTF-8</span>
                        <span className="hidden sm:inline font-semibold">Ln 24, Col 1</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

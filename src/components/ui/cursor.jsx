/* eslint-disable */
/* eslint-disable react-refresh/only-export-components */
"use client";

import React, { createContext, useContext, useState, useEffect, useRef, useLayoutEffect, useImperativeHandle, forwardRef } from "react";
import {
    motion,
    useMotionValue,
    AnimatePresence,
} from "framer-motion";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cx(...inputs) {
    return twMerge(clsx(inputs));
}

const MouseTrackerContext = createContext(undefined);

const useMouseTracker = () => {
    const context = useContext(MouseTrackerContext);
    if (!context) {
        throw new Error("useMouseTracker must be used within MouseTrackerProvider");
    }
    return context;
};

function MouseTrackerProvider({
    children,
    className,
    ...rest
}) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [active, setActive] = useState(false);
    const [cursorState, setCursorState] = useState('default');
    const wrapperRef = useRef(null);
    const pointerRef = useRef(null);

    useEffect(() => {
        if (active) {
            document.body.classList.add('custom-cursor-active');
            document.documentElement.classList.add('custom-cursor-active');
        } else {
            document.body.classList.remove('custom-cursor-active');
            document.documentElement.classList.remove('custom-cursor-active');
        }
    }, [active]);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;

        const container = wrapper;
        if (!container) return;

        if (getComputedStyle(container).position === "static") {
            container.style.position = "relative";
        }

        const updatePosition = (e) => {
            // Use viewport coordinates for fixed positioning
            setPosition({ x: e.clientX, y: e.clientY });
            setActive(true);
        };

        const clearPosition = () => {
            setActive(false);
            document.body.classList.remove('custom-cursor-active');
        };

        container.addEventListener("mousemove", updatePosition);
        container.addEventListener("mouseleave", clearPosition);

        return () => {
            container.removeEventListener("mousemove", updatePosition);
            container.removeEventListener("mouseleave", clearPosition);
            document.body.classList.remove('custom-cursor-active');
        };
    }, []);

    return (
        <MouseTrackerContext.Provider
            value={{ position, active, wrapperRef, pointerRef, cursorState, setCursorState }}
        >
            <div ref={wrapperRef} data-role="tracker-wrapper" className={className} {...rest}>
                {children}
            </div>
        </MouseTrackerContext.Provider>
    );
}

const Pointer = forwardRef(({ className, style, children, ...rest }, ref) => {
    const { position, active, wrapperRef, pointerRef, cursorState } = useMouseTracker();

    // Combine internal ref with forwarded ref if possible, but simplest is to just expose what we have
    useImperativeHandle(ref, () => pointerRef.current);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    useEffect(() => {
        const container = wrapperRef.current;
        if (container && active) container.style.cursor = "none";

        return () => {
            if (container) container.style.cursor = "default";
        };
    }, [active, wrapperRef]);

    useEffect(() => {
        x.set(position.x);
        y.set(position.y);
    }, [position, x, y]);

    const isPointer = cursorState === 'pointer';

    return (
        <AnimatePresence>
            {active && (
                <motion.div
                    ref={pointerRef}
                    data-role="custom-pointer"
                    className={cx(
                        "pointer-events-none z-[10000] fixed",
                        isPointer ? "top-0 left-0" : "transform -translate-x-1/2 -translate-y-1/2",
                        className
                    )}
                    style={{ top: y, left: x, ...style }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    {...rest}
                >
                    {isPointer ? (
                        <svg
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ marginLeft: '-6px', marginTop: '-2px' }} // Adjust for visual hotspot
                        >
                            <path
                                d="M11 5L24 28L18.5 29.5L16.5 20.5L10.5 26.5V5Z"
                                fill="black"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinejoin="round"
                            />
                        </svg>
                    ) : (
                        children
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
});

Pointer.displayName = "Pointer";

const PointerFollower = forwardRef(({
    align = "bottom-right",
    gap = 20,
    transition = { stiffness: 500, damping: 50, bounce: 0 },
    children,
    className,
    style,
    ...rest
}, ref) => {
    const { position, active, pointerRef } = useMouseTracker();
    const followerRef = React.useRef(null);
    useImperativeHandle(ref, () => followerRef.current);

    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [pointerSize, setPointerSize] = useState({ w: 20, h: 20 });

    useLayoutEffect(() => {
        if (pointerRef.current) {
            const box = pointerRef.current.getBoundingClientRect();
            setPointerSize({ w: box.width, h: box.height });
        }
    }, [pointerRef.current]);

    useLayoutEffect(() => {
        // eslint-disable-next-line
        const box = followerRef.current?.getBoundingClientRect();
        const w = box?.width ?? 0;
        const h = box?.height ?? 0;

        let newOffset = { x: 0, y: 0 };
        switch (align) {
            case "center": newOffset = { x: w / 2, y: h / 2 }; break;
            case "top": newOffset = { x: w / 2, y: h + gap }; break;
            case "top-left": newOffset = { x: w + gap, y: h + gap }; break;
            case "top-right": newOffset = { x: -gap, y: h + gap }; break;
            case "bottom": newOffset = { x: w / 2, y: -gap }; break;
            case "bottom-left": newOffset = { x: w + gap, y: -gap }; break;
            case "bottom-right": newOffset = { x: -gap, y: -gap }; break;
            case "left": newOffset = { x: w + gap, y: h / 2 }; break;
            case "right": newOffset = { x: -gap, y: h / 2 }; break;
            default: newOffset = { x: 0, y: 0 };
        }
        setOffset(newOffset);
    }, [align, gap]);

    const pw = pointerSize.w;
    const ph = pointerSize.h;
    const x = position.x - offset.x + pw / 2;
    const y = position.y - offset.y + ph / 2;

    return (
        <AnimatePresence>
            {active && (
                <motion.div
                    ref={followerRef}
                    data-role="pointer-follower"
                    className={cx(
                        "pointer-events-none z-[9998] fixed transform -translate-x-1/2 -translate-y-1/2 font-medium",
                        className
                    )}
                    style={{ top: y, left: x, ...style }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={transition}
                    {...rest}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
});

PointerFollower.displayName = "PointerFollower";

export {
    MouseTrackerProvider,
    Pointer,
    PointerFollower,
    useMouseTracker,
};

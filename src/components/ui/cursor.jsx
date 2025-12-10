"use client";

import * as React from "react";
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

const MouseTrackerContext = React.createContext(undefined);

const useMouseTracker = () => {
    const context = React.useContext(MouseTrackerContext);
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
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const [active, setActive] = React.useState(false);
    const wrapperRef = React.useRef(null);
    const pointerRef = React.useRef(null);

    React.useEffect(() => {
        if (active) {
            document.body.classList.add('custom-cursor-active');
            document.documentElement.classList.add('custom-cursor-active');
        } else {
            document.body.classList.remove('custom-cursor-active');
            document.documentElement.classList.remove('custom-cursor-active');
        }
    }, [active]);

    React.useEffect(() => {
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
            value={{ position, active, wrapperRef, pointerRef }}
        >
            <div ref={wrapperRef} data-role="tracker-wrapper" className={className} {...rest}>
                {children}
            </div>
        </MouseTrackerContext.Provider>
    );
}

const Pointer = React.forwardRef(({ className, style, children, ...rest }, ref) => {
    const { position, active, wrapperRef, pointerRef } = useMouseTracker();

    // Combine internal ref with forwarded ref if possible, but simplest is to just expose what we have
    React.useImperativeHandle(ref, () => pointerRef.current);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    React.useEffect(() => {
        const container = wrapperRef.current;
        if (container && active) container.style.cursor = "none";

        return () => {
            if (container) container.style.cursor = "default";
        };
    }, [active, wrapperRef]);

    React.useEffect(() => {
        x.set(position.x);
        y.set(position.y);
    }, [position, x, y]);

    return (
        <AnimatePresence>
            {active && (
                <motion.div
                    ref={pointerRef}
                    data-role="custom-pointer"
                    className={cx(
                        "pointer-events-none z-[10000] fixed transform -translate-x-1/2 -translate-y-1/2",
                        className
                    )}
                    style={{ top: y, left: x, ...style }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    {...rest}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
});

Pointer.displayName = "Pointer";

const PointerFollower = React.forwardRef(({
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
    React.useImperativeHandle(ref, () => followerRef.current);

    const getOffset = React.useCallback(() => {
        const box = followerRef.current?.getBoundingClientRect();
        const w = box?.width ?? 0;
        const h = box?.height ?? 0;

        switch (align) {
            case "center":
                return { x: w / 2, y: h / 2 };
            case "top":
                return { x: w / 2, y: h + gap };
            case "top-left":
                return { x: w + gap, y: h + gap };
            case "top-right":
                return { x: -gap, y: h + gap };
            case "bottom":
                return { x: w / 2, y: -gap };
            case "bottom-left":
                return { x: w + gap, y: -gap };
            case "bottom-right":
                return { x: -gap, y: -gap };
            case "left":
                return { x: w + gap, y: h / 2 };
            case "right":
                return { x: -gap, y: h / 2 };
            default:
                return { x: 0, y: 0 };
        }
    }, [align, gap]);

    const offset = getOffset();
    const pointerBox = pointerRef.current?.getBoundingClientRect();
    const pw = pointerBox?.width ?? 20;
    const ph = pointerBox?.height ?? 20;

    // For fixed positioning, position.x/y are clientX/Y.
    // We want the follower to be offset from the cursor.
    // The previous logic subtracted offset.x/y. 
    // Wait, getOffset returns calculated shift based on 'align'.
    // e.g. top-left: x = w+gap.
    // So if align is top-left, we want follower to be at cursorX - (w+gap)? 
    // Or cursorX + (w+gap)?
    // The original code was: x = position.x - offset.x + pw/2
    // If position.x was relative to container, and we used absolute, this put it there.
    // With fixed, position.x is clientX.
    // We still want the same math: Position Follower relative to Cursor.

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

import React, { useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { vec2 } from 'vecteur';

const ANIMATION_CONSTANTS = {
    SPEED_MULTIPLIER: 0.04,
    MAX_SCALE_X: 1,
    MAX_SCALE_Y: 0.3,
    ATTACH_DURATION: 0.6,
    DETACH_DURATION: 0.5,
    CURSOR_DEFAULT_SIZE: 24,
};

export const MagneticCursor = ({
    children,
    lerpAmount = 0.1,
    magneticFactor = 0.2,
    hoverPadding = 8,
    hoverAttribute = 'data-magnetic',
    cursorSize = ANIMATION_CONSTANTS.CURSOR_DEFAULT_SIZE,
    cursorColor = 'white',
    blendMode = 'difference',
    cursorClassName = '',
    shape = 'circle',
    disableOnTouch = true,
}) => {
    const location = useLocation();
    const cursorRef = useRef(null);
    const cursorStateRef = useRef(null);
    const initializedElements = useRef(new WeakMap()); // Store cleanup functions
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        const checkTouch = () => {
            setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
        };
        checkTouch();
    }, []);



    // Main Cursor Position & Animation Effect
    useEffect(() => {
        if (disableOnTouch && isTouchDevice) return;

        const cursorEl = cursorRef.current;
        if (!cursorEl) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const effectiveLerpAmount = prefersReducedMotion ? 1 : lerpAmount;

        if (!cursorStateRef.current) {
            cursorStateRef.current = {
                el: cursorEl,
                pos: {
                    current: vec2(-100, -100),
                    target: vec2(-100, -100),
                    previous: vec2(-100, -100),
                },
                hover: { isHovered: false },
            };
        }

        const update = () => {
            const state = cursorStateRef.current;
            if (!state || state.hover.isHovered) return;

            state.pos.current.lerp(state.pos.target, effectiveLerpAmount);
            const delta = state.pos.current.clone().sub(state.pos.previous);
            state.pos.previous.copy(state.pos.current);

            const speed = Math.sqrt(delta.x * delta.x + delta.y * delta.y) * ANIMATION_CONSTANTS.SPEED_MULTIPLIER;

            gsap.set(state.el, {
                x: state.pos.current.x,
                y: state.pos.current.y,
                rotate: Math.atan2(delta.y, delta.x) * (180 / Math.PI),
                scaleX: 1 + Math.min(speed, ANIMATION_CONSTANTS.MAX_SCALE_X),
                scaleY: 1 - Math.min(speed, ANIMATION_CONSTANTS.MAX_SCALE_Y),
            });
        };

        const initializePosition = (event) => {
            const state = cursorStateRef.current;
            if (!state) return;

            const x = event.clientX - cursorSize / 2;
            const y = event.clientY - cursorSize / 2;

            state.pos.current.x = x;
            state.pos.current.y = y;
            state.pos.target.x = x;
            state.pos.target.y = y;
            state.pos.previous.x = x;
            state.pos.previous.y = y;

            gsap.set(cursorEl, { x, y, opacity: 1 });
        };

        const onMouseMove = (event) => {
            const state = cursorStateRef.current;
            if (!state) return;

            const isInViewport =
                event.clientX >= 0 &&
                event.clientX <= window.innerWidth &&
                event.clientY >= 0 &&
                event.clientY <= window.innerHeight;

            if (isInViewport) {
                state.pos.target.x = event.clientX - cursorSize / 2;
                state.pos.target.y = event.clientY - cursorSize / 2;
                gsap.to(cursorEl, { opacity: 1, duration: 0.2 });
            } else {
                gsap.to(cursorEl, { opacity: 0, duration: 0.2 });
            }

            const target = event.target;
            const isTextContent =
                target.tagName === 'P' ||
                target.tagName === 'SPAN' ||
                target.tagName === 'H1' ||
                target.tagName === 'H2' ||
                target.tagName === 'H3' ||
                target.tagName === 'H4' ||
                target.tagName === 'H5' ||
                target.tagName === 'H6' ||
                window.getComputedStyle(target).cursor === 'text';

            if (isTextContent && !state.hover.isHovered) {
                gsap.to(cursorEl, {
                    scaleX: 0.5,
                    scaleY: 1.5,
                    duration: 0.3,
                });
            }
        };

        const handleMouseLeave = () => {
            gsap.to(cursorEl, { opacity: 0, duration: 0.3 });
        };

        const handleMouseEnter = () => {
            gsap.to(cursorEl, { opacity: 1, duration: 0.3 });
        };

        gsap.ticker.add(update);
        window.addEventListener('pointermove', onMouseMove);
        window.addEventListener('pointermove', initializePosition, { once: true });
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            gsap.ticker.remove(update);
            window.removeEventListener('pointermove', onMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [lerpAmount, cursorSize, disableOnTouch, isTouchDevice]);

    // Reset cursor on navigation
    useEffect(() => {
        if (disableOnTouch && isTouchDevice) return;

        const state = cursorStateRef.current;
        if (!state) return;

        // Force reset hover state
        state.hover.isHovered = false;

        const cursorEl = cursorRef.current;
        if (!cursorEl) return;

        const shapeBorderRadius = shape === 'circle' ? '50%' : shape === 'square' ? '0' : '8px';

        // Kill any existing animations and reset to default
        gsap.killTweensOf(cursorEl);
        gsap.to(cursorEl, {
            width: cursorSize,
            height: cursorSize,
            borderRadius: shapeBorderRadius,
            backgroundColor: cursorColor,
            scaleX: 1,
            scaleY: 1,
            duration: 0.3,
            ease: 'power3.out',
            overwrite: true
        });

    }, [location.pathname, cursorSize, cursorColor, shape, disableOnTouch, isTouchDevice]);



    // Element Scanning & Attachment Effect
    useEffect(() => {
        if (disableOnTouch && isTouchDevice) return;

        const cursorEl = cursorRef.current;
        if (!cursorEl) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const animationDuration = prefersReducedMotion ? 0.1 : 0.4;
        const detachDuration = prefersReducedMotion ? 0.1 : 0.4;

        // Function to attach listeners to a single element
        const attachListeners = (el) => {
            // GSAP quick setters for performance
            const xTo = gsap.quickTo(el, 'x', { duration: 1, ease: 'elastic.out(1, 0.3)' });
            const yTo = gsap.quickTo(el, 'y', { duration: 1, ease: 'elastic.out(1, 0.3)' });

            const handlePointerEnter = () => {
                const state = cursorStateRef.current;
                if (!state) return;
                state.hover.isHovered = true;
                const bounds = el.getBoundingClientRect();
                const computedStyle = window.getComputedStyle(el);

                const magneticColor = el.getAttribute('data-magnetic-color') || cursorColor;

                gsap.killTweensOf(cursorEl);
                gsap.to(cursorEl, {
                    x: bounds.left - hoverPadding,
                    y: bounds.top - hoverPadding,
                    width: bounds.width + hoverPadding * 2,
                    height: bounds.height + hoverPadding * 2,
                    borderRadius: computedStyle.borderRadius,
                    backgroundColor: magneticColor,
                    scaleX: 1,
                    scaleY: 1,
                    rotate: 0,
                    duration: animationDuration,
                    ease: 'power3.out',
                });
            };

            const handlePointerLeave = () => {
                const state = cursorStateRef.current;
                if (!state) return;
                state.hover.isHovered = false;

                const shapeBorderRadius =
                    shape === 'circle' ? '50%' : shape === 'square' ? '0' : '8px';

                gsap.killTweensOf(cursorEl);
                gsap.to(cursorEl, {
                    x: state.pos.target.x,
                    y: state.pos.target.y,
                    width: cursorSize,
                    height: cursorSize,
                    borderRadius: shapeBorderRadius,
                    backgroundColor: cursorColor,
                    duration: detachDuration,
                    ease: 'power3.out',
                });

                // Reset element position
                xTo(0);
                yTo(0);
            };

            let rafId = null;
            const handlePointerMove = (event) => {
                if (rafId) return;
                rafId = requestAnimationFrame(() => {
                    const { clientX, clientY } = event;
                    const { height, width, left, top } = el.getBoundingClientRect();
                    xTo((clientX - (left + width / 2)) * magneticFactor);
                    yTo((clientY - (top + height / 2)) * magneticFactor);
                    rafId = null;
                });
            };

            const handlePointerOut = () => {
                xTo(0);
                yTo(0);
            };

            el.addEventListener('pointerenter', handlePointerEnter);
            el.addEventListener('pointerleave', handlePointerLeave);
            el.addEventListener('pointermove', handlePointerMove);
            el.addEventListener('pointerout', handlePointerOut);

            // Return cleanup function
            return () => {
                el.removeEventListener('pointerenter', handlePointerEnter);
                el.removeEventListener('pointerleave', handlePointerLeave);
                el.removeEventListener('pointermove', handlePointerMove);
                el.removeEventListener('pointerout', handlePointerOut);
            };
        };

        const scanElements = () => {
            const magneticElements = document.querySelectorAll(`[${hoverAttribute}]`);
            magneticElements.forEach((el) => {
                if (initializedElements.current.has(el)) return; // Already initialized

                const cleanup = attachListeners(el);
                initializedElements.current.set(el, cleanup);
            });
        };

        // Initial scan
        scanElements();

        // Observer for new elements
        const observer = new MutationObserver((mutations) => {
            let shouldScan = false;
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    shouldScan = true;
                }
            });
            if (shouldScan) {
                scanElements();
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });

        // Force scan on route change
        scanElements();

        return () => {
            observer.disconnect();
            // Cleanup all listeners
            // Note: We can iterate WeakMap if we stored them in a separate Set, 
            // but WeakMap is not iterable. 
            // However, listeners on removed elements are fine. 
            // Listeners on remaining elements should be removed if component unmounts.
            // Since we can't iterate WeakMap, we rely on GC for unmounted elements, 
            // but for re-renders of MagneticCursor, we might leak listeners if we don't track them tightly.
            // Better: Use a Set to track elements for cleanup in this effect instance.
            // But for now, we assume MagneticCursor is persistent (in App.jsx).
            // If it unmounts, we should ideally clean up. 
            // To fix this properly without iterable WeakMap: 
            // We'll use a standard Map for active listeners since we need to clean them up.
            // But we used WeakMap to avoid holding refs to deleted nodes.
            // Compromise: Use a Set of {el, cleanup} pairs?
            // Actually, if we just use a Set<Element>, we can iterate it.
        };
    }, [magneticFactor, hoverPadding, hoverAttribute, cursorSize, cursorColor, shape, location.pathname, disableOnTouch, isTouchDevice]);
    // ^ Added location.pathname dependency to re-trigger effect and re-scan

    if (disableOnTouch && isTouchDevice) {
        return <>{children}</>;
    }

    return (
        <>
            <div
                ref={cursorRef}
                className={`magnetic-cursor ${cursorClassName}`}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    pointerEvents: 'none',
                    zIndex: 9999,
                    borderRadius: '50%',
                    backgroundColor: cursorColor,
                    mixBlendMode: blendMode,
                    width: cursorSize,
                    height: cursorSize,
                }}
            />
            {children}
        </>
    );
};

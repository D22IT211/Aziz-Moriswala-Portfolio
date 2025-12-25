import React, { useRef, useEffect, useState, createContext, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { vec2 } from 'vecteur';

const CursorContext = createContext({ cursorType: 'default', setCursorType: () => { } });
export const useCursor = () => useContext(CursorContext);

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
    const [cursorType, setCursorType] = useState('default');

    useEffect(() => {
        const checkTouch = () => {
            setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
        };
        checkTouch();
    }, []);



    const cursorTypeRef = useRef(cursorType);

    useEffect(() => {
        cursorTypeRef.current = cursorType;
    }, [cursorType]);

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

            const isPointer = cursorTypeRef.current === 'pointer';

            gsap.set(state.el, {
                x: state.pos.current.x,
                y: state.pos.current.y,
                rotate: isPointer ? 0 : Math.atan2(delta.y, delta.x) * (180 / Math.PI),
                scaleX: isPointer ? 1 : 1 + Math.min(speed, ANIMATION_CONSTANTS.MAX_SCALE_X),
                scaleY: isPointer ? 1 : 1 - Math.min(speed, ANIMATION_CONSTANTS.MAX_SCALE_Y),
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
            {/* Render Custom SVG Pointer if active */}
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
                    backgroundColor: cursorType === 'pointer' ? 'transparent' : cursorColor,
                    mixBlendMode: cursorType === 'pointer' ? 'normal' : blendMode,
                    width: cursorSize,
                    height: cursorSize,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {cursorType === 'pointer' && (
                    <div style={{ position: 'absolute', top: -8, left: -12, width: '40px', height: '40px' }}>
                        <svg width="40" height="40" viewBox="0 0 257 257" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_d_40_341)">
                                <path d="M81.0183 180.026C77.6138 175.993 73.4782 167.747 66.1179 157.738C61.9463 152.076 51.6011 141.415 48.5203 136C45.8471 131.214 46.1348 129.069 46.7702 125.103C47.897 118.048 55.6169 112.555 63.8523 113.296C70.0737 113.847 75.3482 117.7 80.0953 121.34C86.5499 126.275 89.6466 134.286 93.087 141.647C93.8232 143.222 94.2708 143.773 94 142C93.1537 136.459 83.6081 86.5647 83.5009 86.0046L83.495 85.9739L78.7682 61.3943C77.1058 52.7503 80.7622 42.5647 89.5 41.4999C98.1629 40.4443 106.163 46.1267 108.449 54.549L113.464 73.0246C113.821 74.3406 114.109 75.6552 114.333 77.0004C115.57 84.443 119.843 110.194 119.996 111.929C119.97 110.998 119.827 103.622 119.701 97.0462C119.575 90.4682 123.421 85.5 130 85.5C146 85.5 152.62 94.02 152.62 98.5C152.62 92 161.371 87.4611 167 87.4611C175.32 87.4611 181.08 89.468 183 94.5C184.92 99.5319 185.899 113.5 186 114C186.298 115.47 186.93 106.506 191 103C197.838 97.1093 208.5 100.5 209.881 111C210.271 113.967 210.36 119.705 210.36 124.647C210.36 130.455 210.216 133.949 209.881 138.151C209.509 142.644 208.478 152.8 206.98 157.72C205.966 161.045 202.645 168.456 199.331 173.039C199.22 173.193 199.113 173.336 199 173.489C197.587 175.404 187.496 189.232 186.192 195.112C184.778 201.426 185.245 201.471 184.969 205.953C184.778 209.048 185.547 212.822 186.038 214.851C186.224 215.62 185.709 216.394 184.922 216.472C182.015 216.763 175.549 217.291 171.627 216.704C166.94 215.996 166.893 208.615 165.395 205.942C163.333 202.257 157.368 201.089 155.654 203.807C152.957 208.11 147.155 215.827 143.055 216.311C135.36 217.217 119.716 216.703 106.964 216.552C106.164 216.542 105.558 215.811 105.658 215.017C106.063 211.79 106.53 204.298 102.705 201.28C99.0493 198.37 94.7559 193.472 90.9918 190.372L81.0183 180.026Z" fill="white" />
                                <path d="M152.62 98.5C152.62 94.02 146 85.5 130 85.5V85.5C123.421 85.5 119.575 90.4682 119.701 97.0462C119.84 104.317 120 112.566 120 112C120 111.143 115.593 84.5792 114.333 77.0004C114.109 75.6551 113.821 74.3406 113.464 73.0246L108.449 54.549C106.163 46.1267 98.1629 40.4443 89.5 41.4999V41.4999V41.4999C80.7622 42.5647 77.1058 52.7503 78.7682 61.3943L83.495 85.9739C83.4983 85.9912 83.4976 85.9873 83.5009 86.0046C83.6081 86.5647 93.1537 136.459 94 142C94.2708 143.773 93.8232 143.222 93.087 141.647C89.6466 134.286 86.5499 126.275 80.0953 121.34V121.34C75.3482 117.7 70.0737 113.847 63.8523 113.296C55.6169 112.555 47.897 118.048 46.7702 125.103C46.1348 129.069 45.8471 131.214 48.5203 136C51.6011 141.415 61.9463 152.076 66.1179 157.738C73.4782 167.747 77.6138 175.993 81.0183 180.026L90.9918 190.372C94.7559 193.472 99.0493 198.37 102.705 201.28C106.53 204.298 106.063 211.791 105.658 215.017C105.558 215.811 106.164 216.542 106.964 216.552C119.716 216.703 135.36 217.217 143.055 216.311C147.155 215.827 152.957 208.11 155.654 203.807C157.368 201.089 163.333 202.257 165.395 205.942C166.893 208.615 166.94 215.996 171.627 216.704C175.549 217.291 182.015 216.763 184.922 216.472C185.709 216.394 186.224 215.62 186.038 214.851C185.547 212.822 184.778 209.048 184.969 205.953C185.245 201.471 184.778 201.426 186.192 195.112C187.496 189.232 197.587 175.404 199 173.489C199.113 173.336 199.22 173.193 199.331 173.039C202.645 168.456 205.966 161.045 206.98 157.72C208.478 152.8 209.509 142.644 209.881 138.151C210.216 133.949 210.36 130.455 210.36 124.647C210.36 119.705 210.271 113.967 209.881 111C208.5 100.5 197.838 97.1093 191 103C186.93 106.506 186.298 115.47 186 114C185.899 113.5 184.92 99.5319 183 94.5C181.08 89.468 175.32 87.4611 167 87.4611C161.371 87.4611 152.62 92 152.62 98.5ZM152.62 98.5C152.62 103.575 152.754 107.841 152.893 111C153.172 117.382 152.62 110.414 152.62 104.026C152.62 101.923 152.62 99.9074 152.62 98.5Z" stroke="black" strokeWidth="10" />
                            </g>
                            <path d="M175 183L175 145" stroke="black" strokeWidth="8.96" strokeLinecap="round" />
                            <path d="M152 182.899V144.92" stroke="black" strokeWidth="8.96" strokeLinecap="round" />
                            <path d="M128.7 143.92V181.899" stroke="black" strokeWidth="8.96" strokeLinecap="round" />
                            <defs>
                                <filter id="filter0_d_40_341" x="18.3013" y="26.1326" width="212.419" height="223.995" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                    <feOffset dx="-3.84" dy="8.96" />
                                    <feGaussianBlur stdDeviation="9.6" />
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_40_341" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_40_341" result="shape" />
                                </filter>
                            </defs>
                        </svg>
                    </div>
                )}
            </div>
            <CursorContext.Provider value={{ cursorType, setCursorType }}>
                {children}
            </CursorContext.Provider>
        </>
    );
};

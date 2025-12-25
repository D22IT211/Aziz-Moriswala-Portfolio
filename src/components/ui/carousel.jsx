/* eslint-disable */
/* eslint-disable react-refresh/only-export-components */
"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const Carousel = ({ slides, options }) => {
    const progressNode = useRef(null);

    const [emblaRef, emblaApi] = useEmblaCarousel(options, [
        Autoplay({ playOnInit: true, delay: 3000 }),
    ]);

    const { autoplayIsPlaying, toggleAutoplay, onAutoplayButtonClick } =
        useAutoplay(emblaApi);

    const { showAutoplayProgress } = useAutoplayProgress(
        emblaApi,
        progressNode
    );

    const { selectedIndex, scrollSnaps, onDotButtonClick } =
        useDotButton(emblaApi);

    return (
        <div className="">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex touch-pan-y touch-pinch-zoom ml-auto mr-3">
                    {slides.map((slideContent, index) => (
                        <div className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] pl-4 transform-gpu" key={index}>
                            {slideContent}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex mx-auto max-w-80 justify-between items-center gap-3 mt-7">
                <div className="flex justify-center gap-2">
                    {scrollSnaps.map((_, index) => (
                        <DotButton
                            key={index}
                            onClick={() =>
                                onAutoplayButtonClick(() => onDotButtonClick(index))
                            }
                            className={`w-3 h-3 rounded-full border-2 border-slate-300 dark:border-slate-600 transition-colors duration-200 ${index === selectedIndex
                                ? "bg-blue-500"
                                : "bg-transparent hover:bg-slate-200 dark:hover:bg-slate-700"
                                }`}
                        />
                    ))}
                </div>

                <div
                    className={`rounded-[1.8rem] border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 relative h-2 justify-self-center self-center w-40 max-w-[90%] overflow-hidden transition-opacity duration-300 ease-in-out ${showAutoplayProgress ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <div
                        className="bg-blue-500 absolute w-full top-0 bottom-0 -left-full animate-[autoplay-progress_linear_1] [animation-play-state:running]"
                        ref={progressNode}
                        style={{
                            animationPlayState: showAutoplayProgress ? "running" : "paused",
                        }}
                    />
                </div>

                <Button size={'icon'} variant={"secondary"} onClick={toggleAutoplay} type="button" className="rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700">
                    {autoplayIsPlaying ? (
                        <Pause size={16} fill="currentColor" />
                    ) : (
                        <Play size={16} fill="currentColor" />
                    )}
                </Button>
            </div>

            <style jsx global>{`
        @keyframes autoplay-progress {
          0% { transform: translate3d(0,0,0); }
          100% { transform: translate3d(100%,0,0); }
        }
      `}</style>
        </div>
    );
};

export const useDotButton = (emblaApi) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState([]);

    const onDotButtonClick = useCallback(
        (index) => {
            if (!emblaApi) return;
            emblaApi.scrollTo(index);
        },
        [emblaApi]
    );

    const onInit = useCallback((emblaApi) => {
        setScrollSnaps(emblaApi.scrollSnapList());
    }, []);

    const onSelect = useCallback((emblaApi) => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, []);

    useEffect(() => {
        if (!emblaApi) return;

        setTimeout(() => {
            onInit(emblaApi);
            onSelect(emblaApi);
        }, 0);
        emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
    }, [emblaApi, onInit, onSelect]);

    return {
        selectedIndex,
        scrollSnaps,
        onDotButtonClick,
    };
};

export const DotButton = (props) => {
    const { children, ...restProps } = props;

    return (
        <button type="button" {...restProps}>
            {children}
        </button>
    );
};

export const useAutoplayProgress = (emblaApi, progressNode) => {
    const [showAutoplayProgress, setShowAutoplayProgress] = useState(false);
    const animationName = useRef("");
    const timeoutId = useRef(0);
    const rafId = useRef(0);

    const startProgress = useCallback((timeUntilNext) => {
        const node = progressNode.current;

        if (!node) return;
        if (timeUntilNext === null) return;

        if (!animationName.current) {
            const style = window.getComputedStyle(node);
            animationName.current = style.animationName;
        }

        node.style.animationName = "none";
        node.style.transform = "translate3d(0,0,0)";

        rafId.current = window.requestAnimationFrame(() => {
            timeoutId.current = window.setTimeout(() => {
                node.style.animationName = animationName.current;
                node.style.animationDuration = `${timeUntilNext}ms`;
            }, 0);
        });

        setShowAutoplayProgress(true);
    }, [progressNode]); // Add progressNode to deps if needed, though ref should be stable

    useEffect(() => {
        const autoplay = emblaApi?.plugins()?.autoplay;
        if (!autoplay) return;

        emblaApi
            .on("autoplay:timerset", () => startProgress(autoplay.timeUntilNext()))
            .on("autoplay:timerstopped", () => setShowAutoplayProgress(false));
    }, [emblaApi, startProgress]);

    useEffect(() => {
        return () => {
            cancelAnimationFrame(rafId.current);
            clearTimeout(timeoutId.current);
        };
    }, []);

    return {
        showAutoplayProgress,
    };
};

export const useAutoplay = (emblaApi) => {
    const [autoplayIsPlaying, setAutoplayIsPlaying] = useState(false);

    const onAutoplayButtonClick = useCallback(
        (callback) => {
            const autoplay = emblaApi?.plugins()?.autoplay;
            if (!autoplay) return;

            const resetOrStop =
                autoplay.options.stopOnInteraction === false
                    ? autoplay.reset
                    : autoplay.stop;

            resetOrStop();
            callback();
        },
        [emblaApi]
    );

    const toggleAutoplay = useCallback(() => {
        const autoplay = emblaApi?.plugins()?.autoplay;
        if (!autoplay) return;

        const playOrStop = autoplay.isPlaying() ? autoplay.stop : autoplay.play;
        playOrStop();
    }, [emblaApi]);

    useEffect(() => {
        const autoplay = emblaApi?.plugins()?.autoplay;
        if (!autoplay) return;

        setTimeout(() => {
            setAutoplayIsPlaying(autoplay.isPlaying());
        }, 0);

        emblaApi
            .on("autoplay:play", () => setAutoplayIsPlaying(true))
            .on("autoplay:stop", () => setAutoplayIsPlaying(false))
            .on("reInit", () => setAutoplayIsPlaying(autoplay.isPlaying()));
    }, [emblaApi]);

    return {
        autoplayIsPlaying,
        toggleAutoplay,
        onAutoplayButtonClick,
    };
};

export { Carousel };

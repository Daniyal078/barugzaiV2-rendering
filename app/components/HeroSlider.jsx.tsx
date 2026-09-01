"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

type Banner = {
    id: number;
    title: string;
    title_2: string;
    image_url: string;
    highlight: string;
};

type HeroSliderProps = {
    banners: Banner[];
    autoPlayInterval?: number;
};

export default function HeroSlider({
    banners,
    autoPlayInterval = 5000,
}: HeroSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    const nextSlide = useCallback(() => {
        if (!banners || banners.length === 0) return;
        setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, [banners]);

    const prevSlide = useCallback(() => {
        if (!banners || banners.length === 0) return;
        setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
    }, [banners]);

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    // Autoplay Logic
    useEffect(() => {
        if (!banners || banners.length <= 1 || isPaused) return;

        const timer = setInterval(() => {
            nextSlide();
        }, autoPlayInterval);

        return () => clearInterval(timer);
    }, [banners, autoPlayInterval, isPaused, nextSlide]);

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") prevSlide();
            if (e.key === "ArrowRight") nextSlide();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [nextSlide, prevSlide]);

    // Touch / Swipe Controls
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.targetTouches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) return;
        const distance = touchStartX.current - touchEndX.current;
        const isSwipe = Math.abs(distance) > 50;

        if (isSwipe) {
            if (distance > 0) nextSlide();
            else prevSlide();
        }

        touchStartX.current = null;
        touchEndX.current = null;
    };

    if (!banners || banners.length === 0) return null;

    return (
        <section
            className="relative h-[60vh] md:h-screen w-full overflow-hidden bg-black text-white select-none"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Slides Container - Stacked Absolute Layering for Cross-Fade */}
            <div className="relative h-full w-full">
                {banners.map((slide, index) => {
                    const isActive = currentIndex === index;

                    return (
                        <div
                            key={slide.id || index}
                            className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out ${isActive ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
                                }`}
                        >
                            {/* Background Image with Zoom Effect */}
                            <div
                                className={`absolute inset-0 bg-cover bg-center transition-transform duration-10000 ease-out ${isActive ? "scale-105" : "scale-100"
                                    }`}
                                style={{ backgroundImage: `url(${slide.image_url})` }}
                            />

                            {/* Dark Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/90" />

                            {/* Slide Content */}
                            <div className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-36 md:pb-44 text-center">
                                <div
                                    className={`transition-all duration-700 ease-out transform ${isActive ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                                        }`}
                                >
                                    <h2 className="font-nexa text-xl md:text-5xl uppercase font-light tracking-[5px]">
                                        {slide.title}
                                    </h2>
                                    <h1 className="font-nexa text-2xl md:text-6xl font-semibold uppercase text-yellow-500 mt-2 tracking-wide drop-shadow-md">
                                        {slide.title_2}
                                    </h1>
                                    {slide.highlight && (
                                        <p className="mt-3 text-xs md:text-sm font-light tracking-widest text-gray-300 uppercase">
                                            {slide.highlight}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Manual Arrow Controls (Desktop) */}
            {banners.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-30 h-12 w-12 items-center justify-center rounded-full bg-black/30 text-white/70 backdrop-blur-sm border border-white/10 transition-all hover:bg-black/60 hover:text-white hover:scale-110"
                        aria-label="Previous Slide"
                    >
                        &#10094;
                    </button>
                    <button
                        onClick={nextSlide}
                        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-30 h-12 w-12 items-center justify-center rounded-full bg-black/30 text-white/70 backdrop-blur-sm border border-white/10 transition-all hover:bg-black/60 hover:text-white hover:scale-110"
                        aria-label="Next Slide"
                    >
                        &#10095;
                    </button>
                </>
            )}

            {/* Animated Progress Bar Indicators */}
            {banners.length > 1 && (
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 flex gap-3 md:gap-4">
                    {banners.map((_, index) => {
                        const isActive = currentIndex === index;

                        return (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className="group py-2 focus:outline-none"
                                aria-label={`Go to slide ${index + 1}`}
                            >
                                <div className="w-10 md:w-24 h-1 bg-white/20 overflow-hidden rounded-full backdrop-blur-xs transition-all duration-300 group-hover:bg-white/40">
                                    <div
                                        className={`h-full bg-yellow-500 transition-all ${isActive && !isPaused
                                                ? "w-full duration-[5000ms] linear"
                                                : isActive && isPaused
                                                    ? "w-full"
                                                    : "w-0 duration-300 ease-out"
                                            }`}
                                    />
                                </div>
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Down Scroll Arrow */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 text-white/70 animate-bounce text-xl pointer-events-none">
                &#709;
            </div>
        </section>
    );
}
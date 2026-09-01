"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

type Banner = {
    id: number;
    title: string;
    title_2: string;
    image_url: string;
    highlight: string;
};

type HeroSliderProps = {
    banners: Banner[];
};

export default function HeroSlider({ banners }: HeroSliderProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
    const [selectedIndex, setSelectedIndex] = useState(0);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);

        const autoplay = setInterval(() => {
            emblaApi.scrollNext();
        }, 5000);

        return () => clearInterval(autoplay);
    }, [emblaApi, onSelect]);

    return (
        <section className="relative h-[50vh] md:h-screen w-full overflow-hidden bg-black text-white">
            <div className="overflow-hidden h-full" ref={emblaRef}>
                <div className="flex h-full">
                    {banners.map((slide, index) => (
                        <div className="relative min-w-full h-full" key={slide.id || index}>
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url(${slide.image_url})` }}
                            />
                            {/* Tailwind v3 Gradient syntax */}
                            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black" />

                            <div className="relative z-10 flex flex-col items-center justify-end pb-40 h-full text-center px-6">
                                {selectedIndex === index && (
                                    <div>
                                        <h2 className="text-xl md:text-5xl uppercase font-nexa font-light tracking-[5px]">
                                            {slide.title}
                                        </h2>
                                        <h1 className="text-2xl md:text-5xl font-nexa uppercase font-semibold text-yellow-500 mt-2 tracking-wide">
                                            {slide.title_2}
                                        </h1>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Slide Progress Indicators (pure CSS transition instead of framer-motion) */}
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-4 z-20">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => emblaApi?.scrollTo(index)}
                        className="group py-2"
                        aria-label={`Go to slide ${index + 1}`}
                    >
                        <div className="w-10 md:w-28 h-1 bg-white/30 overflow-hidden rounded-full">
                            <div
                                className={`h-full bg-white transition-all duration-500 ease-out ${selectedIndex === index ? "w-full" : "w-0"
                                    }`}
                            />
                        </div>
                    </button>
                ))}
            </div>

            {/* Down arrow indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white animate-bounce text-xl pointer-events-none">
                &#709;
            </div>
        </section>
    );
}
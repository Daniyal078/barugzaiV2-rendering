/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import VideoSection from "../VideoSection";

const founderSlides = [
    {
        title: "FOUNDER",
        highlight: "STORY",
        text: "Growing up around the automotive world, I always knew I'd end up building something of my own. Not just selling cars — actually designing them, crafting them, making them unlike anything else on the road. That need to create something unique, something perfect, never really switched off. Barugzai started from that.Every edition we release carries the same obsession that started it all — the details, the finish, the feeling when someone sees their build for the first time.That part never gets old.",
    },
    {
        title: "OUR",
        highlight: "VISION",
        text: "To redefine luxury travel by creating bespoke environments that reflect the unique personality of every client we serve.",
    }
];

export default function JourneyWithVideo() {
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Slider API state taake hum code se slide change kar sakein
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!api) return;

        setCurrent(api.selectedScrollSnap());

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    // Left click (Previous slide)
    const handlePrev = () => {
        if (api) api.scrollPrev();
    };

    // Right click (Next slide)
    const handleNext = () => {
        if (api) api.scrollNext();
    };

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) videoRef.current.pause();
            else videoRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="bg-secondary [&_enable-fullscreen-controls]:hidden">
            <section className="relative text-white lg:py-24 md:py-20 py-10 px-6 overflow-hidden min-h-[700px] flex flex-col justify-center">
                <div className="max-w-7xl mx-auto w-full relative z-10">
                    <div className='uppercase text-4xl text-center font-nexa text-white font-light mb-10'>OUR
                        <span className="text-primary"> JOURNEY</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="relative flex justify-center lg:justify-start">
                            <div className="relative w-full max-w-md aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-white/5">
                                <Image src='/images/img434.webp' alt="Founder" fill className="object-cover" />
                            </div>
                        </div>

                        <div className="relative">
                            {/* setApi lagaya slider control karne ke liye */}
                            <Carousel setApi={setApi} className="w-full lg:max-w-lg">
                                <CarouselContent>
                                    {founderSlides.map((slide, index) => (
                                        <CarouselItem key={index}>
                                            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 py-4">
                                                <div className="space-y-4">
                                                    <h3 className="text-3xl md:text-4xl font-nexa font-light uppercase">
                                                        {slide.title} <span className="text-[#c5a059]">{slide.highlight}</span>
                                                    </h3>
                                                    {/* <div className="relative h-8 flex items-center justify-center lg:justify-start">
                                                        <div className="w-4 h-4 bg-[#c5a059] rounded-full shadow-[0_0_15px_rgba(197,160,89,0.5)]" />
                                                    </div> */}
                                                    <p className="text-gray-400 text-lg leading-relaxed font-light tracking-wide min-h-[120px]">
                                                        {slide.text}
                                                    </p>
                                                </div>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                            </Carousel>

                            <div className="pt-20 flex flex-col md:flex-row items-center justify-between gap-8 w-full">
                                {/* Dynamic Dots Jo slide badalne par move honge */}
                                <div className="flex items-center space-x-2">
                                    <div className={`h-[2px] w-8 transition-all ${current === 0 ? 'bg-[#c5a059]' : 'bg-gray-600'}`} />
                                    <div className={`h-2 w-2 rounded-full transition-all ${current === 1 ? 'bg-[#c5a059] w-4' : 'bg-gray-600'}`} />
                                </div>

                                {/* Dono buttons par Click handlers laga diye hain */}
                                <div className="flex space-x-8 text-[10px] tracking-[0.2em] uppercase font-medium text-gray-500">
                                    <span
                                        onClick={handlePrev}
                                        className={`cursor-pointer hover:text-white transition-colors ${current === 0 ? 'text-white font-bold' : ''}`}
                                    >
                                        BRAND VALUES (PREV)
                                    </span>
                                    <span
                                        onClick={handleNext}
                                        className={`cursor-pointer hover:text-white transition-colors ${current === 1 ? 'text-white font-bold' : ''}`}
                                    >
                                        RELATIONSHIP (NEXT)
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <VideoSection />
        </div>
    );
}
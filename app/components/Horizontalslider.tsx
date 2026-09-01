"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent } from "@/components/ui/card";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const bannerImages = [
    { id: 1, url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200", title: "Premium Experience" },
    { id: 2, url: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1200", title: "Cinematic Motion" },
    { id: 3, url: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1200", title: "Luxury Aesthetics" },
    { id: 4, url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200", title: "Modern Design" },
];

export default function HorizontalSlider() {
    const containerRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!sliderRef.current || !containerRef.current) return;

        const slider = sliderRef.current;

        const getScrollAmount = () => slider.scrollWidth - window.innerWidth;

        const tl = gsap.to(slider, {
            x: () => -getScrollAmount(),
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                pin: true,
                scrub: 1,
                start: "top top",
                end: () => `+=${getScrollAmount()}`,
                invalidateOnRefresh: true,
            },
        });

        const handleLoad = () => {
            ScrollTrigger.refresh();
        };
        window.addEventListener("load", handleLoad);
        ScrollTrigger.refresh();

        return () => {
            window.removeEventListener("load", handleLoad);
        };
    }, { scope: containerRef });


    return (
        <div ref={containerRef} className="relative overflow-hidden bg-black">
            <div className="flex h-screen items-center">

                <div
                    ref={sliderRef}
                    className="flex gap-6 px-12 will-change-transform"
                >
                    {bannerImages.map((image) => (
                        <Card
                            key={image.id}
                            className="relative h-[70vh] w-[80vw] md:w-[60vw] lg:w-[45vw] shrink-0 overflow-hidden border-none bg-neutral-900 rounded-xl"
                        >
                            <CardContent className="p-0 h-full w-full relative group">
                                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent z-10" />

                                <Image
                                    src={image.url}
                                    alt={image.title}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                <div className="absolute bottom-8 left-8 z-20 text-white">
                                    <h3 className="text-2xl md:text-4xl font-light tracking-wider uppercase">
                                        {image.title}
                                    </h3>
                                    <p className="text-xs md:text-sm text-neutral-400 mt-2 tracking-widest uppercase">
                                        Discover More →
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

            </div>
        </div>
    );
}
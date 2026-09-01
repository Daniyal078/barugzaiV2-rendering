'use client'

import Image from "next/image";
import { useEffect, useRef } from "react";

const galleryImages = [
    { id: 1, src: "/images/slider-image-1.png" },
    { id: 2, src: "/images/slider-image-2.png" },
    { id: 3, src: "/images/slider-image-3.png" },
    { id: 4, src: "/images/slider-image-4.png" },
];

export default function VerticalStickySlider() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const counterCurrentRef = useRef<HTMLSpanElement>(null);
    const scrollHintRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let currentTranslate = 0;
        let targetTranslate = 0;
        let rafId: number;

        const handleScroll = () => {
            const section = sectionRef.current;
            if (!section) return;

            const rect = section.getBoundingClientRect();
            const sectionScrollHeight = section.offsetHeight - window.innerHeight;
            const scrolled = Math.max(0, -rect.top);
            const progress = Math.min(1, scrolled / sectionScrollHeight);

            targetTranslate = -progress * (galleryImages.length - 1) * 100;

            if (progressBarRef.current) {
                progressBarRef.current.style.height = `${progress * 100}%`;
            }

            if (counterCurrentRef.current) {
                const idx = Math.round(progress * (galleryImages.length - 1));
                counterCurrentRef.current.textContent = String(idx + 1).padStart(2, '0');
            }

            if (scrollHintRef.current) {
                scrollHintRef.current.style.opacity = progress > 0.03 ? '0' : '1';
            }
        };

        const animate = () => {
            currentTranslate += (targetTranslate - currentTranslate) * 0.09;
            if (trackRef.current) {
                trackRef.current.style.transform = `translateY(${currentTranslate}vh)`;
            }
            rafId = requestAnimationFrame(animate);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        rafId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <section className="bg-secondary">

            <div className="max-w-7xl mx-auto px-6 pt-10 md:pt-10">
                <div className="text-center space-y-5">
                    <div className="tracking-[5px] text-white md:text-4xl text-2xl font-light">
                        BARUGZAI <span className="text-primary">V CLASS</span>
                    </div>
                    <p className="text-white max-w-3xl mx-auto">
                        Elevating luxury with Limgene — bespoke V-Class models (Prestige, Magellan, Venum) crafted for
                        elegance, comfort, and a premium VIP experience.
                    </p>
                </div>
            </div>
            <div
                ref={sectionRef}
                style={{ height: `${galleryImages.length * 100}vh` }}
                className="relative mt-10 md:mt-16"
            >
                <div className="sticky top-0 h-screen overflow-hidden">

                    <div
                        ref={trackRef}
                        className="flex flex-col"
                        style={{
                            height: `${galleryImages.length * 100}vh`,
                            willChange: 'transform',
                            transform: 'translateY(0vh)',
                        }}
                    >
                        {galleryImages.map((image, index) => (
                            <div
                                key={image.id}
                                className="relative flex-none"
                                style={{ width: '100vw', height: '100vh' }}
                            >
                                <Image
                                    src={image.src}
                                    fill
                                    sizes="100vw"
                                    className="object-cover"
                                    alt={`Gallery Image ${index + 1}`}
                                    priority={index === 0}
                                />
                                <div className="absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-black/50 pointer-events-none" />
                            </div>
                        ))}
                    </div>

                    <div className="absolute top-0 left-0 bottom-0 w-0.5 bg-white/10 pointer-events-none">
                        <div
                            ref={progressBarRef}
                            className="w-full bg-[#c5a059]"
                            style={{ height: '0%' }}
                        />
                    </div>

                    <div className="absolute bottom-7 right-8 flex items-baseline gap-1.5 pointer-events-none">
                        <span
                            ref={counterCurrentRef}
                            className="text-white text-xl font-light tabular-nums"
                        >
                            01
                        </span>
                        <span className="text-white/30 text-sm">/</span>
                        <span className="text-white/30 text-sm tabular-nums">
                            {String(galleryImages.length).padStart(2, '0')}
                        </span>
                    </div>

                    <div className="absolute top-1/2 right-6 -translate-y-1/2 flex flex-col gap-2 pointer-events-none">
                        {galleryImages.map((_, i) => (
                            <div
                                key={i}
                                className="w-1.5 h-1.5 rounded-full bg-white/20"
                            />
                        ))}
                    </div>

                    <div
                        ref={scrollHintRef}
                        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 text-xs tracking-widest uppercase pointer-events-none transition-opacity duration-500"
                    >
                        <span>Scroll to explore</span>
                        <svg
                            width="14" height="14" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" strokeWidth="1.5"
                            className="animate-bounce"
                        >
                            <path d="M12 5v14M5 12l7 7 7-7" />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
}
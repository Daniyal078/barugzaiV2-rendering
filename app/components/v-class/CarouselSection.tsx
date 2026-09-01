'use client'

import Image from "next/image";
import { useEffect, useRef } from "react";
import RevealAnimation from "../RevealAnimation";

type CarouselImage = {
    id: string | number;
    src: string;
};

type CarouselSectionProps = {
    title: string;
    subTitle: string;
    galleryImages: CarouselImage[];
};

export default function CarouselSection({ title, subTitle, galleryImages }: CarouselSectionProps) {
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

            // Dynamic track height calculation based on mobile/desktop bounds
            const stickyElementHeight = window.innerWidth < 768 ? window.innerHeight * 0.5 : window.innerHeight;
            const sectionScrollHeight = section.offsetHeight - stickyElementHeight;

            const scrolled = Math.max(0, -rect.top);
            const progress = Math.min(1, scrolled / sectionScrollHeight);

            targetTranslate = -progress * (galleryImages?.length - 1) * 100;

            if (progressBarRef.current) {
                progressBarRef.current.style.width = `${progress * 100}%`;
            }

            if (counterCurrentRef.current) {
                const idx = Math.round(progress * (galleryImages?.length - 1));
                counterCurrentRef.current.textContent = String(idx + 1).padStart(2, '0');
            }

            if (scrollHintRef.current) {
                scrollHintRef.current.style.opacity = progress > 0.03 ? '0' : '1';
            }
        };

        const animate = () => {
            currentTranslate += (targetTranslate - currentTranslate) * 0.09;
            if (trackRef.current) {
                trackRef.current.style.transform = `translateX(${currentTranslate}vw)`;
            }
            rafId = requestAnimationFrame(animate);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll); // Resize par recalculate karne ke liye
        handleScroll();
        rafId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
            cancelAnimationFrame(rafId);
        };
    }, [galleryImages?.length]); // Dependency array me length add ki taaki properly track ho

    return (
        <section className="bg-secondary">
            <div className="max-w-7xl mx-auto px-6 pt-10 md:pt-10">
                <div className="text-center space-y-5">
                    <RevealAnimation
                        key={1}
                        duration={0.5}
                        delay={0.2}
                        className="text-center max-w-4xl flex flex-col items-center justify-center mx-auto"
                    >
                        <div className="tracking-[5px] font-nexa uppercase text-white md:text-4xl text-2xl font-light">
                            {title}
                        </div>
                    </RevealAnimation>
                    <RevealAnimation
                        key={2}
                        duration={0.5}
                        delay={0.5}
                        className="text-center max-w-4xl flex flex-col items-center justify-center mx-auto"
                    >
                        <p className="text-white max-w-3xl mx-auto">{subTitle}</p>
                    </RevealAnimation>
                </div>
            </div>

            {/* Total height container */}
            <div
                ref={sectionRef}
                style={{ height: `${galleryImages?.length * 100}vh` }}
                className="relative mt-10 md:mt-16"
            >
                {/* 
                  Mobile par h-[50vh] aur screen ke bilkul center me lane ke liye top-[25vh].
                  Desktop (md:) par wapis h-screen aur top-0 ho jayega.
                */}
                <div className="sticky top-[25vh] h-[50vh] md:top-0 md:h-screen overflow-hidden">

                    <div
                        ref={trackRef}
                        className="flex h-full"
                        style={{
                            width: `${galleryImages?.length * 100}vw`,
                            willChange: 'transform',
                            transform: 'translateX(0vw)',
                        }}
                    >
                        {galleryImages?.map((image, index) => (
                            <div
                                key={image.id}
                                className="relative flex-none h-full w-screen"
                            >
                                <Image
                                    src={image.src}
                                    fill
                                    sizes="100vw"
                                    className="object-cover"
                                    alt={`Gallery Image ${index + 1}`}
                                    priority={index === 0}
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />
                            </div>
                        ))}
                    </div>

                    {/* Progress Bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 pointer-events-none">
                        <div
                            ref={progressBarRef}
                            className="h-full bg-[#c5a059]"
                            style={{ width: '0%' }}
                        />
                    </div>

                    {/* Counter */}
                    <div className="absolute bottom-4 right-6 md:bottom-7 md:right-8 flex items-baseline gap-1.5 pointer-events-none">
                        <span
                            ref={counterCurrentRef}
                            className="text-white text-lg md:text-xl font-light tabular-nums"
                        >
                            01
                        </span>
                        <span className="text-white/30 text-xs md:text-sm">/</span>
                        <span className="text-white/30 text-xs md:text-sm tabular-nums">
                            {String(galleryImages?.length).padStart(2, '0')}
                        </span>
                    </div>

                    {/* Dots indicator */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 md:gap-2 pointer-events-none">
                        {galleryImages?.map((_, i) => (
                            <div
                                key={i}
                                className="w-1.2 h-1.2 md:w-1.5 md:h-1.5 rounded-full bg-white/20"
                            />
                        ))}
                    </div>

                    {/* Scroll Hint */}
                    <div
                        ref={scrollHintRef}
                        className="absolute bottom-4 left-6 md:bottom-7 md:left-8 flex items-center gap-2 text-white/40 text-[10px] md:text-xs tracking-widest uppercase pointer-events-none transition-opacity duration-500"
                    >
                        <svg
                            width="12" height="12" className="md:w-3.5 md:h-3.5 animate-bounce-x"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                        >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                        <span>Scroll</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
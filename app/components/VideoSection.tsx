/* eslint-disable @next/next/no-img-element */
'use client';
import { useState } from "react";
import { Play } from "lucide-react"; // Ya jo bhi icons aap use kar rahe hain

export default function VideoSection() {
    const [isPlaying, setIsPlaying] = useState(false);

    // YouTube Video ID aapki URL se nikali hui
    const videoId = "936XWDheP8Y";

    return (
        <section className="relative w-full aspect-video md:max-h-[600px] overflow-hidden group bg-neutral-900">
            {isPlaying ? (
                /* Jab play button click ho toh iframe load ho */
                <iframe
                    className="w-full h-full object-cover"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&rel=0&modestbranding=1&iv_load_policy=3&mute=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                />
            ) : (
                /* Default State: High-Res Thumbnail and Play Button */
                <>
                    <img
                        // Yeh automatic YouTube ka max resolution thumbnail nikal leta hai
                        src={`/images/imgi_3_banner.jpg`}
                        alt="Video Thumbnail"
                        className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
                    />

                    {/* Custom Play Overlay */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        <button
                            onClick={() => setIsPlaying(true)}
                            className="p-6 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105"
                        >
                            <Play size={32} />
                        </button>
                    </div>
                </>
            )}

            {/* Luxury Gold Accents Lines */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#c5a059] to-transparent opacity-50" />
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#c5a059] to-transparent opacity-50" />
        </section>
    );
}
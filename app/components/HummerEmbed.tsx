import React from 'react';

export default function HummerEmbed() {

    return (
        <div className="flex flex-col items-center w-full mx-auto">

            {/* 3D Model Iframe Container */}
            <div className="relative w-full h-screen overflow-hidden">
                <iframe

                    title="2024 GMC Hummer EV SUV"

                    className="absolute top-0 left-0 w-full h-full"

                    src="https://sketchfab.com/models/7cd584fc9ba54acd9002d4286a08e419/embed?ui_theme=dark"

                    allowFullScreen

                    allow="autoplay; fullscreen; xr-spatial-tracking"

                    // Next.js / modern browser friendly loading attribute

                    loading="lazy"
                />
            </div>
        </div>

    );

}

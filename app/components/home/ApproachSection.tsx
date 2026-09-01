"use client";

import React from "react";
import Image from "next/image";

export default function ApproachSection() {
    return (
        <section className="bg-white text-black py-20 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-start">
                    <div className="">
                        <h2 className="text-2xl md:text-4xl font-light font-nexa leading-tight tracking-tight uppercase">
                            WE STRIVE TO PROVIDE AN INDIVIDUAL <span className="text-[#c5a059] ml-1"> APPROACH</span> TO EACH PROJECT
                        </h2>
                    </div>

                    <div className="relative space-y-4">
                        <div className="hidden lg:block absolute left-0 top-0 w-0.5 h-full bg-black/50 -ml-4" />
                        <div className="space-y-1 pl-0 md:pl-6">
                            <h4 className="text-sm font-semibold font-nexa uppercase text-gray-500">
                                INTERNATIONAL STANDARD
                            </h4>
                            <p className="text-gray-600 text-sm leading-relaxed font-light">
                                Every build meets the highest standards of craftsmanship
                                designed, engineered, and finished entirely in-house in Dubai.
                            </p>
                        </div>

                        <div className="space-y-1 pl-0 md:pl-6">
                            <h4 className="text-sm font-semibold font-nexa uppercase text-gray-500">
                                WORLDWIDE TRUSTED
                            </h4>
                            <p className="text-gray-600 text-sm leading-relaxed font-light">
                                Trusted by clients across the UAE, Saudi Arabia, Kuwait,
                                and beyond. Built in Dubai. Delivered worldwide.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative aspect-16/10 rounded-2xl overflow-hidden group shadow-lg">
                        <Image
                            src='/images/img343.webp'
                            alt="Luxury Interior Cockpit"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                    </div>

                    <div className="relative aspect-16/10 rounded-2xl overflow-hidden group shadow-lg">
                        <Image
                            src='/images/img241431.webp'
                            alt="Luxury Rear Seating"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                    </div>
                </div>
            </div>
        </section>
    );
}
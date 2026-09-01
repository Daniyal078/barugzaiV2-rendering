import React from 'react'
import GlobalHeroSection from '../components/GlobalHeroSection'
import Navbar from '../components/Navbar'
import Image from 'next/image'
import { getSeoData } from '@/lib/utils/getSeo'
import { Metadata } from 'next'

type FeatureItem = {
    text: string
}

export async function generateMetadata(): Promise<Metadata> {
    const currentSlug = '/about-us';

    const seo = await getSeoData(currentSlug);

    if (!seo) {
        return {
            title: "Barugzai Motors | Luxury VIP Vans Dubai",
            description: "Default premium car customization description.",
        };
    }

    return {
        title: seo.meta_title,
        description: seo.meta_description,
        keywords: seo.meta_keywords || undefined,
        alternates: {
            canonical: seo.canonical_url,
        },
        robots: seo.robots, openGraph: {
            title: seo.og_title || seo.meta_title,
            description: seo.og_description || seo.meta_description,
            type: seo.og_type || 'website',
            url: seo.canonical_url,
            images: seo.og_image ? [{ url: seo.og_image }] : undefined,
        },
    };
}

export default async function page() {
    const seo = await getSeoData('/about-us');
    const features: FeatureItem[] = [
        { text: "Wide Vehicle Selection" },
        { text: "24/7 Customer Support" },
        { text: "Customization Expertise" },
        { text: "Rigorous Quality Checks" },
        { text: "Global Export Services" },
        { text: "Luxury Aftersales Care" },
        { text: "Transparent Process" },
        { text: "Tailored Financing Options" },
    ];
    return (
        <>
            {seo?.schema_markup && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.schema_markup) }}
                />
            )}
            <Navbar />
            <GlobalHeroSection
                fullHeight={true}
                bg="/images/img43423.png"
                mobileBg="/images/img43423.png"
                title={'Crafted in Dubai | Desired Worldwide | Built by Barugzai'}
                subTitle={'Welcome to Barugzai Motors, where luxury is not just bought — it’s built.'}
                text={'We are the UAE’s leading manufacturer of custom-built VIP vans and high-performance lifestyle vehicles, engineered entirely in-house and proudly finished in Dubai. From V-Class and Sprinter conversions to fully personalized builds for celebrities, CEOs, and global collectors, every Barugzai vehicle is a statement of craftsmanship, innovation, and presence. Unlike traditional car traders or overseas converters, Barugzai designs, engineers, and hand-finishes each vehicle under one roof — maintaining full control over build quality, design integrity, warranty coverage, and after-sales support. This vertical approach allows us to consistently deliver OEM+ craftsmanship, region-specific engineering, and interiors that rival private jets.'} />


            <section className="bg-secondary text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-150 flex items-center">
                <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                    <div className="relative lg:col-span-6 group rounded-3xl overflow-hidden min-h-125 flex flex-col justify-center p-8 sm:p-12 border border-white/5 shadow-2xl">
                        <div className="absolute inset-0 z-0">
                            {/* <Image
                                src="/images/slider-image-1.png"
                                alt="Luxury Interior Background"
                                fill
                                className="object-cover opacity-30 group-hover:scale-105 transition-transform duration-700 ease-out"
                                priority
                            /> */}
                            <div className="absolute inset-0 bg-black/25" />
                        </div>

                        <div className="relative z-10 max-w-xl">
                            <p className="text-sm font-medium text-primary tracking-widest uppercase mb-4">
                                Barugzai Motors Experience
                            </p>
                            <h2 className="text-xl sm:text-2xl font-normal leading-relaxed text-slate-200 mb-8">
                                Whether it’s buying a luxury car or Maybach van or customizing it according to your preferences,
                                <span className="text-white font-semibold"> You can do it all at Barugzai Motors.</span>
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                                {features.map((feature, index) => (
                                    <div key={index} className="flex items-center space-x-3 group/item">
                                        <div className="shrink-0 w-5 h-5 rounded-full border border-white/30 flex items-center justify-center bg-white/5 group-hover/item:border-primary transition-colors">
                                            <svg
                                                className="w-3 h-3 text-primary opacity-80 group-hover/item:opacity-100"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={3}
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-sm font-medium text-slate-300 group-hover/item:text-white transition-colors">
                                            {feature.text}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:h-125 items-center mt-8 lg:mt-0">

                        <div className="relative h-100 lg:h-115 rounded-3xl overflow-hidden border border-white/10 shadow-xl lg:-rotate-2 hover:rotate-0 transition-all duration-500 ease-out group">
                            <Image
                                src="/images/BARUGZAI-deffender.png"
                                alt="Cyan Neon Premium Interior"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                        </div>

                        <div className="relative h-100 lg:h-107.5 rounded-3xl overflow-hidden border border-white/10 shadow-xl lg:rotate-2 lg:translate-y-4 hover:rotate-0 hover:translate-y-0 transition-all duration-500 ease-out group">
                            <Image
                                src="/images/img453523.png"
                                alt="Warm White Executive Interior"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-secondary/95 text-white md:py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">

                    {/* Top Minimal Header */}
                    <div className="mb-16 max-w-xl">
                        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
                            Company Pillars
                        </p>
                        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-100">
                            The foundation of everything we build at Barugzai Motors.
                        </h2>
                    </div>

                    {/* Flat Modern Split Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">

                        {/* Mission Block */}
                        <div className="space-y-4 border-l-2 border-primary/70 pl-6 hover:border-primary transition-colors duration-300">
                            {/* <div className="text-xs font-mono text-white/40">01 / FOCUS</div> */}
                            <h3 className="text-xl font-bold tracking-tight text-white">
                                Mission Statement
                            </h3>
                            <p className="text-white/70 font-light text-sm sm:text-base leading-relaxed">
                                To design, engineer, and deliver world-class custom vehicles — from VIP vans to high-performance builds — crafted in Dubai with uncompromising quality, tailored design, and global trust.
                            </p>
                        </div>

                        {/* Vision Block */}
                        <div className="space-y-4 border-l-2 border-primary/70 pl-6 hover:border-text-white/70 transition-colors duration-300">
                            {/* <div className="text-xs font-mono text-white/40">02 / HORIZON</div> */}
                            <h3 className="text-xl font-bold tracking-tight text-white">
                                Vision Statement
                            </h3>
                            <p className="text-white/70 font-light text-sm sm:text-base leading-relaxed">
                                To become the Middle East’s most respected name in bespoke automotive manufacturing — creating vehicles that redefine luxury, elevate performance, and set new global standards for craftsmanship and innovation.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

import React from 'react'
import Navbar from '../components/Navbar'
import GlobalHeroSection from '../components/GlobalHeroSection'
import HomeCTA from '../components/home/HomeCTA'
import ContactConversation from '../components/home/ContactConversation'
import UnitsInStock from '../components/v-class/UnitsInStock'
import Image from 'next/image'
import RevealAnimation from '../components/RevealAnimation'
import FAQ from '../components/FAQ'
import { Metadata } from 'next'
import { getSeoData } from '@/lib/utils/getSeo'

export async function generateMetadata(): Promise<Metadata> {
    const currentSlug = '/custom-luxury-suv-dubai';

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


export default async function page({ searchParams }: { searchParams: Promise<Record<string, string | string[]>> }) {
    const seo = await getSeoData('/custom-luxury-suv-dubai');
    const params = await searchParams;

    const query = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (typeof value === "string") {
            query.set(key, value);
        }
    });
    const isExpanded = params.read === "more";

    query.set(
        "read",
        isExpanded ? "less" : "more"
    );

    const VEHICLES_DATA = [
        {
            id: "lexus-l600",
            sectionId: "LEXUS-L600",
            titleHighlight: "LEXUS",
            title: "LX600",
            description:
                "Luxury reimagined by Barugzai — a bespoke LX600 featuring VIP Captain Seats, Alcantara Roof with Star Lights, Dual Entertainment Screens, Full Touchscreen Controls, Fridge, and Storage Console, crafted for unmatched comfort, elegance, and a premium VIP travel experience.",
            heroImage: "/images/suvs/img4323.png",
            galleryImages: [
                "/images/suvs/img323.png",
                "/images/suvs/img322314.png",
            ],
        },
        {
            id: "land-cruiser-lC300",
            sectionId: "land-cruiser-lC300",
            titleHighlight: "LAND CRUISER",
            title: "LC300",
            description:
                "Luxury reimagined by Barugzai — a bespoke LC300 featuring VIP Captain Seats, an Alcantara Roof with Star Lights, Full Touchscreen Controls, Ambient Lighting, Fridge, and Storage Console, crafted for exceptional comfort, elegance, and a premium VIP travel experience.",
            heroImage: "/images/suvs/img4532.png",
            galleryImages: [
                "/images/suvs/imgt3f3432.png",
                "/images/suvs/img3424.png",
            ],
        },
        {
            id: "cadillac-escalade",
            sectionId: "cadillac-escalade",
            titleHighlight: "NISSAN PATROL ",
            title: "WITH PARTITION",
            description:
                "Luxury reimagined by Barugzai — a bespoke Escalade featuring VIP Captain Seats, a Custom-Made Center Console, Fridge, Custom Carpeting, Alcantara Roof with Star Lights, and Premium Wooden Finishing, crafted for exceptional comfort, elegance, and a premium VIP travel experience.",
            heroImage: "/images/suvs/img321.png",
            galleryImages: [
                "/images/suvs/imgtqe3.png",
                "/images/suvs/imgt32343.png",
            ],
        },
        {
            id: "NISSAN-PETROL",
            sectionId: "NISSAN-PETROL",
            titleHighlight: "CADILLAC ",
            title: "ESCALADE",
            description:
                "Luxury reimagined by Barugzai — bespoke V-Class vehicles crafted for comfort, elegance, and a premium VIP travel experience.",
            heroImage: "/images/suvs/imgt322.png",
            galleryImages: [
                "/images/suvs/img3t232.png",
                "/images/suvs/imagt323.png",
            ],
        },
    ];

    const faqs = [
        {
            question: "Is it possible to customize the front and rear cabins on the Land Cruiser?",
            answer: "Yes, we can customize all of the interior cabin space, from the driver's controls to the second-row VIP seating. Come to Barugzai to build a Land Cruiser based around your particular use case.",
        },
        {
            question: "How long does it take to upgrade the Land Cruiser interior?",
            answer: "Timelines are dependent on the complexity of your chosen features. However, most projects are completed within 30 to 60 days.",
        },
        {
            question: "Is the customization meant for off-road use or just urban driving?",
            answer: "Absolutely, our interiors combine luxury with durability. We make them ideal for Dubai & African streets and rugged terrains.",
        },
        {
            question: "Do you have interior packages for the current Land Cruiser models (300 Series)?",
            answer: "Yes, we do. We customize the latest 300 Series as well as earlier Land Cruiser generations.",
        },
        {
            question: "Can you create an interior branding theme for corporate or personal use?",
            answer: "Definitely. We offer full personalization. This includes embroidered logos, custom color themes, and finishes that reflect your brand or lifestyle.",
        },
    ]

    return (
        <>
            {seo?.schema_markup && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.schema_markup) }}
                />
            )}
            <Navbar navLinks={
                [
                    { name: 'LEXUS l600', link: '#lexus-l600' },
                    { name: 'LAND CRUISER lC300', link: '#land-cruiser-lC300' },
                    { name: 'cadillac escalade', link: '#cadillac-escalade' },
                    { name: 'NISSAN PETROL WITH PARTITION', link: '#NISSAN-PETROL' },
                    { name: 'UNITS IN STOCK', link: '#UNITS-IN-STOCK' },
                    { name: 'Contact us', link: '#CONTACT-US' },
                ]
            }
            />
            <GlobalHeroSection bg="/images/suvs/imgt432.png" mobileBg="/images/suvs-mob.png" title={''} subTitle={''} text={''} fullHeight={false} />

            {/* <HummerEmbed /> */}
            {
                VEHICLES_DATA.map((vehicle) => (
                    <section
                        key={vehicle.id}
                        className="lg:py-20 py-10 bg-secondary space-y-10"
                        id={vehicle.sectionId}
                    >
                        <div className="max-w-7xl mx-auto px-6">
                            <div className="space-y-10">
                                <RevealAnimation
                                    duration={0.5}
                                    delay={0.2}
                                    className="text-center max-w-4xl flex flex-col items-center justify-center mx-auto"
                                >
                                    <div className="flex flex-col gap-5 items-center justify-start">
                                        <h2 className="text-3xl md:text-5xl font-nexa font-light uppercase text-white text-center">
                                            <span className="text-primary">
                                                {vehicle.titleHighlight}{" "}
                                            </span>
                                            {vehicle.title}
                                        </h2>

                                        <p className="text-white">
                                            {vehicle.description}
                                        </p>
                                    </div>
                                </RevealAnimation>

                                <RevealAnimation
                                    duration={0.5}
                                    delay={0.6}
                                    className="text-center max-w-7xl flex flex-col items-center justify-center mx-auto"
                                >
                                    <Image
                                        src={vehicle.heroImage}
                                        height={300}
                                        width={1000}
                                        alt={vehicle.title}
                                        className="w-full"
                                    />
                                </RevealAnimation>
                            </div>
                        </div>

                        <div className="flex md:flex-row flex-col w-full h-150">
                            {vehicle.galleryImages.map((image, imageIndex) => (
                                <div
                                    key={imageIndex}
                                    className={`relative ${vehicle.galleryImages.length === 1
                                        ? "w-full"
                                        : "md:w-1/2 md:h-full h-1/2"
                                        }`}
                                >
                                    <Image
                                        src={image}
                                        fill
                                        alt={`${vehicle.title}-${imageIndex + 1}`}
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </section>
                ))
            }

            <UnitsInStock
                secId={'UNITS-IN-STOCK'}
                vehicleTypes={
                    [
                        {
                            id: 1,
                            title: "LEXUS LX600",
                            image: '/images/suvs/img4323.png',
                            alt: "Mercedes-Benz V-Class",
                            url: '/cars-for-sale?manufacturer_ids=28&model_ids=59'
                        },
                        {
                            id: 2,
                            title: "LAND CRUISER LC300",
                            image: '/images/suvs/img4532.png',
                            alt: "Mercedes-Benz Sprinter",
                            url: '/cars-for-sale?manufacturer_ids=28&model_ids=58'
                        },
                        {
                            id: 3,
                            title: "NISSAN PATROL",
                            image: '/images/suvs/img321.png',
                            alt: "Toyota Hiace",
                            url: ''
                        },
                        {
                            id: 4,
                            title: "CADILLAC ESCALADE",
                            image: '/images/suvs/imgt322.png',
                            alt: "Toyota Hiace",
                            url: 'cars-for-sale?manufacturer_ids=28&model_ids=61'
                        },
                    ]
                }
            />
            <HomeCTA
                bg="/images/suvs/img4232.png"
                mobBg="/images/suv-mob.png"
                title={`<h2 class="text-2xl md:text-5xl font-light tracking-[0.2em] uppercase leading-tight">
                        YOUR LEGACY <span className="text-[#c5a059]">STARTS <br /> here</span>
                    </h2>`}
                SubTitle={`Every build is a reflection of who you are. Tell us your vision — we'll bring it to life.`}
            />
            <ContactConversation secId={'CONTACT-US'} />

            <FAQ
                subHeading={'Get answers to common questions about our custom Luxury SUV Dubai'}
                faqs={faqs} />
        </>
    )
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
} []
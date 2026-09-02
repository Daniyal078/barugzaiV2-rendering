import React from 'react'
import Navbar from '../components/Navbar'
import GlobalHeroSection from '../components/GlobalHeroSection'
import CarouselSection from '../components/v-class/CarouselSection'
import HomeCTA from '../components/home/HomeCTA'
import ContactConversation from '../components/home/ContactConversation'
import UnitsInStock from '../components/v-class/UnitsInStock'
import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import FAQ from '../components/FAQ'
import { getSeoData } from '@/lib/utils/getSeo'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
    const currentSlug = '/luxury-hiace-interior-modification-dubai';

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
    const seo = await getSeoData('/luxury-hiace-interior-modification-dubai');
    const params = await searchParams;

    const features = [
        { text: "VIP captain seats with integrated massage, cooling, and heating functions for ultimate comfort" },
        { text: "Upholstery in custom Italian Nappa leather with bespoke stitching options" },
        { text: "Ambient lighting, Rolls-Royce-inspired starlight roof, and Alcantara-wrapped ceiling panels" },
        { text: "Built-in dining/work tables, mini fridge, and espresso machine for convenience on the move" },
        { text: "Large smart TVs with YouTube, Netflix, and Amazon Prime access" },
        { text: "Premium sound systems with karaoke microphones and PlayStation 5 integration" },
        { text: "Privacy partition between the driver and passenger cabin for added exclusivity" },
        { text: "Central touchscreen tablet powered by Barugzai's smart interface to control lighting, media, and climate" },
    ];

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

    const faqs = [
        {
            question: "CaWhat sets your Hiace interior modifications apart from other custom shops in Dubai?",
            answer: "Whether you choose a fully custom-built interior or a pre-designed showroom model, at Barugzai you will use original materials including Italian Nappa leather, Swarovski crystals, and smart automation solutions. Custom or ready-made, the choice is yours. At Barugzai Motors, every van is built to deliver individuality, luxury, and unmatched comfort. Come to us and get your luxury Toyota Hiace modified interior Dubai.",
        },
        {
            question: "Can the Hiace be converted into a full VIP lounge for client transport?",
            answer: "Absolutely. We specialize in turning Toyota Hiace vans into luxury VIP lounges. We equipped them with plush seating, smart entertainment systems, privacy partitions, and business-ready features for high-end transport.",
        },
        {
            question: "Will modifying my Hiace affect its registration or warranty in the UAE?",
            answer: "No, it will not as our modification is in compliance with the UAE RTA, and we handle all of the paperwork for you, including the vehicle inspection, registration and insurance support; to make the process easy for you.",
        },
        {
            question: "Can I customize the ambient lighting, seating arrangements, and technical features according to my choice?",
            answer: "Yes, you can. From custom lighting moods and stitched logo leather to seating layouts and touchscreen smart controls. Your Hiace is tailored to match your style down to the finest detail.",
        },
        {
            question: "Do you provide ongoing support or upgrades for my vehicle after the modification is complete?",
            answer: "Yes, we do. You receive a 2-year warranty on Barugzai VIP Hiace interiors. We also offer optional upgrade packages and for service or additions post-build, our support staff is always available.",
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
                    { name: 'Barugzai Hiace', link: '#BARUGZAI-V-CLASS' },
                    { name: 'UNITS IN STOCK', link: '#UNITS-IN-STOCK' },
                    { name: 'CONTACT US', link: '#CONTACT-US' },
                ]
            }
            />
            <GlobalHeroSection bg="/images/hiace/img343224.png" mobileBg="/images/hiace-mob.png" title={''} subTitle={''} text={''} fullHeight={false} />
            {/* <VerticalStickySlider /> */}
            <section className='lg:py-20 py-10 bg-secondary space-y-10' id='LIMGENE-V-CLASS'>
                <div className='max-w-7xl mx-auto px-6'>
                    <div className="text-center space-y-5">
                        <div className='tracking-[5px] text-white md:text-4xl font-nexa text-2xl font-light'>BARUGZAI <span className='text-primary'>HIACE</span></div>
                        <p className="text-white max-w-3xl mx-auto">Elevating luxury with Barugzai — bespoke Toyota Hiace conversions crafted for exceptional comfort, premium interiors, and a refined VIP travel experience.</p>
                    </div>
                </div>
                {/* <Viewer360
                    imageSrc="/images/326d0a52829775.591de26d795e3.webp"
                    height="560px"
                /> */}

                <div>
                    <Image
                        src={'/images/imgt3234.png'}
                        alt={'hiace interior modification'}
                        width={1000}
                        height={500}
                        className='w-full'
                    />
                </div>

                <div className='max-w-7xl mx-auto px-6'>
                    <div className="grid md:grid-cols-2 space-y-10">
                        <div className="flex items-center justify-start">
                            <p className="text-white lg:text-4xl font-nexa text-2xl md:text-start text-center font-light leading-12">BARUGZAI HIACE
                                <br /> CRAFTED FOR VIP TRAVEL
                            </p>
                        </div>
                        <div>
                            <Image
                                src={'/images/02.webp'}
                                height={300}
                                width={500}
                                alt="v-class"
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section id='BARUGZAI-V-CLASS'>
                <CarouselSection
                    title={`BARUGZAI HIACE`}
                    subTitle={'Redefining executive travel with bespoke Hiace conversions, featuring luxury interiors, premium craftsmanship, and exceptional comfort for every journey.'}
                    galleryImages={
                        [
                            // { id: 1, src: "/images/hiace/imgertww.png" },
                            { id: 1, src: "/images/Slider-1.webp" },
                            { id: 2, src: "/images/slider-2.webp" },
                            { id: 3, src: "/images/Slider-3.webp" },
                        ]
                    }
                />
            </section >
            <section className="md:py-10 bg-secondary">
                <div className='max-w-7xl mx-auto px-6'>
                    <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-10 mt-10">
                        <div>
                            <Image
                                src={'/images/hiace/imgt32341.png'}
                                height={300}
                                width={500}
                                alt="v-class"
                                className="w-full"
                            />
                        </div>
                        <div className="flex items-center justify-center">
                            <p className="text-white lg:text-4xl text-2xl font-nexa md:text-start text-center font-light uppercase leading-12">
                                <span className='text-primary'>Elite Trust</span> - Verified by Royalty, CEOs and Global Collectors
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <UnitsInStock
                secId={'UNITS-IN-STOCK'}
                vehicleTypes={
                    [
                        {
                            id: 1,
                            title: "BARUGZAI HIACE",
                            image: '/images/hiace/t5wete.png',
                            alt: "Mercedes-Benz V-Class",
                            url: '/cars-for-sale?manufacturer_ids=8&model_ids=40'
                        },
                    ]
                }
            />
            <HomeCTA
                bg="/images/hiace/imgt3424.png"
                mobBg="/images/suv-mob.png"
                title={`<h2 class="text-2xl md:text-5xl font-light tracking-[0.2em] uppercase leading-tight">
                               YOUR LEGACY <span className="text-[#c5a059]">STARTS</span> <br />
                               <span class="block mt-2">HERE</span></h2>`}
                SubTitle={`Every build is a reflection of who you are. Tell us your vision — we'll bring it to life.`}
            />
            <ContactConversation secId={'CONTACT-US'} />
            <section>
                <section className='bg-secondary text-white overflow-hidden'>
                    <div className={`mx-auto max-w-7xl py-10 px-6 space-y-9 relative transition-opacity  duration-500 ${isExpanded ? "h-full" : "h-75"}`}>
                        <div className='space-y-4'>
                            <h1 className='md:text-4xl text-2xl capitalize'>VIP Toyota Hiace Manufactured in Dubai - Built by Barugzai</h1>
                        </div>
                        <div className='space-y-4'>
                            <p>Want to transform your Toyota Hiace into a true VIP experience on wheels? At Barugzai, we do exactly that. We manufacture custom luxury Hiace interiors in Dubai that offer sophistication, comfort, and innovation. Whether for personal or business use, every Barugzai Hiace is engineered to deliver prestige in every mile.</p>
                            <p>Our luxury Hiace interior modifications are built to reimagine what a van can be. We merge handcrafted detailing and smart tech. Thanks to our top-notch services you get executive-grade comfort at Barugzai.</p>
                            <p>At Barugzai, we specialize in creating custom luxury Hiace interiors in Dubai that elevate the everyday into the extraordinary. Each build is more than a modification. Barugzai‘s Hiace is designed around your lifestyle.</p>
                            <p>You get executive seating layouts, Italian leather finishes, smart technology and bespoke detailing. Each Barugzai Hiace reflects superior style, comfort, and functionality. Our interiors transform the Toyota Hiace into a true luxury vehicle for family travel, corporate transport, or VIP transfers.</p>
                            <p>Find out the options available to you by contacting us today. You will get the opportunity to see why Barugzai establishes the standard for customized luxury Hiace interiors in Dubai.</p>
                        </div>
                        <div className="w-full lg:w-10/12">
                            {/* Main Heading */}
                            <h2 className="text-2xl md:text-4xl text-white mb-6 leading-tight">
                                Custom VIP Modification Hiace Interior in Dubai - By Barugzai
                            </h2>

                            {/* Intro Paragraphs */}
                            <div className="space-y-6">
                                <p className="text-lg md:text-xl text-white/75 leading-relaxed">
                                    Every Hiace we build undergoes a meticulous design and engineering process. This way we ensure luxury and functionality. Our design makes no compromise when it comes to practicality or space. Your Hiace becomes an upscale and luxurious space.
                                </p>

                                <p className="text-lg md:text-xl text-white/75 leading-relaxed">
                                    Our VIP Modification for Hiace Interiors in Dubai Includes:</p>
                            </div>

                            {/* Features List */}
                            <ul className="p-0 my-8 space-y-4">
                                {features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-4 text-white">
                                        <CheckCircle2 />
                                        <span className="text-lg">{feature.text}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Footer Paragraphs */}
                            <div className="space-y-6">
                                <p className="text-lg md:text-xl text-white/75 leading-relaxed">
                                    At Barugzai Motors, we offer two paths to luxury. You can choose from our ready-made VIP Toyota Hiace builds or work with our team to design a fully personalized interior layout. You can reflect your lifestyle and showcase your brand identity. You can also enhance executive travel as every inch is tailored to you.
                                </p>
                            </div>
                        </div>
                        <div className="mb-8 lg:mb-12">
                            <h2 className="text-2xl md:text-4xl">
                                Providing Delivering Excellence Through The Barugzai Experience
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 gap-6">
                            <div className="space-y-6">
                                <p className="text-lg leading-relaxed">
                                    With decades of craftsmanship behind us, Barugzai’s engineers use only the highest-grade materials — from Italian Alcantara headliners and cashmere carpets to precision-molded side panels — transforming your Toyota Hiace into a true luxury suite on wheels.
                                </p>
                                <p className="text-lg leading-relaxed">Work with a brand-new or pre-owned Hiace. We offer complete conversions and modular upgrades. We offer options to suit every budget and requirement. Our approach is flexible and helps us to ensure that every client receives a bespoke interior experience. Connect with us today to get your luxury Toyota Hiace modified interior in Dubai.</p>
                            </div>
                        </div>
                        <div className="space-y-5">
                            <h2 className="md:text-4xl text-2xl">Trusted Luxury Hiace Interior in Dubai - Redefined by Barugzai</h2>
                            <div className='space-y-6'>
                                <p>
                                    Every Barugzai Hiace conversion is covered by a 2-year interior warranty, providing peace of mind for every trip. We‘re also able to provide lease-to-own options and financing through the best banks in the UAE. Our team takes care of everything from vehicle insurance to registration, so all you have to do is enjoy your custom-designed VIP van.
                                </p>
                                <p>
                                    Barugzai Motors has been honored to serve a range of clientele. Including executive contracts, tour operators, VIP families, and private collectors, our vehicles can be seen throughout Dubai, the UAE, Saudi Arabia, Ghana, Nigeria, and Congo — we are proud to redefine travelling in comfort and style.
                                </p>
                            </div>
                        </div>
                        {!isExpanded ?
                            <div className='w-full max-w-7xl h-52 bg-linear-to-t from-secondary to-transparent absolute left-0 bottom-0'></div> : ''
                        }
                    </div>
                </section>
                <div className='bg-secondary'>
                    <div className='mx-auto max-w-7xl px-6 relative'>
                        <Link href={`?${query.toString()}`} scroll={false} className='bg-secondary border hover:border-primary hover:text-primary cursor-pointer uppercase tracking-[5px] text-white/70 px-7 py-4 rounded-lg hover:scale-105 duration-300'>{isExpanded ? "Read less" : "Read more"} </Link>
                    </div>
                </div>
            </section>
            <FAQ
                subHeading={'Get answers to common questions about our custom Luxury hiace modification Dubai'}
                faqs={faqs} />
        </>
    )
}
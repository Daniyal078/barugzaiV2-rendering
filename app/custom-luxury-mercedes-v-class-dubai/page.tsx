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
import RevealAnimation from '../components/RevealAnimation'
import FAQ from '../components/FAQ'
import { getSeoData } from '@/lib/utils/getSeo'
import { Metadata } from 'next'


export async function generateMetadata(): Promise<Metadata> {
    const currentSlug = '/custom-luxury-mercedes-v-class-dubai';
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
    const seo = await getSeoData('/custom-luxury-mercedes-v-class-dubai');
    const params = await searchParams;

    const features = [
        { text: "VIP chairs with ergonomic styling and integrated massage, cooling, and heating functions for passenger comfort." },
        { text: "Upholstered in Premium Italian Nappa leather. Bespoke stitching and a range of custom color options to suit your style." },
        { text: "Elegantly upholstered Italian Alcantara fabric with Rolls-Royce-inspired starlight headliner with ambient warm lighting for a luxurious cabin experience." },
        { text: "Discreet Maybach-style executive fold-out table for in-motion productivity or mealtime , coupled with a mini fridge and installed espresso maker." },
        { text: "Ultra-clear smart entertainment screens, preloaded with Netflix, YouTube, and Amazon Prime Video for a cinematic experience in-transit." },
        { text: "Immersive surround sound systems, equipped with karaoke mics and a PlayStation 5 for unlimited in-transit enjoyment." },
        { text: "Driver-passenger separation for added privacy. iPad-based control with Barugzai’s custom software interface to control all the features in the vehicle." },
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
            question: "What distinguishes your V-Class from other luxury vans in Dubai?",
            answer: "At Barugzai Motors, we offer smart controls, immersive multimedia, and ultra-comfortable seating — all tailored to your needs. You also get a custom luxury Mercedes V-Class price in Dubai that reflects real value and aligns with your exact build specifications.",
        },
        {
            question: "What is the price of a custom luxury Mercedes V-Class in Dubai?",
            answer: "Pricing depends on the features and configurations you choose. If you re exploring a custom Mercedes V Class for sale, including lease- to - own options, contact our team directly for an accurate quote",
        },
        {
            question: "Do you offer showroom tours or test drives?",
            answer: "Yes, we highly recommend visiting our showroom. It's the best way to experience the seating, materials, and technology first-hand before making a decision.",
        },
        {
            question: "Are there entertainment features in your custom V-Class vans?",
            answer: "Yes — our vans feature world-class entertainment, ambient lighting, and executive seating, making them perfect for business or leisure. Want to explore your options? Contact us and get a custom luxury Mercedes V-Class price in Dubai.",
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
                    { name: 'LIMGENE V CLASS', link: '#LIMGENE-V-CLASS' },
                    { name: 'BARUGZAI V CLASS', link: '#BARUGZAI-V-CLASS' },
                    { name: 'UNITS IN STOCK', link: '#UNITS-IN-STOCK' },
                    { name: 'CONTACT US', link: '#CONTACT-US' },
                ]
            }
            />
            <GlobalHeroSection bg="/images/bg423.webp" mobileBg="/images/v-class-2.png" title={''} subTitle={''} text={''} fullHeight={false} />
            {/* <VerticalStickySlider /> */}
            <section className='lg:py-20 py-10 bg-secondary space-y-10' id='LIMGENE-V-CLASS'>
                <div className='max-w-7xl mx-auto px-6'>
                    <div className="text-center space-y-5">
                        <RevealAnimation
                            key={1}
                            duration={0.5}
                            delay={0.2}
                            className="text-center max-w-4xl flex flex-col items-center justify-center mx-auto"
                        >
                            <div className='tracking-[5px] text-white md:text-4xl font-nexa text-2xl font-light'>LIMGENE <span className='text-primary'>V CLASS</span></div>
                        </RevealAnimation>
                        <RevealAnimation
                            key={2}
                            duration={0.5}
                            delay={0.5}
                            className="text-center max-w-4xl flex flex-col items-center justify-center mx-auto"
                        >
                            <p className="text-white max-w-3xl mx-auto">Elevating luxury with Limgene — bespoke V-Class models (Prestige, Magellan, Venum) crafted for elegance, comfort, and a premium VIP experience.</p>
                        </RevealAnimation>
                    </div>
                </div>
                {/* <Viewer360
                    imageSrc="/images/326d0a52829775.591de26d795e3.webp"
                    height="560px"
                /> */}

                <div>
                    <Image
                        src={'/images/bg-45243.webp'}
                        alt={'mercedes v-class'}
                        width={1000}
                        height={500}
                        className='w-full'
                    />
                </div>
                <div className='max-w-7xl mx-auto px-6'>
                    <div className="grid md:grid-cols-2 space-y-10">
                        <RevealAnimation
                            key={1}
                            duration={0.5}
                            delay={0.2}
                            className="text-center max-w-4xl flex flex-col items-center justify-center mx-auto"
                        >
                            <div className="flex items-center justify-start">
                                <p className="text-white lg:text-4xl text-2xl font-nexa md:text-start text-center font-light leading-12">LIMGENE MAGELLAN V-CLASS <br /> BUILT  FOR LUXURY</p>
                            </div>
                        </RevealAnimation>
                        <div>
                            <RevealAnimation
                                key={2}
                                duration={0.5}
                                delay={0.6}
                                className="text-center max-w-4xl flex flex-col items-center justify-center mx-auto"
                            >
                                <Image
                                    src={'/images/img3442.webp'}
                                    height={300}
                                    width={500}
                                    alt="v-class"
                                    className="w-full"
                                />
                            </RevealAnimation>
                        </div>
                    </div>
                </div>
            </section>
            <section id='BARUGZAI-V-CLASS'>
                <CarouselSection
                    title={`BARUGZAI V CLASS`}
                    subTitle={'Redefining luxury with Barugzai — bespoke V-Class conversions crafted for elegance, comfort, and an exceptional VIP travel experience.'}
                    galleryImages={
                        [
                            { id: 1, src: "/images/slider-image-1.png" },
                            { id: 2, src: "/images/slider-image-2.png" },
                            { id: 3, src: "/images/slider-image-3.png" },
                            // { id: 4, src: "/images/slider-image-4.png" },
                        ]
                    }
                />
            </section >
            <section className="md:py-10 bg-secondary">
                <div className='max-w-7xl mx-auto px-6'>
                    <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-10 mt-10">
                        <div>
                            <RevealAnimation
                                key={1}
                                duration={0.5}
                                delay={0.2}
                                className="text-center max-w-4xl flex flex-col items-center justify-center mx-auto"
                            >
                                <Image
                                    src={'/images/img3423.webp'}
                                    height={300}
                                    width={500}
                                    alt="v-class"
                                    className="w-full"
                                />
                            </RevealAnimation>
                        </div>
                        <div className="flex items-center justify-center">
                            <RevealAnimation
                                key={1}
                                duration={0.5}
                                delay={0.5}
                                className="text-center max-w-4xl flex flex-col items-center justify-center mx-auto"
                            >
                                <p className="text-white lg:text-4xl text-2xl font-nexa md:text-start text-center font-light uppercase leading-12">
                                    <span className='text-primary'>Elite Trust</span> - Verified by Royalty, CEOs and Global Collectors
                                </p>
                            </RevealAnimation>
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
                            title: "STANDARD V CLASS",
                            image: '/images/img345.png',
                            alt: "Mercedes-Benz V-Class",
                            url: '/cars-for-sale?manufacturer_ids=7&model_ids=8'
                        },
                        {
                            id: 2,
                            title: "BURUGZAI V CLASS",
                            image: '/images/img233423.png',
                            alt: "Mercedes-Benz Sprinter",
                            url: '/cars-for-sale?manufacturer_ids=7&model_ids=47'
                        },
                        {
                            id: 3,
                            title: "LIMGENE V CLASS",
                            image: '/images/img3432.png',
                            alt: "Toyota Hiace",
                            url: '/cars-for-sale?manufacturer_ids=7&model_ids=45'
                        },
                    ]
                }
            />
            <HomeCTA
                bg="/images/bg-t4r3453.webp"
                mobBg="/images/v-class-2.png"
                title={`<h2 class="text-2xl md:text-5xl font-light tracking-[0.2em] uppercase leading-tight">
                        YOUR LEGACY <span className="text-[#c5a059]">STARTS</span>
                        <br />
                        <span class="block mt-2">HERE</span>
                    </h2>`}
                SubTitle={`Every build is a reflection of who you are. Tell us your vision — we'll bring it to life.`}
            />
            <ContactConversation secId={'CONTACT-US'} />
            <section>
                <section className='bg-secondary text-white overflow-hidden'>
                    <div className={`mx-auto max-w-7xl py-10 px-6 space-y-9 relative transition-opacity  duration-500 ${isExpanded ? "h-full" : "h-75"}`}>
                        <div className='space-y-4'>
                            <h1 className='md:text-4xl text-2xl capitalize'>Buy Custom Luxury Mercedes V-Class In Dubai</h1>
                            <p>Get a vehicle that brings elegance, comfort, and performance. Discover our Limgene Defender vans for sale in Dubai.</p>
                        </div>
                        <div className='space-y-4'>
                            <p>Get a vehicle that brings elegance, comfort, and performance. Discover our custom luxury Mercedes V-Class vans for sale in Dubai. Want to buy a custom luxury Mercedes V-Class in Dubai? Barugzai Motors is the perfect destination for Dubai built V-Class conversions that offer beauty, innovation and a VIP style of travel.</p>
                            <p>Experience a vehicle that reimagines your idea of elegance, comfort, and performance. View our customized luxury Mercedes V-Class vans to offer for sale in Dubai use, created by us with love and customized to your life. With Barugzai, you do more than just traveling from point A to point B - you arrive in style, enjoying the luxury of you.</p>
                            <p>If you want to buy a custom luxury Mercedes V-Class in Dubai, Barugzai Motors is the trusted source for Dubai delivered conversions that combine beauty, innovation, and a true VIP experience.</p>
                        </div>
                        <div className='space-y-4'>
                            <h2 className='md:text-4xl text-2xl'>Your Destination for Custom Luxury Mercedes V-Class in Dubai — Barugzai Motors</h2>

                            <p>Experience handcrafted elegance. Every Barugzai V-Class has been built in Dubai and is made to make a statement to enhance your travel lifestyle. You can finally get a custom luxury Mercedes-Benz V-Class in Dubai, from Barugzai Motors.</p>

                            <p>Built for families, executives, and business travelers who demand more, our V-Class conversions are crafted with exacting precision — engineered to reflect your vision, lifestyle, and performance standards. All of this allows Barugzai to offer the best custom luxury Mercedes V-Class in Dubai.</p>
                        </div>
                        <div className="w-full lg:w-10/12">
                            {/* Main Heading */}
                            <h2 className="text-2xl md:text-4xl text-white mb-6 leading-tight">
                                VIP V-Class modification in Dubai by Barugzai
                            </h2>

                            {/* Intro Paragraphs */}
                            <div className="space-y-6">
                                <p className="text-lg md:text-xl text-white/75 leading-relaxed">
                                    At <strong className="text-white">Barugzai Motors,</strong> every VIP{" "}
                                    <strong className="text-white">Mercedes-Benz V-Class</strong> is custom-built to deliver a one-of-a-kind luxury experience.
                                </p>

                                <p className="text-lg md:text-xl text-white/75 leading-relaxed">
                                    Choose from <strong className="text-white">4 signature seating configurations</strong>—from spacious 8-seaters to ultra-exclusive 4-seater VIP layouts—or request a fully bespoke build, tailored to your taste.
                                </p>

                                <p className="text-lg md:text-xl text-white/75 leading-relaxed">
                                    Unlike other showrooms importing modified vans from{" "}
                                    <strong className="text-white">Turkey or China,</strong> our{" "}
                                    <strong className="text-white">V-Class conversions are engineered and manufactured in Dubai.</strong>{" "}
                                    It allows us to maintain complete control over{" "}
                                    <strong className="text-white">design, quality, warranty, and after-sales support.</strong>{" "}
                                    Our customization can include:
                                </p>
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
                                    These features turn your V-Class into a luxury mobile office, a private lounge, or a tech-enabled family cocoon. Get all such exceptional features by opting for a{" "}
                                    <strong className="text-white">custom luxury V Class van available for sale in Dubai.</strong>
                                </p>

                                <p className="text-lg md:text-xl text-white/75 leading-relaxed">
                                    Looking for a <strong className="text-white">custom luxury V Class van for sale in Dubai?</strong>{" "}
                                    Barugzai Motors offers fully tailored V-Class conversions designed and manufactured in the UAE. Book a test drive or consultation today and experience unmatched luxury on wheels.
                                </p>
                            </div>
                        </div>
                        <div className="mb-8 lg:mb-12">
                            <h2 className="text-2xl md:text-4xl">
                                High Quality Custom Luxury V-Class Vans For Sale in Dubai
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 gap-6">
                            <div className="space-y-6">
                                <p className="text-lg leading-relaxed">
                                    With over 25 years of experience in crafting luxury vehicle interiors,{" "}
                                    <strong className="text-gray-300 font-bold">Barugzai Motors</strong>{" "}
                                    proudly offers premium V-Class vans built to the highest standards. Each
                                    van is a showcase of quality materials and advanced design thinking.
                                    Whether it&apos;s black cashmere carpets or precision-molded plastic
                                    sidewalls, we pay attention to every detail — ensuring your vehicle
                                    reflects elegance and durability at every level.
                                </p>

                                <p className="text-lg leading-relaxed">
                                    Every Barugzai VIP interior comes with a{" "}
                                    <span className="text-gray-300 font-semibold underline decoration-gray-300 underline-offset-4">
                                        2-year warranty
                                    </span>{" "}
                                    — whether you&apos;re buying brand new or pre-owned. Our{" "}
                                    <strong className="text-gray-300">luxury V-Class vans in Dubai</strong>{" "}
                                    are trusted by discerning customers who demand both performance and
                                    style.
                                </p>

                                <p className="text-lg leading-relaxed italic border-l-4 border-gray-300 pl-4 py-1">
                                    <strong className="text-gray-300">
                                        Visit Barugzai Motors in Ras Al Khor today or contact our team to
                                        schedule a private viewing.
                                    </strong>{" "}
                                    Our next <strong className="text-gray-300">custom V-class van for sale in Dubai</strong> is ready and waiting.
                                </p>
                            </div>
                        </div>
                        <div className="space-y-5">
                            <h2 className="md:text-4xl text-2xl">
                                Custom V-Class Van for Sale in Dubai – Built Around You</h2>
                            <div className='space-y-6'>
                                <p>
                                    At Barugzai Motors, we offer custom Mercedes V-Class models — including the Viano, V250, V300, and Vito Tourer — for sale in Dubai, all of which can be tailored to your taste. Choose from our premium ready-to-drive options or design a unique custom build that reflects your lifestyle and personality.
                                </p>
                                <p>
                                    Delivery times typically range from 30 to 60 days depending on selected features. We assist with registration, insurance, passing, and even provide lease-to-own options to make your purchase smoother.
                                </p>
                                <p>
                                    So whether you&apos;re looking for luxury, utility, or both — explore custom V-Class van options in Dubai with Barugzai Motors.
                                </p>
                                <p>
                                    And yes, we proudly serve customers across the UAE, as well as in Saudi Arabia, Nigeria, Ghana, and Congo.
                                </p>
                            </div>
                        </div>
                        {!isExpanded ?
                            <div className='w-full max-w-7xl h-50 bg-linear-to-t from-secondary to-transparent absolute left-0 bottom-0'></div> : ''
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
                subHeading={'Get answers to common questions about our custom Luxury Mercedes v-class Dubai'}
                faqs={faqs} />
        </>
    )
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
} []
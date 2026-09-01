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
    const currentSlug = '/custom-defender-dubai';
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
    const seo = await getSeoData('/custom-defender-dubai');
    const params = await searchParams;

    const features = [
        { text: "Tailor - made wide - body arch kits for a menacing stance and aggressive styling." },
        { text: "Performance tires with upgraded symmetrical forged Barugzai alloy wheels made for on and off - road capability." },
        { text: "Lightweight strength and uncompromised rigidity with dry carbon fiber monocoque." },
        { text: "Durable alloy skeleton components for strength and stability." },
        { text: "Composite metal working techniques that combine finishing with craftsmanship." },
        { text: "Molten sculpted carbon fiber body panels and aerodynamic additions for a bold, modern aesthetic." },
        { text: "Luxury quilted leather hand - stitched interiors with Alcantara and custom stitching." },
        { text: "Thematic artistry seats designed for ultimate comfort, while showcasing strong branding." },
        { text: "Thematic artistry interior trims featuring engraved metal details and custom paneling." },
        { text: "Thematic artistry starlight headliner for a starry appearance in the cabin." },
        { text: "Durable alloys provided for handle and armrest kits with a feel of superior quality." },
        { text: "Custom interior accessories for added functional elegance involve your taste." },
        { text: "Premium paint applications in satin, matte, two - tone, or raw material, hand - applied." },
        { text: "Exclusive edition badges that frame exclusive identify yet support your expression." },
        { text: "Side window trim panels themed by British culture(Genesis Edition)." },
        { text: "PLUMB co - branded kits that successfully combine heritage craftsmanship and modern expression." },
        { text: "Falcon Edition, inspired by global off - road journeys, influenced by Camel Trophy." },
        { text: "Genesis Edition design is inspired by the Land Rover Series III County Station Wagon, which features unique trims and badges." },
        { text: "Performance - focused upgrades, including tuned exhaust systems, upgraded suspension systems, and precision brake upgrades." },
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
            question: "Can I customize my own Land Rover Defender with Barugzai?",
            answer: "Yes, you are able to do that. From classic Defender’s to the new Defender 90, 110 or 130, we are able to customize your vehicle to Barugzai standards – you can also source the vehicle from us if you want a complete turnkey sitting.",
        },
        {
            question: "Are Limgene Defender modifications by Barugzai RTA approved in Dubai?",
            answer: "Yes, every modification Barugzai makes is designed and installed in accordance with UAE RTA Regulations. We even do all the inspections, registrations and certifications for all our customers.",
        },
        {
            question: "How is a Barugzai Defender unique compared to other modified Defenders in the market?",
            answer: "A Barugzai Defender is not just about visual upgrades. We will add aero dynamic body work, bespoke interiors, smart tech or performance tuning to our Defenders - all made in-house. Furthermore, our body kits are only available from Barugzai, and not available anywhere in the world.",
        },
        {
            question: "How long does it take to build a Limgene Defender by Barugzai?",
            answer: "The turnaround will be facilitated by the level of customized work required, but a 'full conversion' generally takes twelve to sixteen weeks. We will provide you your timeline in advance, and we will always provide reports showing progress, and a virtual walkthrough when done. Contact us today for more information on Limgene Defender in Dubai.",
        },
        {
            question: "Is the Limgene Custom Defender by Barugzai appropriate for daily use in Dubai?",
            answer: "Yes. The Limgene Custom Defender by Barugzai exhibits unique artistry, carbon fiber craftsmanship, and luxurious personalized touches. It is engineered to keep the Defender’s core functionality and reliability intact. With enhanced suspension tuning capabilities, performance tires, and precision components, all attributes that make the Defender great on a variety of urban roads, it is still ready for off-road desert use as well. This is a lifestyle vehicle that you can drive every day without sacrificing comfort or capability.",
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
                    { name: 'Limgene Defender', link: '#Limgene-Defender' },
                    { name: 'Falcon Edition', link: '#Falcon-Edition' },
                    { name: 'UNITS IN STOCK', link: '#UNITS-IN-STOCK' },
                    { name: 'CONTACT US', link: '#CONTACT-US' },
                ]
            }
            />
            <GlobalHeroSection bg="/images/defender.png" mobileBg="/images/defeneder-mob.png" title={''} subTitle={''} text={''} fullHeight={false} />
            {/* <VerticalStickySlider /> */}
            <section className='lg:py-20 py-10 bg-secondary space-y-10' id='Limgene-Defender'>
                <div className='max-w-7xl mx-auto px-6'>
                    <div className="text-center space-y-5">
                        <div className='tracking-[5px] text-white md:text-4xl font-nexa uppercase text-2xl font-light'>LIMGENE <span className='text-primary'>Defender</span></div>
                        <p className="text-white max-w-3xl mx-auto">Elevating every journey with bespoke Defender models tailored for luxury, sophistication, and a first-class driving experience.</p>
                    </div>
                </div>
                {/* <Viewer360
                    imageSrc="/images/326d0a52829775.591de26d795e3.webp"
                    height="560px"
                /> */}

                <div>
                    <Image
                        src={'/images/Defender-2nd-banner.png'}
                        alt={'Defender'}
                        width={1000}
                        height={1000}
                        className='w-full'
                    />
                </div>

                <div className='max-w-7xl mx-auto px-6'>
                    <div className="grid md:grid-cols-2 space-y-10">
                        <div className="flex items-center justify-start">
                            <p className="text-white lg:text-4xl font-nexa text-2xl md:text-start text-center font-light leading-12">LIMGENE DEFENDER FALCON EDITION <br />
                                REDEFINING LUXURY OFF-ROAD</p>
                        </div>
                        <div>
                            <Image
                                src={'/images/BARUGZAI-deffender.png'}
                                height={300}
                                width={500}
                                alt="v-class"
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section id='Falcon-Edition'>
                <CarouselSection
                    title={`BARUGZAI presents DEFENDER FALCON EDITION`}
                    subTitle={'A bespoke luxury Defender designed for power, exclusivity, and unparalleled comfort, delivering a first-class driving experience on every journey.'}
                    galleryImages={
                        [
                            { id: 1, src: "/images/img435.png" },
                            { id: 2, src: "/images/img53244.jpg" },
                            { id: 3, src: "/images/imgr323423.jpg" },
                            { id: 4, src: "/images/img324.jpg" },
                        ]
                    }
                />
            </section>
            <section className="md:py-10 bg-secondary">
                <div className='max-w-7xl mx-auto px-6 mt-10'>
                    <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-10 mt-10">
                        <div>
                            <Image
                                src={'/images/Elite-Trust-Verified-by-Royalty.png'}
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
                            id: 2,
                            title: "Falcon Edition",
                            image: '/images/img435.png',
                            alt: "Mercedes-Benz Sprinter",
                            url: '/cars-for-sale?manufacturer_ids=11&model_ids=46'
                        },
                    ]
                }
            />
            <HomeCTA
                bg="/images/bg-t4r3453.webp"
                mobBg="/images/defender-mob-bg.png"
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
                            <h1 className='md:text-4xl text-2xl capitalize'>Limgene Defender for sale in Dubai</h1>
                            <p>Get a vehicle that brings elegance, comfort, and performance. Discover our Limgene Defender vans for sale in Dubai.</p>
                        </div>
                        <div className='space-y-4'>
                            <p>If you want a modified Land Rover Defender in Dubai that will make a statement with style and performance, Barugzai Motors is capable of turning the classic Defender into a statement of individuality. Burugzai Motors offer Limgene custom Land Rover Defender builds in Dubai, that perfectly combines British ruggedness with the unmistakable Barugzai style.</p>
                            <p>Or If you are seeking a custom Defender for off-road adventuring, or a show-stopping urban vehicle, Barugzai can deliver a build compatible with your lifestyle. Every Limgene Defender by Barugzai build is engineered for presence, luxury, and capability to suit Dubai&apos;s unique environments and very high standards.</p>
                        </div>
                        <div className='space-y-4'>
                            <h2 className='md:text-4xl text-2xl'>Custom Land Rover Defender in Dubai – Built Around You</h2>

                            <p>At Barugzai we don&apos;t just modify vehicles, we are redefining vehicles. Our custom Limgene defender in Dubai conversions are all designed with high end materials, statement styling options, and power enhancing modifications.</p>

                            <p> You won&apos;t simply own a Defender, you will own a Barugzai Defender designed uniquely for you. Connect with us today and get your Limgene custom Land Rover Defender in Dubai by Barugzai to drive in luxury and style.</p>
                        </div>
                        <div className="w-full lg:w-10/12">
                            {/* Main Heading */}
                            <h2 className="text-2xl md:text-4xl text-white mb-6 leading-tight">
                                Features Of Custom Limgene Defender in Dubai - By Barugzai
                            </h2>

                            {/* Features List */}
                            <ul className="p-0 my-8 space-y-4">
                                {features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-4 text-white">
                                        <CheckCircle2 />
                                        <span className="text-lg">{feature.text}</span>
                                    </li>
                                ))}

                                <li>Our highly skilled team uses advanced manufacturing techniques. We maintain the working functionality of the Defender while elevating luxury and power to a whole new level.</li>
                            </ul>

                        </div>
                        <div className="mb-8 lg:mb-12">
                            <h2 className="text-2xl md:text-4xl">
                                Custom Defender for Sale in Dubai - by Barugzai
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 gap-6">
                            <div className="space-y-6">
                                <p className="text-lg leading-relaxed">
                                    Do you have something specific in mind? Work with our design team to help you bring that moment to life. We can start with the new Defender 90, or the Defender 110, or even a classic Defender chassis. Whatever your vision for a custom Defender build, Barugzai has the perfect custom Defender for sale in Dubai, down to every stitch and spec.
                                </p>
                                <p className="text-lg leading-relaxed">
                                    Using bright colors and a vibrant design or a mix of shades, combined with impressive body kits, made-to-order interiors and performance kits, we tell your unique story to reflect you, your life and your passion. Our custom team will take the hassle out of the process, from start to finish, whether it is escalation sourcing, modifications, testing or RTA compliance.
                                </p>
                            </div>
                        </div>
                        <div className="space-y-5">
                            <h2 className="md:text-4xl text-2xl">Modified Defender for Sale in Dubai – By Barugzai</h2>
                            <div className='space-y-6'>
                                <p>
                                    If you are interested in a modified Defender for sale in Dubai, Barugzai has a small selection of ready-built Defenders available for immediate sale.
                                </p>
                                <p>
                                    These Defenders have the highest requested upgrades and have some original trim options, along with full UAE road certification.
                                </p>
                                <p>
                                    All vehicles are thoroughly checked, performance tuned, and detailed for your convenience. All of our Limgene Defender for sale in Dubai are not just modified defenders, they are one-off vehicles crafted for the enthusiast of performance and design.

                                </p>
                            </div>
                        </div>
                        <div className="space-y-5">
                            <h3 className="md:text-4xl text-2xl">Barugzai Defender for Sale in Dubai - Where Craftsmanship and Performance Unites</h3>
                            <div className='space-y-6'>
                                <p>
                                    Do you have something specific in mind? Work with our design team to help you bring that moment to life. We can start with the new Defender 90, or the Defender 110, or even a classic Defender chassis. Whatever your vision for a custom Defender build, Barugzai has the perfect custom Defender for sale in Dubai, down to every stitch and spec.
                                </p>
                                <p>
                                    Using bright colors and a vibrant design or a mix of shades, combined with impressive body kits, made-to-order interiors and performance kits, we tell your unique story to reflect you, your life and your passion. Our custom team will take the hassle out of the process, from start to finish, whether it is escalation sourcing, modifications, testing or RTA compliance.
                                </p>
                                <p>
                                    A Barugzai Defender is more than a mere luxury SUV - it provides your identity and innovation. Designed for those who need statement, performance, and prestige, our Defenders demand to be noticed. Barugzai is quickly becoming synonymous with custom luxury vehicle manufacturing.
                                </p>
                            </div>
                        </div>
                        <div className="space-y-5">
                            <h2 className="md:text-4xl text-2xl">Why Choose Limgene Defender in Dubai By Barugzai?</h2>
                            <div className='space-y-6'>
                                <ul>
                                    <li>In-house design, body kits and customization</li>
                                    <li>RTA compliant modifications & paperwork handled</li>
                                    <li>Financing and lease-to-own options available</li>
                                    <li>2 Year warranty on all interior and exterior modifications</li>
                                    <li>Export ready builds available for international clients</li>
                                </ul>
                            </div>
                            <h2 className="md:text-4xl text-2xl">Start Your Custom Defender Build Today</h2>
                            <div className='space-y-6'>
                                <p>
                                    Discover the ultimate Barugzai Defender for sale in Dubai, ready to turn heads on every road. Get in touch with us today to learn more about our current inventory or to begin your bespoke Defender build with our team.


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
                subHeading={'Get answers to common questions about our custom defender dubai'}
                faqs={faqs} />
        </>
    )
}
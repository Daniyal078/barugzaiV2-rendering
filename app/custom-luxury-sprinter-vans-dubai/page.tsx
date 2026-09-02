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
    const currentSlug = '/custom-luxury-sprinter-vans-dubai';

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
    const seo = await getSeoData('/custom-luxury-sprinter-vans-dubai');
    const params = await searchParams;

    const features = [
        { text: "Italian Nappa leather seating with massage, heating, and cooling functionality" },
        { text: "Swarovski crystal roof lighting, ambient LEDs, or even skylights" },
        { text: "Onboard coffee machine, mini fridge, and shisha system" },
        { text: "Ultra-HD smart displays with access to Netflix, YouTube, and Amazon Prime" },
        { text: "Exclusive PS5 gaming system, karaoke mics, cinema sound system" },
        { text: "Custom flooring, side panels, and fold-out tables designed for entrance, dining, or workspace use." },
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
            question: "Can I pick which interior features I want in my Sprinter van?",
            answer: "Yes, you can. We have multiple interior configurations to select from. You can add as many custom features that you want. From styles of leather stitching, to integrated entertainment systems, you can customize every aspect to suit your needs.",
        },
        {
            question: "How long does customizing a luxury Sprinter take?",
            answer: "Typically we need an average of 60-120 days to customize your order. The exact timeline depends on your interior features.",
        },
        {
            question: "Do your vans have a warranty?",
            answer: "Yes, all of our vans have a warranty. Our VIP luxury interiors come with a 2-year interior warranty.",
        },
        {
            question: "Do you have financing or lease options?",
            answer: "Yes, we do. We offer lease-to-own programs and finance through top banks in the UAE. Call us and learn about the custom luxury Mercedes sprinter price in Dubai.",
        },
        {
            question: "Can I see examples of previous custom Sprinter vans?",
            answer: "Yes, you can check out visual case studies, videos, and full previews at our Ras Al Khor showroom.",
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
                    { name: 'BARUGZAI sprinter', link: '#BARUGZAI-V-CLASS' },
                    { name: 'UNITS IN STOCK', link: '#UNITS-IN-STOCK' },
                    { name: 'CONTACT US', link: '#CONTACT-US' },
                ]
            }
            />
            <GlobalHeroSection bg="/images/img43423.png" mobileBg="/images/sprinter-mob.png" title={''} subTitle={''} text={''} fullHeight={false} />
            {/* <VerticalStickySlider /> */}
            <section className='lg:py-20 py-10 bg-secondary space-y-10' id='LIMGENE-V-CLASS'>
                <div className='max-w-7xl mx-auto px-6'>
                    <div className="text-center space-y-5">
                        <div className='tracking-[5px] text-white font-nexa md:text-4xl text-2xl font-light'>BARUGZAI <span className='text-primary'>SPRINTER</span></div>
                        <p className="text-white max-w-3xl mx-auto">Elevating luxury with Barugzai — bespoke Sprinter vehicles crafted for exceptional comfort, sophistication, and a premium VIP travel experience.</p>
                    </div>
                </div>
                {/* <Viewer360
                    imageSrc="/images/Defender-2nd-banner.png"
                    height="560px"
                /> */}

                <div>
                    <Image
                        src={'/images/imge423.png'}
                        alt={'sprinter vans'}
                        width={1000}
                        height={500}
                        className='w-full'
                    />
                </div>

                <div className='max-w-7xl mx-auto px-6'>
                    <div className="grid md:grid-cols-2 space-y-10">
                        <div className="flex items-center justify-start">
                            <p className="text-white lg:text-4xl text-2xl font-nexa md:text-start text-center font-light leading-12">BARUGZAI SPRINTER
                                DESIGNED  <br /> FOR VIP TRAVEL</p>
                        </div>
                        <div>
                            <Image
                                src={'/images/img5321.png'}
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
                    title={`BARUGZAI SPRINTER`}
                    subTitle={'Elevating luxury with Barugzai — bespoke Sprinter vehicles crafted for exceptional comfort, sophistication, and a premium VIP travel experience.'}
                    galleryImages={
                        [
                            { id: 1, src: "/images/slider-image-3.png" },
                            { id: 2, src: "/images/img423.png" },
                            // { id: 3, src: "/images/imgr323qw.png" },
                            // { id: 4, src: "/images/slider-image-4.png" },
                        ]
                    }
                />
            </section >
            <section className="md:py-10 bg-secondary">
                <div className='max-w-7xl mx-auto px-6'>
                    <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-10 mt-10">
                        <div>
                            <Image
                                src={'/images/img4233.png'}
                                height={300}
                                width={500}
                                alt="v-class"
                                className="w-full"
                            />
                        </div>
                        <div className="flex items-center justify-center">
                            <p className="text-white lg:text-4xl text-2xl md:text-start font-nexa text-center font-light uppercase leading-12">
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
                            title: "BARUGZAI Sprinter",
                            image: '/images/img34rews.png',
                            alt: "Mercedes-Benz V-Class",
                            url: '/cars-for-sale?manufacturer_ids=7&model_ids=11'
                        },
                    ]
                }
            />
            <HomeCTA
                bg="/images/img243231.png"
                mobBg="/images/v-class.png"
                title={`<h2 class="text-2xl md:text-5xl font-light tracking-[0.2em] uppercase leading-tight">
                        YOUR LEGACY <span className="text-[#c5a059]">STARTS</span> <br />
                        <span class="block mt-2">HERE</span></h2>`}
                SubTitle={`Every build is a reflection of who you are. Tell us your vision — we'll bring it to life.`}
            />
            <ContactConversation secId={'CONTACT-US'} />
            <section>
                <section className='bg-secondary text-white overflow-hidden'>
                    <div className={`mx-auto max-w-7xl py-10 px-6 space-y-9 relative transition-opacity  duration-500 ${isExpanded ? "h-full" : "h-80"}`}>
                        <div className='space-y-4'>
                            <h1 className='md:text-4xl text-2xl capitalize'>Buy a Custom Luxury Mercedes Sprinter In Dubai - Built by Barugzai</h1>
                            <p>At the core of our offering is entirely personalized interior configuration. Our custom-built Sprinters are the new mark of stylish travel. Connect with us to find a luxury Sprinter van for sale Dubai.</p>
                        </div>
                        <div className='space-y-4'>
                            <p>Looking to buy a custom luxury Mercedes Sprinter in Dubai? One that can mirror your lifestyle? You’re at the right place. At Burugzai Motors, we craft every Sprinter as a statement of elevated travel. It is engineered for owners demanding more than transportation.</p>

                            <p>Our Sprinters are handcrafted in Dubai. They are fully tailored as per your specifications. From layout to lighting, every element is as per your lifestyle. It is designed to elevate your journey. Discover our wide collection of custom luxury sprinter vans for sale in Dubai at Barugzai Motors. You can also commission your own build today with Barugzai Motors.</p>
                        </div>

                        <div className="w-full lg:w-10/12">
                            {/* Main Heading */}
                            <h2 className="text-2xl md:text-4xl text-white mb-6 leading-tight">
                                Personalized Interiors For Exceptional Experience
                            </h2>


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
                                    Control every aspect via a tablet-controlled smart system, including lights, interior temperature, and media as needed with Barugzai’s proprietary software. You can get a fully integrated privacy partition separating the driver’s cab from the rear cabin. It ensures uninterrupted comfort and exclusivity for passengers. The partition is ideal for VIP transport, business executives, or family travel that wants privacy.
                                </p>

                                <p className="text-lg md:text-xl text-white/75 leading-relaxed">
                                    Working for over 25 years, Barugzai only uses premium materials like Italian Italian Alcantara, cashmere-blend carpets, and precision-molded sidewalls. This ensures that we offer our clients durability with sophistication.
                                </p>
                            </div>
                        </div>
                        <div className="mb-8 lg:mb-12">
                            <h2 className="text-2xl md:text-4xl">
                                Custom Luxury Sprinter Van For Sale in Dubai With Warranty
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 gap-6">
                            <div className="space-y-6">
                                <p className="text-lg leading-relaxed">
                                    Come to us and explore our ready-to-drive or made-to-order Sprinter builds. Each one is thoroughly inspected and backed by a 2-year interior warranty.
                                </p>

                                <p className="text-lg leading-relaxed">
                                    Need more flexibility? We help you with your registration and insurance paperwork. We want to make the procedure easy for all of our clients. Turnaround time for most customization is 60-120 days, depending on design specifications.
                                </p>

                                <p className="text-lg leading-relaxed italic border-l-4 border-gray-300 pl-4 py-1">
                                    Discover your next custom luxury Sprinter van for sale in Dubai. Get it built and delivered by Barugzai Motors.
                                </p>
                            </div>
                        </div>
                        <div className="space-y-5">
                            <h2 className="md:text-4xl text-2xl">
                                Designed for an Elevated Standard - Matching your Lifestyle</h2>
                            <div className='space-y-6'>
                                <p>Let’s be clear — our Sprinters are modern masterpieces. They are built in limited numbers and finished with signature Barugzai detailing. No templates. No copy-paste builds. Just your vision. It is all brought to life in handcrafted, mobile luxury.</p>

                                <p>Buy your custom luxury Mercedes Sprinter van in Dubai and feel the difference premium materials, hand-made interiors, and careful design can make</p>

                                <p>Reach out to us to explore your options and discover the latest custom luxury Mercedes Sprinter price in Dubai.</p>
                            </div>
                        </div>
                        {!isExpanded ?
                            <div className='w-full max-w-7xl h-52 bg-gradient-to-t from-secondary to-transparent absolute left-0 bottom-0'></div> : ''
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
                subHeading={'Get answers to common questions about our custom Luxury sprinter vans Dubai'}
                faqs={faqs} />
        </>
    )
}
import { Mail, Phone, User } from "lucide-react";
import Navbar from "../components/Navbar";
import ContactForm from "./ContactForm";
import { getSeoData } from "@/lib/utils/getSeo";
import { Metadata } from "next";
import Link from "next/link";


export async function generateMetadata(): Promise<Metadata> {
    const currentSlug = '/contact-us';

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
    const seo = await getSeoData('/contact-us');
    return (
        <>
            {seo?.schema_markup && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.schema_markup) }}
                />
            )}
            <Navbar />
            <div className="relative h-[50vh] md:min-h-screen bg-cover bg-center bg-no-repeat flex flex-col justify-end items-center pt-30 py-16 px-6 text-white"
                style={{ backgroundImage: `url('/images/imgi_3_banner.jpg')` }}
            >
                <div className="absolute inset-0 bg-black/60 z-0"></div>
                <div className="md:text-6xl text-3xl z-10 text-center font-nexa">Not built for everyone <br /> <span className="text-primary">Built for a few</span></div>


                <div className="relative z-10 w-full flex justify-center mt-8">
                    <Link href={`https://wa.me/+971505160610`} className="w-full max-w-md flex items-center justify-center h-14 rounded-xl bg-white text-black font-semibold text-sm tracking-[3px] uppercase transition-all duration-300 hover:bg-black hover:text-white hover:ring-1 hover:ring-white">
                        REQUEST A QUOTE
                    </Link>
                </div>
            </div>

            <section className='py-16 bg-[#1a1a1a]'>
                <div className='max-w-7xl mx-auto px-6'>
                    <div className='grid md:grid-cols-2 gap-9'>
                        <div className=''>
                            <div className="space-y-10">
                                {/* Heading */}
                                <div>
                                    <h2 className="text-4xl font-bold mt-2 text-white">Get in Touch With Us</h2>
                                </div>
                                {/* Call Us */}
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                                        <Phone className='text-white' />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-semibold text-white/80">Call Us</h3>
                                        <p className="text-white/50"><a className='hover:text-primary duration-300' href="tel:+971505160610">+971505160610</a></p>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                                        <Mail className='text-white' />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-semibold text-white/80">Email Us</h3>
                                        <p className="text-white/50"><a className='hover:text-primary duration-300' href="mailto:sales@barugzaimotors.com">sales@barugzaimotors.com</a></p>
                                    </div>
                                </div>

                                {/* Social */}
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                                        <User className="text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-semibold text-white/80">Follow Us On</h3>
                                        <div className="flex items-center gap-1 mt-1 text-xl">
                                            <a className='text-black bg-neutral-200 hover:bg-primary hover:text-white! rounded-full w-8 h-8 flex items-center justify-center transition-colors' href="https://www.instagram.com/barugzaimotors/">
                                                <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"></path><path d="M3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16Z" stroke="#000000" strokeWidth="1.5"></path><path d="M17.5 6.51L17.51 6.49889" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"></path></svg>
                                            </a>
                                            <a className='text-black bg-neutral-200 hover:bg-primary hover:text-white! rounded-full w-8 h-8 flex items-center justify-center transition-colors' href="https://www.facebook.com/barugzaimotorsuae">
                                                <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M17 2H14C12.6739 2 11.4021 2.52678 10.4645 3.46447C9.52678 4.40215 9 5.67392 9 7V10H6V14H9V22H13V14H16L17 10H13V7C13 6.73478 13.1054 6.48043 13.2929 6.29289C13.4804 6.10536 13.7348 6 14 6H17V2Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"></path></svg>
                                            </a>
                                            <a className='text-black bg-neutral-200 hover:bg-primary hover:text-white! rounded-full w-8 h-8 flex items-center justify-center transition-colors' href="https://www.youtube.com/@BarugzaiMotors">
                                                <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"></path><path d="M7 17V13.5V10" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"></path><path d="M11 17V13.75M11 10V13.75M11 13.75C11 10 17 10 17 13.75V17" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"></path><path d="M7 7.01L7.01 6.99889" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"></path></svg>
                                            </a>
                                            <a className='text-black bg-neutral-200 hover:bg-primary hover:text-white! rounded-full w-8 h-8 flex items-center justify-center transition-colors' href="https://www.tiktok.com/@barugzai.motors">
                                                <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"></path><path d="M10 12C8.34315 12 7 13.3431 7 15C7 16.6569 8.34315 18 10 18C11.6569 18 13 16.6569 13 15V6C13.3333 7 14.6 9 17 9" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"></path></svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div><ContactForm /></div>
                    </div>
                </div>
            </section>
        </>
    )
}
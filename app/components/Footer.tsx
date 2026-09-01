import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/public/logo.svg";
import Link from "next/link";

export default function Footer() {
    return (
        <>
            <Link className="fixed right-0 bg-primary grid rounded-full md:p-4 md:m-8 md:bottom-0 z-20 bottom-0 p-2 m-2" href={"https://web.whatsapp.com/send?phone=971528389414&text=Hello!"}>
                <button className="btn rounded btn-warning border-warning rounded-5 shadow">
                    <Image src={'/images/suvs/WP-icon.webp'} width={25} height={25} alt="WPICon" />
                </button>
            </Link>
            <Link className="fixed right-0 bg-primary grid rounded-full md:p-4 md:m-8 md:bottom-18 z-20 bottom-14 p-2 m-2" href='tel:+971505160610'>
                <button className="btn rounded btn-warning border-warning rounded-5">
                    <Phone size={26} />
                </button>
            </Link>
            <footer className="bg-secondary text-white pt-16 pb-8 px-6">
                <div className="max-w-7xl mx-auto">

                    <div className="border border-white/50 rounded-2xl p-6 md:p-8 flex flex-wrap items-center justify-between gap-8 mb-16">
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="lg:w-26 w-16 lg:h-19 h-14 rounded-xl border border-primary/40 flex items-center justify-center bg-secondary">
                                <Phone strokeWidth={1} className="lg:w-10 lg:h-10 text-white" />
                            </div>
                            <div>
                                <p className="text-primary lg:text-[18px] text-[14px]  uppercase font-medium font-nexa">Call Us</p>
                                <p className="text-sm font-light mt-1">+971505160610</p>
                            </div>
                        </div>
                        <div className="hidden md:block h-12 w-px bg-white/50" />

                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="lg:w-26 w-16 lg:h-19 h-14 rounded-xl border border-primary/40 flex items-center justify-center bg-secondary">
                                <Mail strokeWidth={1} className="lg:w-10 lg:h-10 text-white" />
                            </div>
                            <div>
                                <p className="text-primary lg:text-[18px] text-[14px]  uppercase font-medium font-nexa">Write To Us</p>
                                <p className="text-sm font-light mt-1">sales@barugzaimotors.com</p>
                            </div>
                        </div>

                        <div className="hidden md:block h-12 w-px bg-white/50" />

                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="lg:w-26 w-16 lg:h-19 h-14 rounded-xl border border-primary/40 flex items-center justify-center bg-secondary">
                                <MapPin strokeWidth={1} className="lg:w-10 lg:h-10 text-white" />
                            </div>
                            <div>
                                <p className="text-primary lg:text-[18px] text-[14px]  uppercase font-medium font-nexa">Address</p>

                                <p className="text-sm font-light mt-1 leading-tight max-w-45">
                                    Showroom 1 - 3 Nad Al Hamar Rd Dubai
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
                        <div className="relative w-58 h-26">
                            <Image
                                src={logo} // Replace with your actual logo
                                alt="Barugzai Motors"
                                fill
                            />
                        </div>
                        <nav className="flex gap-8 md:gap-16 text-[10px] tracking-[0.2em] uppercase font-medium text-white/70">
                            <a href="/blogs" className="hover:text-white transition-colors">Our Blog</a>
                            <a href="/cars-for-sale" className="hover:text-white transition-colors">Unit In Stocks</a>
                            <a href="/contact-us" className="hover:text-white transition-colors">Contact Us</a>
                        </nav>
                    </div>
                    <hr className="border-white/10 mb-12" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                        <div className="space-y-4">
                            <h4 className="text-lg font-light tracking-wide text-gray-200 font-nexa">About Us</h4>
                            <p className="text-xs text-white/70 leading-relaxed font-light">
                                We are the UAE&apos;s leading manufacturer of custom-built VIP vans and high-performance lifestyle vehicles,
                                engineered entirely in-house and proudly finished in Dubai.
                            </p>
                        </div>

                        <div className="space-y-4 flex flex-col md:items-center items-start">
                            <h4 className="text-lg font-light tracking-wide text-gray-200 font-nexa">Experience</h4>
                            <ul className="text-xs text-white/70 space-y-2 font-light">
                                <li className="hover:text-white cursor-pointer"><a href="/custom-luxury-mercedes-v-class-dubai">Barugzai V Class</a></li>
                                <li className="hover:text-white cursor-pointer"><a href="/custom-defender-dubai">Barugzai Defender</a></li>
                                <li className="hover:text-white cursor-pointer"><a href="/custom-luxury-sprinter-vans-dubai">Barugzai Sprinter</a></li>
                                <li className="hover:text-white cursor-pointer"><a href="/luxury-hiace-interior-modification-dubai">Barugzai Hiace</a></li>
                                <li className="hover:text-white cursor-pointer"><a href="/custom-luxury-suv-dubai">Barugzai SUVs</a></li>
                                <li className="hover:text-white cursor-pointer"><a href="/custom-luxury-suv-dubai">Land Cruiser</a></li>
                                <li className="hover:text-white cursor-pointer"><a href="/modifications">Modifications</a></li>
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-lg font-light tracking-wide text-gray-200 font-nexa">Discover More</h4>
                            <a target="_blank" href={'https://maps.app.goo.gl/ZiAJPqPNWPwZAq5W9'} className="text-xs text-white/70 leading-relaxed font-light">
                                Showroom 1 - 3 Nad Al Hamar Rd - Ras Al Khor - Dubai
                            </a>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-[10px] text-gray-500 tracking-wider">
                            Copyright © {new Date().getFullYear()} Barugzai Motors. All Rights Reserved. Design by{" "}
                            <a
                                href="https://www.10xdigital.ae/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#a9e324] hover:underline transition-all"
                            >
                                10X Digital
                            </a>
                        </p>
                        <div className="flex gap-4">
                            <a href={'https://www.facebook.com/barugzaimotorsuae'} className="bg-white flex items-center justify-center transition-transform hover:scale-110">
                                <svg width="34px" height="34px" strokeWidth="1.1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="white"><path d="M17 2H14C12.6739 2 11.4021 2.52678 10.4645 3.46447C9.52678 4.40215 9 5.67392 9 7V10H6V14H9V22H13V14H16L17 10H13V7C13 6.73478 13.1054 6.48043 13.2929 6.29289C13.4804 6.10536 13.7348 6 14 6H17V2Z" stroke="#002254" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            </a>
                            <a href={'https://www.instagram.com/barugzaimotors/'} className="bg-white flex items-center justify-center transition-transform hover:scale-110">
                                <svg width="34px" height="34px" strokeWidth="1.1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="white"><path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="#002254" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"></path><path d="M3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16Z" stroke="#002254" strokeWidth="1.1"></path><path d="M17.5 6.51L17.51 6.49889" stroke="#002254" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            </a>
                            <a href={'https://www.youtube.com/@BarugzaiMotors'} className="bg-white flex items-center justify-center transition-transform hover:scale-110">
                                <svg width="34px" height="34px" strokeWidth="1.1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="white"><path d="M14 12L10.5 14V10L14 12Z" fill="#002254" stroke="#002254" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"></path><path d="M2 12.7075V11.2924C2 8.39705 2 6.94939 2.90549 6.01792C3.81099 5.08645 5.23656 5.04613 8.08769 4.96549C9.43873 4.92728 10.8188 4.8999 12 4.8999C13.1812 4.8999 14.5613 4.92728 15.9123 4.96549C18.7634 5.04613 20.189 5.08645 21.0945 6.01792C22 6.94939 22 8.39705 22 11.2924V12.7075C22 15.6028 22 17.0505 21.0945 17.9819C20.189 18.9134 18.7635 18.9537 15.9124 19.0344C14.5613 19.0726 13.1812 19.1 12 19.1C10.8188 19.1 9.43867 19.0726 8.0876 19.0344C5.23651 18.9537 3.81097 18.9134 2.90548 17.9819C2 17.0505 2 15.6028 2 12.7075Z" stroke="#002254" strokeWidth="1.1"></path></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
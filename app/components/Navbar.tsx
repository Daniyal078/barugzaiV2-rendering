"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Phone, X, ChevronRight, ArrowLeft } from 'lucide-react';
import Logo from '@/public/logo.svg';
import Link from 'next/link';

interface NavLink {
    name: string;
    link: string;
}

interface ModelStructureItem {
    category: {
        name: string;
        href: string;
    };
    models: {
        name: string;
        href: string;
    }[];
    isComingSoon?: boolean;
}

export default function Navbar({ navLinks }: { navLinks?: NavLink[] }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isModelOpen, setIsModelOpen] = useState(false);

    const modelStructure: ModelStructureItem[] = [
        {
            category: {
                name: "V Class",
                href: "/custom-luxury-mercedes-v-class-dubai"
            },
            models: [
                {
                    name: "Barugzai V Class",
                    href: "/v-class/barugzai-v-class"
                },
                {
                    name: "Limgene V Class (Magellan, Prestige, Venom)",
                    href: "/v-class/limgene-v-class"
                }
            ]
        },
        {
            category: {
                name: "Defender",
                href: "/custom-defender-dubai"
            },
            models: [
                {
                    name: "Limgene Falcon Defender",
                    href: "/defender/limgene-falcon-defender"
                }
            ]
        },
        {
            category: {
                name: "Sprinter",
                href: "/custom-luxury-sprinter-vans-dubai"
            },
            models: [
                {
                    name: "Barugzai Sprinter",
                    href: "#"
                }
            ]
        },
        {
            category: {
                name: "Hiace",
                href: "/luxury-hiace-interior-modification-dubai"
            },
            models: [
                {
                    name: "Barugzai Hiace",
                    href: "/hiace/barugzai-hiace"
                }
            ]
        },
        {
            category: {
                name: "SUVs",
                href: "/custom-luxury-suv-dubai"
            },
            models: []
        },
        // {
        //     category: {
        //         name: "Ambulances",
        //         href: "/ambulances"
        //     },
        //     models: [
        //         {
        //             name: "Coming Soon",
        //             href: "#"
        //         }
        //     ],
        //     isComingSoon: true
        // }
    ];

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 300);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Helper function to close everything cleanly
    const closeNavbar = () => {
        setIsOpen(false);
        setIsModelOpen(false);
    };

    return (
        <div className="relative w-full">
            <div className={`fixed inset-0 z-50 transition-opacity backdrop-blur duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
                    onClick={closeNavbar}
                />

                <div className={`absolute inset-y-0 left-0 w-full md:w-96 bg-[#0a0a0ace] backdrop-blur-xs border-r border-white/10
                overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] z-10
                    ${isOpen
                        ? "translate-x-0 opacity-100"
                        : "translate-x-[-120%] opacity-0"
                    }
                    `}>
                    <div className={`flex flex-col h-full p-10 transition-all duration-700
                    ${isOpen
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-8"
                        }
                    `}
                        style={{ transitionDelay: isOpen ? "250ms" : "0ms" }}
                    >
                        <button className="text-white/70 hover:text-white cursor-pointer transition-colors w-fit">
                            {isModelOpen == false ?
                                <X onClick={closeNavbar} className="h-9 w-9" /> :
                                <ArrowLeft onClick={() => setIsModelOpen(false)} className="h-9 w-9" />
                            }
                        </button>
                        <div className="relative flex-1 mt-10 overflow-hidden">
                            <div
                                className={`
                                        absolute inset-0
                                        transition-all duration-700
                                        ease-[cubic-bezier(0.19,1,0.8,3s)]
                                        ${isModelOpen
                                        ? "-translate-x-full opacity-0"
                                        : "translate-x-0 opacity-100"}
                            `}
                            >
                                <nav className="flex flex-col space-y-10">
                                    <a
                                        href="/"
                                        onClick={closeNavbar}
                                        className={`
                                        text-2xl font-light text-white tracking-[5px]
                                        hover:text-[#c9a45c]
                                        transition-all duration-700
                                        ${!isModelOpen
                                                ? "translate-y-0 opacity-100"
                                                : "translate-y-4 opacity-0"}
                                        `}
                                    >
                                        HOME
                                    </a>

                                    <button
                                        onClick={() => setIsModelOpen(true)}
                                        className="flex items-center text-2xl cursor-pointer font-light text-white tracking-[5px] hover:text-[#c9a45c]"
                                    >
                                        MODEL
                                        <ChevronRight className="h-6 w-6 ml-2" />
                                    </button>

                                    <a
                                        href="/cars-for-sale"
                                        onClick={closeNavbar}
                                        className="text-2xl font-light text-white tracking-[5px] hover:text-[#c9a45c]"
                                    >
                                        CARS FOR SALE
                                    </a>

                                    <a
                                        href="/about-us"
                                        onClick={closeNavbar}
                                        className="text-2xl font-light text-white tracking-[5px] hover:text-[#c9a45c]"
                                    >
                                        ABOUT US
                                    </a>

                                    <a
                                        href="/contact-us"
                                        onClick={closeNavbar}
                                        className="text-2xl font-light text-white tracking-[5px] hover:text-[#c9a45c]"
                                    >
                                        CONTACT
                                    </a>
                                    <a
                                        href="/blogs"
                                        onClick={closeNavbar}
                                        className="text-2xl font-light text-white tracking-[5px] hover:text-[#c9a45c]"
                                    >
                                        BLOGS
                                    </a>

                                </nav>
                            </div>

                            <div
                                className={`
                                        absolute inset-0 overflow-y-auto pr-3
                                        transition-all duration-1000
                                        ease-[cubic-bezier(0.19,1,0.8,3s)]
                                        ${isModelOpen
                                        ? "translate-x-0 opacity-100"
                                        : "translate-x-full opacity-0"}
                                        `}>
                                <div className="flex flex-col space-y-8">

                                    {modelStructure.map((item, index) => (
                                        <div
                                            key={item.category.name}
                                            className={`
                                            transition-all duration-700
                                                ${isModelOpen
                                                    ? "translate-y-0 opacity-100"
                                                    : "translate-y-6 opacity-0"}
                                                `}
                                            style={{
                                                transitionDelay: `${index * 70}ms`
                                            }}>
                                            <a
                                                href={item.category.href}
                                                onClick={closeNavbar}
                                                className={`block text-lg uppercase tracking-[3px] ${item.isComingSoon
                                                    ? "text-gray-600" : "text-white hover:text-[#c9a45c]"
                                                    }
                                                `}
                                            >
                                                {item.category.name}
                                            </a>

                                            <div className="mt-3 space-y-2 pl-4">
                                                {item.models.map((model) => (
                                                    <div key={model.name} className='text-white/50'>
                                                        {model.name}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto pt-10">
                            <p className="text-[10px] text-gray-600 tracking-[5px] uppercase">© 2026 Barugzai Motors</p>
                        </div>
                    </div>
                </div>
            </div>

            <header className={`absolute w-full top-0 z-40 transition-all duration-300 ${scrolled ? "fixed shadow-lg" : "bg-transparent"}`}>
                <nav className={`flex items-center justify-between duration-300 transition-all ${scrolled ? "py-2 bg-black/50" : "py-5 bg-black/80"} px-6 lg:px-12 backdrop-blur-md`}>
                    <div className="flex md:w-1/3 justify-start">
                        <button
                            onClick={() => setIsOpen(true)}
                            className="flex items-center justify-center cursor-pointer group w-9 h-9 md:w-auto md:h-auto md:gap-3"
                        >
                            <div className="flex flex-col gap-1.5 items-start">
                                <span className="md:w-6 w-5 h-px bg-white group-hover:w-8 transition-all"></span>
                                <span className="md:w-8 w-6 h-px bg-white"></span>
                                <span className="md:w-5 w-4 h-px bg-white group-hover:w-8 transition-all"></span>
                            </div>
                            <span className="hidden md:block md:text-xs text-[9px] font-light tracking-[4px] text-white uppercase ml-1">
                                Menu
                            </span>
                        </button>
                    </div>

                    <div className="flex justify-center flex-1 md:flex-initial md:w-1/3">
                        <a className="object-contain duration-300 relative flex items-center" href={'/'}>
                            {scrolled ?
                                <Image src={'/images/favicon_1-removebg-preview.png'} width={200} height={200} alt="Barugzai Motors" className="brightness-110 w-14 h-14 object-contain" priority />
                                :
                                <Image src={Logo} alt="Barugzai Motors" width={200} height={200} className="brightness-110 w-32 md:w-37.5 object-contain" priority />
                            }
                        </a>
                    </div>

                    <div className="flex md:w-1/3 justify-end">
                        <a
                            href="tel:+971505160610"
                            className="flex items-center justify-center border border-white/20 rounded-full text-white hover:bg-white hover:text-black transition-all duration-300 w-9 h-9 md:w-auto md:h-auto md:px-5 md:py-2.5"
                        >
                            <Phone className="h-4 w-4" />
                            <span className="hidden md:inline md:text-xs tracking-wider text-nowrap ml-2">
                                +971505160610
                            </span>
                        </a>
                    </div>
                </nav>

                {navLinks &&
                    <div className={`md:flex hidden flex-wrap uppercase justify-center duration-300 gap-x-8 gap-y-2 py-4 ${scrolled ? 'bg-black/50' : 'bg-black/80'}  backdrop-blur-sm`}>
                        {navLinks?.map((item) => (
                            <a
                                key={item.name}
                                href={item.link}
                                className="text-[10px] font-medium text-white/80 font-nexa tracking-[3px] hover:text-[#c9a45c] transition-all relative group"
                            >
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#c9a45c] transition-all group-hover:w-full"></span>
                            </a>
                        ))}
                    </div>
                }
            </header>
        </div>
    );
}
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import CarsGrid from "@/app/components/CarsGrid";
import Navbar from "@/app/components/Navbar";
import ProductImagesMain from "@/app/components/productImagesMain";
import { api_base_url } from "@/lib/utils";
import { CalendarDays, CarFront, ClockFading, Fuel } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect, RedirectType } from "next/navigation";

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const { slug } = await params;

    try {
        const result = await getCarData(slug);
        const car = result?.car;

        if (!car) {
            return {
                title: "Luxury Vehicle | Barugzai Motors",
                description: "Explore premium custom-built luxury vehicles at Barugzai Motors Dubai.",
            };
        }

        const formattedPrice = car.price_current
            ? Number(car.price_current).toLocaleString()
            : "";

        const defaultTitle = `${car.title} For Sale in Dubai | Barugzai Motors`;
        const defaultDescription = `Buy used ${car.title} in Dubai. Specs: ${car.regional_spec || 'GCC'}, Mileage: ${car.mileage?.toLocaleString()} KM, Price: ${car.currency} ${formattedPrice}. Luxury custom builds by Barugzai Motors.`;

        let imageUrl: string | undefined = undefined;
        const rawImage = typeof car.featured_image === 'string' ? car.featured_image : car.featured_image?.url || car.og_image;
        if (rawImage) {
            if (rawImage.startsWith('http://') || rawImage.startsWith('https://')) {
                imageUrl = rawImage;
            } else {
                const cleanPath = rawImage.startsWith('/') ? rawImage.slice(1) : rawImage;
                imageUrl = `${api_base_url}/${cleanPath}`;
            }
        }

        const pageTitle = car.meta_title || defaultTitle;
        const pageDescription = car.og_description || car.meta_description || defaultDescription;
        const pageUrl = `https://barugzaimotors.com/inventory/${slug}`;

        return {
            metadataBase: new URL('https://barugzaimotors.com'),
            title: pageTitle,
            description: pageDescription,
            keywords: car.meta_keywords || `${car.title}, luxury van dubai, barugzai motors, mercedes v class bespoke`,
            alternates: {
                canonical: car.canonical_url || pageUrl,
            },
            openGraph: {
                title: pageTitle,
                description: pageDescription,
                url: pageUrl,
                siteName: 'Barugzai Motors',
                type: 'website',
                images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: car.title }] : [],
            },
            twitter: {
                card: 'summary_large_image',
                title: pageTitle,
                description: pageDescription,
                images: imageUrl ? [imageUrl] : [],
            },
        };
    } catch (error) {
        return {
            title: "Luxury Vehicle | Barugzai Motors",
            description: "Explore premium custom-built luxury vehicles at Barugzai Motors Dubai.",
        };
    }
}

async function getCarData(slug: string) {
    try {
        const res = await fetch(`${api_base_url}/api/v1/cars/${slug}`, {
            cache: 'no-store'
        });

        if (!res.ok) {
            console.log(`Failed to fetch car: Status ${res.status}`);
            return null;
        }

        return await res.json();
    } catch (error) {
        console.error('Error fetching car data:', error);
        return null;
    }
}

export default async function Page({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const result = await getCarData(slug);
    // 🟢 Redirect to /cars-for-sale with a 301 Permanent status
    if (!result || !result.car) {
        redirect('/cars-for-sale', RedirectType.Permanent);
    }

    const car = result;

    // Safely parse features (handling undefined/null arrays)
    const groupedFeatures = (car?.car?.features || []).reduce((acc: { [key: string]: string[] }, feature: { category: string; name: string }) => {
        if (!acc[feature.category]) {
            acc[feature.category] = [];
        }
        acc[feature.category].push(feature.name);
        return acc;
    }, {});

    return (
        <section className="bg-secondary">
            <Navbar />
            <section className="bg-secondary text-white p-6 md:p-12 md:mt-27 mt-20">
                <div className="max-w-7xl mx-auto">
                    <nav className="text-xs md:text-sm text-white/70 mb-4 flex items-center space-x-1">
                        <span>Home</span>
                        <span>&gt;</span>
                        <span>Models</span>
                        <span>&gt;</span>
                        <span className="text-white/70">{car.car.title}</span>
                    </nav>

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-6">
                                <span className="bg-[#243e35] font-nexa text-[#4ade80] leading-6 text-xs px-3 pt-1 tracking-widest rounded uppercase">
                                    {car.car.sold == false ? "In Stock" : "Out Of Stock"}
                                </span>
                                <span className="bg-[#2c2c2c] font-nexa text-white/70 leading-6 text-xs px-3 pt-1 tracking-widest rounded uppercase">
                                    {car.car.year}
                                    {" "}
                                    Model
                                </span>
                            </div>
                            <h1 className="text-2xl md:text-5xl font-light font-nexa uppercase">
                                {car.car.title}
                            </h1>
                        </div>

                    </div>

                    <ProductImagesMain car={car} />

                    <h2 className="text-xl md:text-2xl font-light font-nexa uppercase my-10 text-white/70">
                        Car Overview
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-12">
                            <div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border border-white/30 rounded-xl bg-[#222222]/30 p-6 text-center">
                                    <div className="flex flex-col items-center justify-center p-2">
                                        <ClockFading size={40} strokeWidth={1} />
                                        <span className="text-xs text-primary uppercase tracking-wider my-2">Mileage</span>
                                        <span className="text-xl font-light text-white/70 leading-1 capitalize">{car.car.mileage}</span>
                                    </div>
                                    {/* <div className="h-"></div> */}
                                    <div className="flex flex-col items-center justify-center p-2">
                                        <CalendarDays size={40} strokeWidth={1} />
                                        <span className="text-xs text-primary uppercase tracking-wider my-2">Year</span>
                                        <span className="text-xl font-light text-white/70 leading-1 capitalize">{car.car.year}</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center p-2">
                                        <Fuel size={40} strokeWidth={1} />
                                        <span className="text-xs text-primary uppercase tracking-wider my-2">Fuel Type</span>
                                        <span className="text-xl font-light text-white/70 leading-1 capitalize">{car.car.fuel_type}</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center p-2">
                                        <CarFront size={40} strokeWidth={1} />
                                        <span className="text-xs text-primary uppercase tracking-wider my-2">Vehicle</span>
                                        <span className="text-xl font-light text-white/70 leading-1 capitalize">{car.car.car_model.body_type}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="border border-white/30 rounded-xl bg-[#222222]/10 p-6 md:p-8">
                                <h2 className="text-xl font-light  uppercase mb-6 border-b border-white/30 pb-4">
                                    Features
                                </h2>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-[11px] md:text-xs tracking-wide text-white/70">
                                    {Object.entries(groupedFeatures).map(([category, items], index) => (
                                        <div key={index} className="space-y-3">
                                            <h3 className="font-semibold text-white uppercase tracking-wider border-b border-white/30 pb-1">
                                                {category}
                                            </h3>
                                            <ul className="space-y-2 list-disc list-inside">
                                                {(items as string[]).map((itemName, i) => (
                                                    <li key={i}>{itemName}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="[&_*]:bg-transparent! [&_*]:text-white! [&_*]:background-none!">
                                <h2 className="text-xl font-light uppercase mb-6 text-white/70">Description</h2>
                                <div className="[&_h2]:bg-transparent! [&_p]:bg-transparent! [&_h2]:text-white/70! [&_p]:text-white/70!" dangerouslySetInnerHTML={{ __html: car.car.description }} />
                            </div>

                            <div className="border-t border-white/30 pt-8">
                                <h2 className="text-xl font-light  uppercase mb-4 text-white/70">
                                    About Our Company
                                </h2>
                                <p className="text-sm font-light leading-relaxed tracking-wide text-white/70">
                                    Barugzai Motors is a Dubai-based luxury VIP vehicle manufacturer specialising in bespoke conversions
                                    and custom builds. Every vehicle is designed and crafted to the client&apos;s exact specification — from
                                    hand-stitched leather interiors to full entertainment systems and privacy partitions. Built in Dubai.
                                    Desired worldwide.
                                </p>
                            </div>

                        </div>

                        <div className="space-y-6">
                            {car.car.price_current &&
                                <div className="border border-white/30 rounded-xl bg-[#262626]/30 p-6">
                                    <span className="text-xl text-white tracking-wider block mb-1">Exclusive Price</span>
                                    <div className="text-2xl md:text-4xl font-light text-primary flex items-center space-x-1">
                                        <svg width="36" height="39" viewBox="0 0 44 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clipPath="url(#clip0_4840_892)">
                                                <path d="M18.3495 38.2246L3.86985 38.2357C5.15482 36.6445 5.63333 34.3044 5.63746 32.3008L5.6519 24.8925L3.05565 24.8513C1.83875 24.8317 0.903378 23.8294 0.397536 22.733C-0.00156874 21.8675 0.00100946 20.948 0.0505108 19.951C0.75178 20.7716 1.51957 21.0764 2.4704 21.0721L5.64262 21.0584V17.237C4.69745 17.2249 3.78889 17.2993 2.86693 17.1715C0.898737 16.899 -0.254747 14.5273 0.0479326 12.3282C0.658965 12.9308 1.25247 13.3866 2.04861 13.3903L5.64622 13.4077L5.63282 6.25552C5.62869 4.15735 5.13265 1.60711 3.82344 -0.000976562L19.0451 0.0629246C21.6238 0.0734867 24.0576 0.61691 26.443 1.49568C31.8366 3.48295 35.4491 7.65026 36.7764 13.3992L40.1162 13.4489C41.1186 13.4637 41.9271 14.2981 42.4221 15.1151C43.0001 16.0694 43.0368 17.143 42.979 18.2515C42.3669 17.7197 41.7827 17.2328 41.0227 17.2312L37.3575 17.2259L37.3549 21.0452L40.1126 21.097C41.8776 21.1302 43.3817 23.6599 42.9372 25.8705C42.3664 25.3709 41.7822 24.8919 41.0242 24.8893L36.8068 24.875C35.5002 30.6325 31.983 34.8209 26.526 36.8018C23.9035 37.754 21.2391 38.2214 18.3505 38.224L18.3495 38.2246ZM28.6937 7.93544C27.5232 5.76438 25.8515 4.15629 23.6817 3.1682C21.7434 2.33538 19.7371 1.98946 17.6152 1.93665L11.2517 1.9319L11.2538 13.4188L30.4206 13.414C30.0839 11.403 29.5977 9.65126 28.6932 7.93544H28.6937ZM11.2507 17.2191V21.0642L30.8481 21.0653V17.2201L11.2507 17.2191ZM22.4571 35.4631C27.317 33.7663 29.542 29.9053 30.4046 24.883L11.2533 24.8872V36.3545L17.8112 36.3434C19.4112 36.1803 20.8823 35.9886 22.4571 35.4631Z" fill="#CDA43B" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_4840_892">
                                                    <rect width="43.0156" height="38.2361" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>


                                        <span className="font-bold font-nexa pt-3">{car.car.price_current}</span>

                                    </div>
                                </div>
                            }

                            <div className="border border-white/30 rounded-xl bg-[#222222]/30 p-6 flex flex-col items-center text-center">

                                <div className="flex items-center gap-4 w-full">
                                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-primary/30 p-px mb-4">
                                        <Image
                                            src={`${car.car.seller.profile_image_url}`}
                                            height={200}
                                            width={200}
                                            alt="Ms. Lazzat"
                                            className="w-full h-full object-cover rounded-full"
                                        />
                                    </div>

                                    <div>
                                        <h3 className="text-2xl text-start font-medium text-primary font-nexa tracking-wide">
                                            {car.car.seller.name}
                                        </h3>
                                        <span className="text-xs text-white/70 text-start tracking-wide mt-1 mb-3 block">
                                            {car.car.seller.email}
                                        </span>
                                        <span className="text-xs text-white/70 text-start tracking-wide mb-6 block">
                                            {car.car.seller.phone}
                                        </span>
                                    </div>
                                </div>

                                <div className="w-full space-y-3">
                                    {/* <button className="w-full bg-primary hover:bg-primary/70 text-white text-xs md:text-sm py-3 rounded-lg transition tracking-wider flex items-center justify-center space-x-2">
                                        <span>Message Sales</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                                        </svg>
                                    </button> */}

                                    <Link
                                        href={`https://wa.me/+${car?.car?.seller?.whatsapp?.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                                            `I am interested in ${car?.car?.title || ''}. Is it still available?`
                                        )}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full border border-[#057F44] hover:bg-emerald-600/10 text-xs md:text-sm py-3 rounded-lg transition tracking-wider flex items-center justify-center space-x-2"
                                    >
                                        <span>Chat Via Whatsapp</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {car.car.related_cars.length > 1 &&
                <div className="mt-10">
                    <h2 className="text-3xl md:text-5xl font-light font-nexa uppercase text-white text-center">
                        RELATED {" "}<span className="text-primary ">LISITINGS</span>
                    </h2>
                    <div className="max-w-7xl mx-auto mt-10">
                        <CarsGrid cars={car.car.related_cars} />
                    </div>
                </div>
            }
        </section>
    );
}
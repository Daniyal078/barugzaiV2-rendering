/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Key, useState } from "react"
import { GalleryModal } from "./gallery-modal"
import Image from "next/image"
import { api_base_url } from "@/lib/utils"

export default function ProductImagesMain({ car }: { car: any }) {
    const STORAGE_BASE = api_base_url + '/storage/app/public'

    function storageUrl(path?: string | null): string | undefined {
        if (!path) return undefined
        if (path.startsWith('http')) return path
        return `${STORAGE_BASE}/${path.replace(/^\//, '')}`
    }

    const [showGallery, setShowGallery] = useState(false)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)


    return (
        <section>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div onClick={() => { setShowGallery(true) }} className="md:col-span-2 relative md:aspect-auto md:h- overflow-hidden rounded-xl group">
                    <img
                        src={storageUrl(car.featured_image) || ''}
                        alt="Barugzai Prado Premium Luxury Interior Front Seat"
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                </div>

                <div className="md:col-span-2 grid grid-cols-2 gap-4">
                    {/* <div className="lg:h-50 md:h-32 h-20 relative overflow-hidden rounded-xl group">
                        <img
                            src="/images/img343.webp"
                            alt="Barugzai Prado Black Exterior SUV"
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                    </div> */}
                    {car?.car?.images.slice(car?.car?.images.length - 4, car?.car?.images.length)?.map((image: { url: string | null | undefined; }, key: Key | null | undefined) => (
                        <div key={key} className="lg:h-50 md:h-32 h-20 relative overflow-hidden rounded-xl group">
                            {/* <div>{car?.car?.images?.length}</div> */}
                            <Image
                                src={storageUrl(image.url) || ''}
                                alt="Barugzai Prado VIP Rear Seats Setup"
                                height={300}
                                width={300}
                                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                            />
                        </div>
                    ))}

                    {/* <div className="lg:h-50 md:h-32 h-20 relative overflow-hidden rounded-xl group">
                                <Image
                                    src="/images/img4342.webp"
                                    alt="Barugzai Prado Entertainment Screens"
                                    height={300}
                                    width={300}
                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                />
                            </div>

                            <div className="lg:h-50 md:h-32 h-20 relative overflow-hidden rounded-xl group cursor-pointer">
                                <Image
                                    src="/images/img453523.png"
                                    alt="Barugzai Prado Front view silhouette"
                                    height={300}
                                    width={300}
                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500 brightness-[0.4]"
                                />
                                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center text-center p-2 group-hover:bg-black/50 transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mb-2 text-white/70">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 8.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                                    </svg>
                                    <span className="text-xs md:text-sm font-medium tracking-wide text-gray-100">
                                        View All Photos
                                    </span>
                                </div>
                            </div> */}
                </div>
            </div>

            {/* Gallery Modal */}
            <GalleryModal
                isOpen={showGallery}
                data={car}
                onClose={() => setShowGallery(false)}
                initialIndex={currentImageIndex}
            />
        </section>
    )
}

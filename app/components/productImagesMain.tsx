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
                    <Image
                        src={storageUrl(car.featured_image) || ''}
                        alt="Barugzai Prado Premium Luxury Interior Front Seat"
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        width={800}
                        height={600}
                    />
                </div>

                <div className="md:col-span-2 grid grid-cols-2 gap-4">
                    {car?.car?.images.slice(car?.car?.images.length - 4, car?.car?.images.length)?.map((image: { url: string | null | undefined; }, key: Key | null | undefined) => (
                        <div key={key} className="lg:h-52 md:h-32 h-20 relative overflow-hidden rounded-xl group">
                            <Image
                                src={storageUrl(image.url) || ''}
                                alt="Barugzai Prado VIP Rear Seats Setup"
                                height={300}
                                width={300}
                                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                            />
                        </div>
                    ))}
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

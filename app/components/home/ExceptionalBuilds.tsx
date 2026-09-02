import React from 'react'
import img1 from '@/public/images/img4342.webp'
import img2 from '@/public/images/img3344.webp'
import img3 from '@/public/images/img3432.webp'
import Image from 'next/image'
import Link from 'next/link'

const vehicleTypes = [
    {
        id: 1,
        title: "Mercedes-Benz V-Class",
        image: img2,
        alt: "Mercedes-Benz V-Class",
        url: "/cars-for-sale?manufacturer_ids=7&model_ids=8,45,47"
    },
    {
        id: 2,
        title: "Mercedes-Benz Sprinter",
        image: img1,
        alt: "Mercedes-Benz Sprinter",
        url: "/cars-for-sale?manufacturer_ids=7&model_ids=11"
    },
    {
        id: 3,
        title: "Toyota Hiace",
        image: img3,
        alt: "Toyota Hiace",
        url: "/cars-for-sale?manufacturer_ids=8&model_ids=40"
    },
]

export default function ExceptionalBuilds() {
    return (
        <section className='bg-secondary py-10'>
            <div className='py-10 px-6 mx-auto max-w-7xl'>
                <div
                    className="text-center max-w-4xl flex flex-col items-center justify-center mx-auto">
                    <div className='uppercase text-4xl text-center font-nexa text-white font-light'>BRINGING YOUR VISION TO
                        <br className="max-sm:hidden" /> <span className="text-primary">REALITY</span>
                    </div>
                </div>
            </div>

            <div className='mx-auto max-w-7xl px-6'>
                <div className='grid items-start md:grid-cols-3 gap-5'>
                    {vehicleTypes.map((vehicle, index) => (
                        <div key={index} className='bg-[#272727] p-3 space-y-4 h-full'>
                            <div className={`overflow-hidden rounded-2xl lg:[&_img]:h-[420px] [&_img]:h-52 ${index == 1 ? 'lg:[&_img]:h-[450px] [&_img]:h-60' : ''}`}>
                                <Link href={vehicle.url}>
                                    <Image
                                        src={vehicle.image}
                                        alt={vehicle.alt}
                                        width={500}
                                        height={500}
                                        className='w-full object-cover duration-300 hover:scale-105 overflow-hidden'
                                    />
                                </Link>
                            </div>
                            <div className='uppercase text-center text-white lg:text-xl text-lg font-clight'>{vehicle.title}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

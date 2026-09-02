import React from 'react'
import RevealAnimation from '../RevealAnimation'
import Image from 'next/image'
import Link from 'next/link'

interface UnitsInStockProps {
    secId?: string
    vehicleTypes?: { id: number, image: string; title: string, alt: string, url: string }[]
}

export default function UnitsInStock({ secId, vehicleTypes = [] }: UnitsInStockProps) {
    return (
        <section className='bg-secondary py-10 space-y-10' id={secId}>
            <div className='px-6 mx-auto max-w-7xl space-y-10'>
                <RevealAnimation
                    key={1}
                    duration={0.5}
                    delay={0.2}
                    className="text-center max-w-4xl flex flex-col items-center justify-center mx-auto"
                >
                    <div className='uppercase md:text-4xl text-2xl font-nexa tracking-[5px] text-center text-white font-light'>UNITS IN <span className="text-primary">STOCK</span>
                    </div>
                </RevealAnimation>
            </div>

            <div className='mx-auto max-w-7xl px-6'>
                <div className={`grid items-center ${vehicleTypes.length >= 4 ? 'md:grid-cols-2' : `md:grid-cols-${vehicleTypes.length}`} gap-5 `}>
                    {vehicleTypes?.map((vehicle, index) => (
                        <RevealAnimation
                            key={index}
                            duration={0.5}
                            delay={index * 0.2}
                        >
                            <div key={index} className='bg-[#272727] h-full'>
                                <Link href={vehicle.url}>
                                    <div className='overflow-hidden'>
                                        <Image
                                            src={vehicle.image}
                                            alt=''
                                            width={500}
                                            height={400}
                                            className='w-full lg:h-72 h-52 object-cover duration-300 hover:scale-105 overflow-hidden'
                                        />
                                    </div>
                                    <div className='uppercase text-center text-white lg:text-xl py-7 font-light tracking-[5px]'>{vehicle.title}</div>
                                </Link>
                            </div>
                        </RevealAnimation>
                    ))}
                </div>
            </div>
        </section >
    )
}

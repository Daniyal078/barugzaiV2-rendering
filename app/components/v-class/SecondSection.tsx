import Image from "next/image";

export default function SecondSection() {
    return (
        <section className='lg:py-20 py-10 bg-secondary space-y-10'>
            <div className='max-w-7xl mx-auto px-6'>
                <div className="text-center space-y-5">
                    <div className='tracking-[5px] text-white md:text-4xl text-2xl font-light'>LIMGENE <span className='text-primary'>V CLASS</span></div>
                    <p className="text-white max-w-3xl mx-auto">Elevating luxury with Limgene — bespoke V-Class models (Prestige, Magellan, Venum) crafted for elegance, comfort, and a premium VIP experience.
                    </p>
                </div>
            </div>
            <Image
                src={'/images/bg-45243.webp'}
                height={300}
                width={500}
                alt="v-class"
                className="w-full"
            />

            <div className='max-w-7xl mx-auto px-6'>
                <div className="grid md:grid-cols-2 space-y-10">
                    <div className="flex items-center justify-start">
                        <p className="text-white lg:text-4xl text-2xl md:text-start text-center font-light leading-12">LIMGENE MAGELLAN V-CLASS <br /> BUILT  FOR LUXURY</p>
                    </div>
                    <div>
                        <Image
                            src={'/images/img3442.webp'}
                            height={300}
                            width={500}
                            alt="v-class"
                            className="w-full"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

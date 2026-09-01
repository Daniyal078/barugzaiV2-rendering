import { Car, Gift, MessageSquare, Wrench } from "lucide-react";
import Image from "next/image";

const steps = [
    {
        id: "01",
        title: "CONSULT",
        icon: <MessageSquare strokeWidth={0.5} className="w-28 h-28 text-white" />,
        description: "Choose your package and preferred time. We'll confirm within 2 hours with all details.",
        img: '/images/Consult.png'
    },
    {
        id: "02",
        title: "DESIGN",
        icon: <Car strokeWidth={0.5} className="w-28 h-28 text-white" />,
        description: "Our team arrives at your location fully equipped. No disruption to your day.",
        img: '/images/DESIGN.png'
    },
    {
        id: "03",
        title: "BUILD",
        icon: <Wrench strokeWidth={0.5} className="w-28 h-28 text-white" />,
        description: "Each improvement or repair is done properly. Parts used are tested and approved, which means the car will run exactly as expected.",
        img: '/images/BUILD.png'
    },
    {
        id: "04",
        title: "DELIVER",
        icon: <Gift strokeWidth={0.5} className="w-28 h-28 text-white" />,
        description: "Our team will do the final inspection of the car and explain to you everything done on the vehicle before returning the keys",
        img: '/images/DELIVER.png'
    }
];
export default function OurProcess() {
    return (
        <>
            <section className="bg-secondary-foreground">
                <div className='py-10 pt-16 px-6 mx-auto max-w-7xl'>
                    <div className='grid lg:grid-cols-3 space-y-10 md:gap-0 gap-10'>

                        <div className='uppercase text-4xl text-white text-center font-light font-nexa md:text-start'>MORE THAN A <br className="max-sm:hidden" /> VeHICLE
                            <br className="max-sm:hidden" /> <span className="text-primary">A leGACY</span></div>


                        <div className="text-white lg:text-start text-center">We are the UAE’s leading manufacturer of custom-built VIP vans and high-performance lifestyle vehicles, engineered entirely in-house and proudly finished in Dubai.</div>

                        <div className='flex flex-wrap md:justify-center gap-8 text-primary'>
                            <div>
                                <div className="text-6xl font-tilt-prism">10+</div>
                                <div className="font-light">YEARS OF <br /> EXCELLENCE</div>
                            </div>
                            <div>
                                <div className="text-6xl font-tilt-prism ">1000+</div>
                                <div className="font-light">BESPOKE BUILD <br /> DELIVERED</div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <section className="bg-secondary">
                <div className='pt-16 px-6 mx-auto max-w-7xl '>
                    <div className="text-center mb-16 text-white">

                        <h2 className="text-3xl md:text-4xl font-nexa font-light tracking-tighter uppercase ">
                            Your Vision. <span className="text-primary">Our Process</span>
                        </h2>
                        <h3 className="text-3xl md:text-4xl font-light font-nexa tracking-tighter uppercase mt-2">
                            Unmatched Result
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:gap-8 gap-16 max-w-7xl mx-auto">
                        {steps.map((step, index) => (
                            <div
                                key={step.id}
                                className="flex flex-col items-center group cursor-pointer"
                            >
                                <div className="relative xl:w-64 md:w-54 md:h-54 xl:h-64 rounded-full flex items-center justify-center mb-8 transition-all duration-500 border-2 border-transparent group-hover:border-primary bg-[#272727]">
                                    <div className="absolute top-0 z-20 bg-white text-black rounded-full w-12 h-12 flex items-center text-3xl  justify-center -translate-y-1/2">
                                        {step.id}
                                    </div>

                                    <div className={`z-10 duration-300 opacity-100 group-hover:opacity-0`}>
                                        {step.icon}
                                    </div>
                                    <div className="absolute inset-0 z-0">
                                        <Image
                                            src={step.img}
                                            alt={step.title}
                                            width={300}
                                            height={300}
                                            className="w-full h-full opacity-0 group-hover:opacity-100 duration-300 rounded-full object-cover brightness-75"
                                        />
                                    </div>
                                </div>

                                <div className="text-center space-y-2 px-4">
                                    <h4 className={`text-2xl tracking-[0.2em] font-nexa font-light transition-colors duration-300 text-primary`}>
                                        {step.title}
                                    </h4>
                                    <p className="text-white text-sm leading-relaxed font-light">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section >
        </>
    )
}

import Image from "next/image";
import Link from "next/link";

const vehicles = [
    {
        name: "V-CLASS",
        subtitle: "The Executive Lounge, Redefined",
        image: '/images/Rectangle504.png',
        url: '/custom-luxury-mercedes-v-class-dubai'
    },
    {
        name: "SPRINTER",
        subtitle: "Where Craftsmanship Meets Presence",
        image: '/images/Rectangle505.png',
        url: '/custom-luxury-sprinter-vans-dubai'
    },
    {
        name: "DEFENDER",
        subtitle: "Bold By Design, Rare By Nature",
        image: '/images/Rectangle517.png',
        url: '/custom-defender-dubai'
    },
];

export default function ExceptionalDesignSection() {
    return (
        <section className="w-full bg-[#f3f3f3] py-20 lg:py-28">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                <h2 className="text-3xl md:text-5xl font-light font-nexa uppercase text-black text-center">
                    Exceptional{" "} <span className="text-primary ">By Design</span>
                </h2>

                <p className="mt-6 md:text-xl mx-auto max-w-5xl text-center">
                    We are the UAE’s leading manufacturer of custom-built VIP vans and
                    high-performance lifestyle vehicles, engineered entirely in-house
                    and proudly finished in Dubai.
                </p>
                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-16">
                    {vehicles.map((vehicle, index) => (
                        <div key={index}>
                            <Link href={vehicle.url}>
                                {/* Image */}
                                <div className="overflow-hidden rounded-lg">
                                    <Image
                                        src={vehicle.image}
                                        alt={vehicle.name}
                                        width={200}
                                        height={200}
                                        className="w-full h-80 object-cover group-hover:scale-105 transition duration-700"
                                    />
                                </div>
                            </Link>

                            {/* Text */}
                            <div className="pt-5" >
                                <h3 className="text-xl font-light font-nexa md:text-2xl uppercase text-black">
                                    {vehicle.name}
                                </h3>

                                <p className="mt-1 text-gray-700 text-lg font-light leading-relaxed">
                                    {vehicle.subtitle}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section >
    );
}
'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const cardData = [
    {
        id: 1,
        title: "Bulletproof Vehicles",
        type: "logo-card",
        badge: "2x3 Configuration",
        bgImage: "/images/logo.webp", // Replace with actual bg if needed
        description: "Safety meets luxury with Barugzai Motors’ bulletproof and armoured vehicles. Designed for those who demand the highest level of protection without compromising on style or performance, our armoured vehicles are built to the strictest international standards. Using advanced materials and cutting-edge technology, we transform your car into a fortress on wheels—offering protection against ballistic threats, explosions, and more. Whether for personal security, corporate use, or high-profile clients, our armoured vehicles combine discreet elegance with unmatched safety. Trust Barugzai Motors to deliver peace of mind, wrapped in luxury."
    },
    {
        id: 2,
        title: "2x3 Configuration",
        type: "logo-card",
        bgImage: "/images/logo.webp",
        description: "The 2x3 configuration offers a sumptuous seating arrangement, featuring two premium VIP captain seats complemented by a luxurious 3-in-1 sofa bed at the rear. This layout is ideal for those seeking both versatility and opulence, as it allows for the selection of either rotatable or fixed seating options to suit individual preferences. Moreover, the 3-in-1 sofa bed at the rear ensures unparalleled comfort, with the flexibility to be tailored to your exact specifications. For added convenience, bespoke hidden tables and discreet storage compartments can be seamlessly integrated, enhancing both functionality and elegance."
    },
    {
        id: 3,
        title: "2x2 Configuration",
        type: "logo-card",
        bgImage: "/images/logo.webp",
        description: "The 2x2 configuration epitomizes luxury and sophistication, featuring two opulent VIP captain seats paired with two semi-VIP seats for an elevated travel experience. This configuration is often accompanied by a bespoke partition, offering the flexibility of an open or closed partition window, ensuring both privacy and exclusivity. Integrated within the partition is a state-of-the-art LED screen, delivering an immersive entertainment experience. Both seating arrangements boast a centrally positioned console, enhancing convenience and refinement. The VIP captain seat console is equipped with two elegantly designed manual tables, which can be discreetly deployed for dining or productivity at one’s leisure. Moreover, all seats are meticulously crafted with advanced ventilation, massage functions, and fully adjustable settings, ensuring the pinnacle of comfort and relaxation throughout every journey."
    },
    {
        id: 4,
        title: "3x3 Configuration",
        type: "logo-card",
        bgImage: "/images/logo.webp",
        description: "The timeless 3x3 configuration features two meticulously crafted rows of three seats, offering a harmonious blend of luxury and practicality. While this layout is traditionally found in standard Mercedes-Benz V-Class models, it can be exquisitely customized to reflect your personal taste. From bespoke upholstery in your preferred color palette to tailored ambient lighting, every detail can be curated to create an atmosphere of refinement and exclusivity. Additionally, this configuration can be enhanced with a bespoke partition, seamlessly integrating a high-definition LED screen, elevating the in-cabin experience with cutting-edge entertainment and enhanced privacy."
    },
    {
        id: 5,
        title: "VIP Toyota Hiace",
        type: "image-card",
        bgImage: "/images/imgr323423.jpg", // Replace with luxury Hiace interior
        description: "Step into a new class of luxury with the Barugzai VIP Toyota Hiace — transformed from the ground up at our Dubai facility into a fully custom-built masterpiece. Featuring a world-first handmade interior, this van is equipped with 4 VIP massage seats, a rear lounge sofa, starlit Alcantara ceiling, 43” Samsung Smart TV, built-in coffee machine, integrated PlayStation 5, wireless tech, and hidden dining/work tables. Barugzai is the UAE’s leading name in VIP van conversions, trusted by celebrities, CEOs, and collectors for creating vehicles that rival private jets. Every build is designed, engineered, and finished in-house — ensuring unmatched craftsmanship, full warranty coverage, and complete customization. More than a vehicle, it’s a statement."
    },
    {
        id: 6,
        title: "VIP Sprinter",
        type: "image-card",
        bgImage: "/images/img4342.webp", // Replace with luxury Sprinter interior
        description: "The Barugzai VIP Mercedes-Benz Sprinter is built to impress, with an elegant beige interior designed to evoke the feel of a private executive lounge. It features 6 VIP captain seats with massage, ventilation, and heating for ultimate comfort. Premium wooden flooring adds a warm, upscale finish, while dual smart TVs—preloaded with YouTube, Netflix, and Prime Video—ensure top-tier entertainment. The custom Alcantara ceiling glows with ambient starlight, creating a soothing atmosphere. A built-in espresso machine, integrated PlayStation 5, and Barugzai’s exclusive smart control tablet elevate the experience further. Wireless charging pads, 220v outlets, a rear mini-fridge, and a discreet intercom system complete this rolling luxury suite. Every detail reflects Barugzai’s commitment to craftsmanship, comfort, and class."
    },
    {
        id: 7,
        title: "VIP V-Class",
        type: "image-card",
        bgImage: "/images/img233423.png", // Replace with luxury Sprinter interior
        description: "Experience true luxury with this fully customized VIP van by Barugzai Motors, featuring a high roof for extra headroom, a Maybach-style two-tone exterior, and a handcrafted leather roof with Rolls-Royce-inspired star lights. Inside, enjoy VIP captain seats with folding tables, a smart TV, dual refrigerators, hidden storage, and dedicated wine compartments. Premium details like custom flooring, Alcantara curtains, ambient-lit leather side panels, and built-in umbrella holders complete the experience — all crafted for unmatched comfort and elegance."
    }
];

export default function VehicleGallery() {
    // Track state of expanded cards for "Read More/Read Less"
    const [expandedCards, setExpandedCards] = useState({ 0: false }); // Card 1 open by default as in screenshot

    const toggleReadMore = (id) => {
        setExpandedCards(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <>
            <div className='mb-20'>
                <Navbar />
            </div>
            <section className="bg-[#0b0c10] py-16 px-4 md:px-8 lg:px-16 min-h-screen flex items-center justify-center">
                <div className="max-w-7xl mx-auto w-full">
                    <div className="mb-10 text-center md:text-left">
                        <p className="text-white text-center font-semibold mb-2">At Barugzai Motors, we specialize in turning your vision into reality. From premium interiors and sleek bodykits to carbon fiber finishes, vehicle extensions, and bulletproof upgrades, our expert team delivers unmatched craftsmanship and precision. Whether it’s a subtle enhancement or a complete transformation, we tailor every detail to match your style, safety, and performance needs.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cardData.map((card) => {
                            const isExpanded = !!expandedCards[card.id];
                            return (
                                <div
                                    key={card.id}
                                    className="relative h-[280px] rounded-2xl overflow-hidden group shadow-2xl transition-all duration-500 ease-in-out hover:shadow-amber-500/10 border border-neutral-800/40 hover:border-amber-500/30"
                                >
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                                        style={{ backgroundImage: `url(${card.bgImage})` }}
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

                                    <div className={`absolute inset-0 p-6 flex flex-col justify-end transition-all duration-500 ${isExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                                        <div className="z-10 flex justify-between items-end">
                                            <h3 className="text-xl font-bold text-white tracking-wide">{card.title}</h3>
                                            <button
                                                onClick={() => toggleReadMore(card.id)}
                                                className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors duration-200">
                                                Read More <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
                                            </button>
                                        </div>
                                    </div>

                                    <div className={`absolute inset-0 bg-white p-6 flex flex-col justify-between transition-all duration-500 ease-in-out z-20 ${isExpanded ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                                        <div className="overflow-y-auto pr-1 custom-scrollbar">
                                            <h3 className="text-xl font-bold text-neutral-900 mb-2 font-serif border-b pb-2 border-neutral-100">
                                                {card.title}
                                            </h3>
                                            <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                                                {card.description}
                                            </p>
                                        </div>

                                        <div className="pt-3 mt-2 border-t border-neutral-100 flex justify-between items-center">
                                            <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">BARUGZAI CUSTOMS</span>
                                            <button
                                                onClick={() => toggleReadMore(card.id)}
                                                className="text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors flex items-center gap-1"
                                            >
                                                Read Less <span className="rotate-180 inline-block">&rarr;</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <style jsx global>{`
                    .custom-scrollbar::-webkit-scrollbar {
                      width: 4px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-track {
                      background: #f1f1f1;
                      border-radius: 10px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                      background: #d4d4d4;
                      border-radius: 10px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                      background: #a3a3a3;
                    }
                `}</style>
            </section>
        </>
    );
}
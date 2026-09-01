"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { api_base_url } from "@/lib/utils";

// API response ke mutabik TypeScript Interface define ki hai
interface TeamMember {
    id: number;
    name: string;
    phone: string;
    company_name: string;
    profile_image_url: string;
}

interface UnitsInStockProps {
    secId?: string;
}

export default function ContactConversation({ secId }: UnitsInStockProps) {
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTeamMembers = async () => {
            try {
                const response = await fetch(api_base_url + "/api/v1/contact-persons");
                if (!response.ok) {
                    throw new Error("Failed to fetch contact persons");
                }
                const data = await response.json();
                setTeamMembers(data);
            } catch (err: any) {
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchTeamMembers();
    }, []);

    return (
        <section className="bg-secondary py-10 px-6" id={secId}>
            <div className="max-w-7xl mx-auto bg-[#1a1a1a] rounded-xl p-5 lg:p-20 border border-white/5 shadow-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-light font-nexa text-white uppercase leading-tight">
                            LET’S START
                        </h2>
                        <h3 className="text-2xl md:text-4xl font-light font-nexa text-[#c5a059] uppercase leading-tight">
                            THE CONVERSATION
                        </h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {loading && (
                            <div className="text-white font-light col-span-2 text-center py-10">
                                Loading team members...
                            </div>
                        )}

                        {error && (
                            <div className="text-red-500 font-light col-span-2 text-center py-10">
                                Error: {error}
                            </div>
                        )}

                        {!loading && !error && teamMembers.map((member) => (
                            <div key={member.id}
                                className="relative group rounded-2xl overflow-hidden bg-[#222] aspect-3/4">
                                {member.profile_image_url && (
                                    <Image
                                        src={api_base_url + '/storage/app/public/' + member.profile_image}
                                        alt={member.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                )}

                                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end">
                                    <div className="bg-black/50 p-5">
                                        <h4 className="text-[#c5a059] text-xl font-nexa font-medium tracking-wide">
                                            {member.name}
                                        </h4>
                                        <p className="text-gray-300 text-xs uppercase tracking-wider font-light">
                                            {member.company_name}
                                        </p>
                                        <div>
                                            <a
                                                href={`tel:${member.phone.replace(/\s/g, '')}`}
                                                className="text-white text-sm font-light hover:text-[#c5a059] transition-colors"
                                            >
                                                +{member.phone}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
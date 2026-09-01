/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { api_base_url } from '@/lib/utils';
import { Calendar, Car, Fuel, Gauge } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface CarCardProps {
    car: any;
    onInterested?: (car: any) => void;
}

export default function CarCard({ car, onInterested }: CarCardProps) {
    const STORAGE_BASE = api_base_url + '/storage/app/public'

    function storageUrl(path?: string | null): string | undefined {
        if (!path) return undefined
        if (path.startsWith('http')) return path
        return `${STORAGE_BASE}/${path.replace(/^\//, '')}`
    }
    return (
        <div
            className="group relative flex flex-col bg-gradient-to-b from-[#262626] to-[#1F1F1F] border border-[#616161]/25 rounded-2xl overflow-hidden transition-all duration-500 ease-out hover:-translate-y-2 hover:border-[#C8A64D]/40 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8),0_0_50px_rgba(200,166,77,0.05)] flex-grow w-full"
        >
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#616161]/30 to-transparent z-20" />

            <div className="relative aspect-[16/10] sm:aspect-[16/9] md:aspect-[16/10] w-full overflow-hidden bg-black select-none">
                <div className="absolute inset-0 bg-gradient-to-t from-[#262626] via-transparent to-black/30 z-10" />
                <div className="absolute inset-0 bg-black/5 opacity-60 mix-blend-multiply z-10" />
                <img
                    src={storageUrl(car?.featured_image) || '/images/logo.webp'}
                    alt={car.title || `${car.manufacturer?.title} ${car.car_model?.name}`}
                    className="w-full h-full object-cover scale-100 group-hover:scale-[1.03] transition-transform duration-1000 ease-out"
                    loading="lazy"
                />

                {!car.sold ?
                    <div className="absolute top-4 right-4 z-20 bg-[#1F1F1F]/80 backdrop-blur-md border border-[#616161]/30 text-white font-nexa font-medium text-[11px] sm:text-xs px-4 py-2 rounded-full tracking-wider shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                        <span className="text-[#C8A64D] font-bold mr-1">AED</span>
                        {Number(car.price_current).toLocaleString('en-US')}
                    </div>
                    :
                    <div className="absolute top-4 right-4 z-20 bg-[#1F1F1F]/80 backdrop-blur-md border border-[#616161]/30 text-white font-nexa font-medium text-[11px] sm:text-xs px-4 py-2 rounded-full tracking-wider shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                        <span className="text-red-400 font-bold">Sold</span>
                    </div>
                }
            </div>

            <div className="p-5 sm:p-6 flex flex-col flex-grow relative z-20">
                <div className="flex items-center gap-2 mb-2.5">
                    <span className="text-[9px] tracking-widest text-[#C8A64D] font-nexa font-bold bg-[#C8A64D]/10 border border-[#C8A64D]/20 px-2 py-0.5 rounded-md uppercase">
                        {car.year || 'Premium'}
                    </span>
                    <span className="text-[9px] tracking-widest text-gray-400 font-nexa uppercase">
                        {car.drive_type || 'Exotic'}
                    </span>
                </div>

                <h3 className="text-sm font-bold font-nexa tracking-wide text-white uppercase mb-2 truncate drop-shadow-sm">
                    {car.title || `${car.manufacturer?.title ?? ''} ${car.car_model?.name ?? ''}`.trim()}
                </h3>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#616161]/20 to-transparent mb-4" />

                <div className="grid grid-cols-2 gap-2.5 mb-6">
                    <div className="flex items-center gap-2.5 bg-white/[0.01] border border-[#616161]/15 px-3 py-2 rounded-xl transition-all duration-300 hover:bg-white/[0.04] hover:border-[#616161]/30 min-w-0">
                        <Gauge className="w-3.5 h-3.5 text-[#C8A64D] shrink-0" strokeWidth={1.5} />
                        <div className="min-w-0 flex-1">
                            <p className="text-[8px] text-gray-500 uppercase tracking-widest leading-none mb-1">Mileage</p>
                            <p className="text-xs font-semibold text-white font-nexa truncate">
                                {car.mileage != null ? `${Number(car.mileage).toLocaleString('en-US')} km` : '—'}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2.5 bg-white/[0.01] border border-[#616161]/15 px-3 py-2 rounded-xl transition-all duration-300 hover:bg-white/[0.04] hover:border-[#616161]/30 min-w-0">
                        <Car className="w-3.5 h-3.5 text-[#C8A64D] shrink-0" strokeWidth={1.5} />
                        <div className="min-w-0 flex-1">
                            <p className="text-[8px] text-gray-500 uppercase tracking-widest leading-none mb-1">Gearbox</p>
                            <p className="text-xs font-semibold text-white font-nexa capitalize truncate">
                                {car.transmission_type || 'Automatic'}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2.5 bg-white/[0.01] border border-[#616161]/15 px-3 py-2 rounded-xl transition-all duration-300 hover:bg-white/[0.04] hover:border-[#616161]/30 min-w-0">
                        <Fuel className="w-3.5 h-3.5 text-[#C8A64D] shrink-0" strokeWidth={1.5} />
                        <div className="min-w-0 flex-1">
                            <p className="text-[8px] text-gray-500 uppercase tracking-widest leading-none mb-1">Fuel Type</p>
                            <p className="text-xs font-semibold text-white font-nexa capitalize truncate">
                                {car.fuel_type || 'Petrol'}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2.5 bg-white/[0.01] border border-[#616161]/15 px-3 py-2 rounded-xl transition-all duration-300 hover:bg-white/[0.04] hover:border-[#616161]/30 min-w-0">
                        <Calendar className="w-3.5 h-3.5 text-[#C8A64D] shrink-0" strokeWidth={1.5} />
                        <div className="min-w-0 flex-1">
                            <p className="text-[8px] text-gray-500 uppercase tracking-widest leading-none mb-1">Production</p>
                            <p className="text-xs font-semibold text-white font-nexa truncate">
                                {car.year || '—'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-2">
                    <button
                        onClick={() => onInterested?.(car)}
                        className="flex-1 order-2 sm:order-1 flex items-center justify-center py-3 px-4 rounded-lg border border-[#C8A64D]/50 text-[#C8A64D] bg-transparent hover:bg-[#C8A64D]/5 active:bg-[#C8A64D]/10 font-bold font-nexa text-[11px] tracking-[0.15em] uppercase transition-all duration-300 outline-none"
                    >
                        Interested
                    </button>
                    <Link href={'/car-details/' + car?.slug}
                        className="flex-1 order-1 sm:order-2 relative overflow-hidden rounded-lg p-[1px] group/btn outline-none transition-all duration-300 hover:shadow-[0_0_30px_rgba(200,166,77,0.3)]"
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-[#C8A64D] via-[#e0be67] to-[#C8A64D] rounded-lg" />
                        <span className="relative flex items-center justify-center bg-gradient-to-r from-[#C8A64D] to-[#e0be67] group-hover/btn:brightness-105 active:scale-[0.99] text-[#1F1F1F] font-bold font-nexa text-[11px] py-3 px-5 rounded-lg transition-all duration-300 tracking-[0.15em] uppercase w-full h-full">
                            View Details
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
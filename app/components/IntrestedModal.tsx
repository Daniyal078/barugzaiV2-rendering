'use client'
import { api_base_url } from "@/lib/utils"
import { Phone, X } from "lucide-react"
import { useEffect } from "react"

const STORAGE_BASE = api_base_url + '/storage/app/public'

function storageUrl(path?: string | null): string | undefined {
    if (!path) return undefined
    if (path.startsWith('http')) return path
    return `${STORAGE_BASE}/${path.replace(/^\//, '')}`
}
function cleanPhone(phone?: string | null): string {
    return (phone ?? '').replace(/[\s\-\(\)]/g, '')
}
interface InterestedModalProps {
    car: any
    onClose: () => void
    onTrack: (type: 'call' | 'whatsapp', carId: number, sellerId?: number) => void
}

export default function InterestedModal({ car, onClose, onTrack }: InterestedModalProps) {
    const carTitle = car.title
        || `${car.manufacturer?.title ?? ''} ${car.car_model?.name ?? ''}`.trim()
    const carImage = storageUrl(car.featured_image) || ''

    const phone = cleanPhone(car.seller?.phone ?? car.phone ?? car.contact_phone)
    const waNumber = cleanPhone(car.seller?.whatsapp ?? car.seller?.phone ?? car.phone ?? car.contact_phone)
    // console.log(car)
    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
        document.addEventListener('keydown', handler)
        return () => document.removeEventListener('keydown', handler)
    }, [onClose])

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => { document.body.style.overflow = '' }
    }, [])

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
            onClick={onClose}
        >
            <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition"
                    aria-label="Close">
                    <X className="w-4 h-4" />
                </button>

                <div className="flex flex-col items-center px-8 pt-10 pb-8 text-center">
                    <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-[#C8A64D]/30 shadow-lg mb-6 shrink-0">
                        <img src={carImage} alt={carTitle} className="w-full h-full object-cover" />
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 leading-snug mb-8">
                        Interested in <span className="text-[#C8A64D]">{carTitle}</span>?
                    </h2>

                    <div className="flex flex-col gap-3 w-full">
                        <a href={phone ? `tel:${phone}` : undefined}
                            onClick={() => onTrack('call', car.id, car.seller_id)}
                            className="flex items-center justify-center gap-3 w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm uppercase tracking-widest transition shadow-md"
                        >
                            <Phone className="w-4 h-4" /> Call Now
                        </a>

                        <a href={waNumber ? `https://wa.me/+${waNumber}` : undefined}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => onTrack('whatsapp', car.id, car.seller_id)}
                            className="flex items-center justify-center gap-3 w-full py-3.5 rounded-xl border border-[#1ebe5d] hover:bg-[#1ebe5d] text-white font-bold text-sm uppercase tracking-widest transition shadow-md"
                        >
                            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Whatsapp
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
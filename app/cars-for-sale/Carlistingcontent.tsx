/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import Navbar from '../components/Navbar'
import { Search, ChevronDown, ChevronLeft, ChevronRight, SlidersHorizontal, RotateCcw, Check } from 'lucide-react'
import CarsGrid from '../components/CarsGrid'
import {
    PER_PAGE,
    toArray,
    parseIds,
    FilterOptions,
    PaginationMeta,
} from '@/lib/lib'
import { api_base_url } from '@/lib/utils'

interface PageBtnProps {
    p: number
    currentPage: number
    onPageChange: (page: number) => void
}

function PageBtn({ p, currentPage, onPageChange }: PageBtnProps) {
    return (
        <button
            onClick={() => onPageChange(p)}
            className={`w-9 h-9 rounded-md text-sm font-medium border transition-colors
                ${p === currentPage
                    ? 'bg-[#C8A64D] text-[#1F1F1F] border-[#C8A64D] font-bold'
                    : 'bg-transparent border-[#616161] text-gray-300 hover:bg-[#616161] hover:text-white'
                }`}
        >
            {p}
        </button>
    )
}

interface CarListingContentProps {
    initialCars: any[]
    initialMeta: PaginationMeta
    initialFilterOptions: FilterOptions
    initialModels: any[]
}

export default function CarListingContent({
    initialCars,
    initialMeta,
    initialFilterOptions,
    initialModels,
}: CarListingContentProps) {
    const router = useRouter()
    const pathname = usePathname()
    const sp = useSearchParams()

    const spKey = sp.toString()

    const [search, setSearch] = useState(() => sp.get('search') || '')
    const [selectedManufacturers, setSelectedManufacturers] = useState<number[]>(() => parseIds(sp.get('manufacturer_ids')))
    const [selectedModels, setSelectedModels] = useState<number[]>(() => parseIds(sp.get('model_ids')))
    const [yearFrom, setYearFrom] = useState(() => sp.get('year_from') || '')
    const [yearTo, setYearTo] = useState(() => sp.get('year_to') || '')
    const [priceFrom, setPriceFrom] = useState(() => sp.get('price_from') || '')
    const [priceTo, setPriceTo] = useState(() => sp.get('price_to') || '')
    const [mileageFrom, setMileageFrom] = useState(() => sp.get('mileage_from') || '')
    const [mileageTo, setMileageTo] = useState(() => sp.get('mileage_to') || '')
    const [condition, setCondition] = useState(() => sp.get('condition') || '')
    const [fuelType, setFuelType] = useState(() => sp.get('fuel_type') || '')
    const [transmission, setTransmission] = useState(() => sp.get('transmission') || '')
    const [sort, setSort] = useState(() => sp.get('sort') || '')

    // Seeded from the server-rendered fetch — real data is already on screen
    // for the very first paint, so `loading` starts false instead of true.
    const [cars, setCars] = useState<any[]>(initialCars)
    const [loading, setLoading] = useState(false)
    const [meta, setMeta] = useState<PaginationMeta | null>(initialMeta)
    const [filterOptions] = useState<FilterOptions>(initialFilterOptions)

    const [availableModels, setAvailableModels] = useState<any[]>(initialModels)
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false)
    const modelDropdownRef = useRef<HTMLDivElement>(null)

    // Both data-fetching effects below run on every spKey (search params) change,
    // but the server already fetched matching data for the *initial* spKey before
    // this component ever mounted — so we skip the first run of each to avoid a
    // redundant duplicate fetch and a loading flicker on first paint.
    const isFirstCarsFetch = useRef(true)
    const isFirstModelsFetch = useRef(true)

    // Sync elements when URL updates dynamically
    useEffect(() => {
        setSelectedManufacturers(parseIds(sp.get('manufacturer_ids')))
        setSelectedModels(parseIds(sp.get('model_ids')))
    }, [spKey])

    // Close model dropdown on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (modelDropdownRef.current && !modelDropdownRef.current.contains(event.target as Node)) {
                setIsModelDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const manufacturerIdParam = sp.get('manufacturer_ids')
    useEffect(() => {
        if (isFirstModelsFetch.current) {
            isFirstModelsFetch.current = false
            return
        }
        const mfrIds = parseIds(manufacturerIdParam)
        if (mfrIds.length === 1) {
            fetch(`${api_base_url}/api/v1/manufacturers/${mfrIds[0]}/models`)
                .then(r => r.json())
                .then(data => setAvailableModels(toArray(data)))
                .catch(console.error)
        } else {
            setAvailableModels([])
        }
    }, [manufacturerIdParam])

    useEffect(() => {
        if (isFirstCarsFetch.current) {
            isFirstCarsFetch.current = false
            return
        }

        setLoading(true)

        const params = new URLSearchParams()

        const s = sp.get('search')
        const mfrIds = parseIds(sp.get('manufacturer_ids'))
        const modelIds = parseIds(sp.get('model_ids'))
        const yFrom = sp.get('year_from')
        const yTo = sp.get('year_to')
        const pFrom = sp.get('price_from')
        const pTo = sp.get('price_to')
        const mFrom = sp.get('mileage_from')
        const mTo = sp.get('mileage_to')
        const cond = sp.get('condition')
        const fuel = sp.get('fuel_type')
        const trans = sp.get('transmission')
        const sortVal = sp.get('sort')
        const pageVal = Math.max(1, parseInt(sp.get('page') || '1') || 1)

        if (s) params.append('search', s)
        mfrIds.forEach(id => params.append('manufacturer[]', String(id)))
        modelIds.forEach(id => params.append('model[]', String(id)))
        if (yFrom) params.append('year_from', yFrom)
        if (yTo) params.append('year_to', yTo)
        if (pFrom) params.append('price_from', pFrom)
        if (pTo) params.append('price_to', pTo)
        if (mFrom) params.append('mileage_from', mFrom)
        if (mTo) params.append('mileage_to', mTo)
        if (cond) params.append('condition', cond)
        if (fuel) params.append('fuel_type', fuel)
        if (trans) params.append('transmission', trans)
        if (sortVal) params.append('sort', sortVal)
        params.append('per_page', String(PER_PAGE))
        params.append('page', String(pageVal))

        fetch(`${api_base_url}/api/v1/cars?${params.toString()}`)
            .then(r => r.json())
            .then(data => {
                setCars(toArray(data.data))
                setMeta({
                    current_page: data.current_page ?? 1,
                    last_page: data.last_page ?? 1,
                    total: data.total ?? 0,
                    from: data.from ?? null,
                    to: data.to ?? null,
                })
            })
            .catch(console.error)
            .finally(() => setLoading(false))

    }, [spKey])

    const handleApply = () => {
        const params = new URLSearchParams()

        if (search) params.set('search', search)
        if (selectedManufacturers.length) params.set('manufacturer_ids', selectedManufacturers.join(','))
        if (selectedModels.length) params.set('model_ids', selectedModels.join(','))
        if (yearFrom) params.set('year_from', yearFrom)
        if (yearTo) params.set('year_to', yearTo)
        if (priceFrom) params.set('price_from', priceFrom)
        if (priceTo) params.set('price_to', priceTo)
        if (mileageFrom) params.set('mileage_from', mileageFrom)
        if (mileageTo) params.set('mileage_to', mileageTo)
        if (condition) params.set('condition', condition)
        if (fuelType) params.set('fuel_type', fuelType)
        if (transmission) params.set('transmission', transmission)
        if (sort) params.set('sort', sort)

        const qs = params.toString()
        router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
        setIsFilterOpen(false)
    }

    const handleReset = () => {
        setSearch(''); setSelectedManufacturers([]); setSelectedModels([])
        setYearFrom(''); setYearTo('');
        setPriceFrom(''); setPriceTo('')
        setMileageFrom(''); setMileageTo('');
        setCondition(''); setFuelType('');
        setTransmission(''); setSort('latest')
        setAvailableModels([])
        router.replace(pathname, { scroll: false })
    }

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(sp.toString())
        if (newPage <= 1) {
            params.delete('page')
        } else {
            params.set('page', String(newPage))
        }
        const qs = params.toString()
        router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleManufacturerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value
        if (!val) {
            setSelectedManufacturers([]); setSelectedModels([]); setAvailableModels([])
            return
        }
        const id = parseInt(val)
        setSelectedManufacturers([id]); setSelectedModels([])
        fetch(`${api_base_url}/api/v1/manufacturers/${id}/models`)
            .then(r => r.json())
            .then(data => setAvailableModels(toArray(data)))
            .catch(console.error)
    }

    const handleModelCheckboxChange = (modelId: number) => {
        if (selectedModels.includes(modelId)) {
            setSelectedModels(selectedModels.filter(id => id !== modelId))
        } else {
            setSelectedModels([...selectedModels, modelId])
        }
    }

    const getModelDropdownLabel = () => {
        if (availableModels.length === 0) return 'All Models'
        if (selectedModels.length === 0) return 'All Models'
        if (selectedModels.length === 1) {
            const match = availableModels.find((m: any) => m.id === selectedModels[0])
            return match ? (match.name || match.title) : '1 Model Selected'
        }
        return `${selectedModels.length} Models Selected`
    }

    const currentPage = Math.max(1, parseInt(sp.get('page') || '1') || 1)

    const renderPagination = () => {
        if (!meta || meta.last_page <= 1) return null
        const { current_page, last_page, total, from, to } = meta
        const delta = 2
        const pages: number[] = []
        for (let i = Math.max(1, current_page - delta); i <= Math.min(last_page, current_page + delta); i++) {
            pages.push(i)
        }

        return (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-6 border-t border-[#616161]">
                <p className="text-sm text-gray-400">
                    Showing{' '}
                    <span className="text-white font-medium">{(from ?? 0).toLocaleString('en-US')}</span>
                    {' – '}
                    <span className="text-white font-medium">{(to ?? 0).toLocaleString('en-US')}</span>
                    {' of '}
                    <span className="text-white font-medium">{total.toLocaleString('en-US')}</span>
                </p>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => handlePageChange(current_page - 1)}
                        disabled={current_page === 1}
                        className="p-2 rounded-md border border-[#616161] text-gray-400 hover:text-white hover:bg-[#616161] disabled:opacity-30 disabled:cursor-not-allowed transition"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>

                    {pages[0] > 1 && (
                        <>
                            <PageBtn p={1} currentPage={currentPage} onPageChange={handlePageChange} />
                            {pages[0] > 2 && <span className="text-[#616161] px-1 select-none">…</span>}
                        </>
                    )}

                    {pages.map(p => (
                        <PageBtn key={p} p={p} currentPage={currentPage} onPageChange={handlePageChange} />
                    ))}

                    {pages[pages.length - 1] < last_page && (
                        <>
                            {pages[pages.length - 1] < last_page - 1 && (
                                <span className="text-[#616161] px-1 select-none">…</span>
                            )}
                            <PageBtn p={last_page} currentPage={currentPage} onPageChange={handlePageChange} />
                        </>
                    )}

                    <button
                        onClick={() => handlePageChange(current_page + 1)}
                        disabled={current_page === last_page}
                        className="p-2 rounded-md border border-[#616161] text-gray-400 hover:text-white hover:bg-[#616161] disabled:opacity-30 disabled:cursor-not-allowed transition"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        )
    }

    const inputCls = "w-full appearance-none bg-[#1F1F1F] border border-[#616161] text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#C8A64D] transition placeholder-gray-500"

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white antialiased">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">

                <div className="mb-10 mt-28">
                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="w-full flex items-center justify-between bg-[#1F1F1F] border border-[#616161] rounded-xl p-4 text-white hover:border-[#C8A64D] transition-colors shadow-lg"
                    >
                        <div className="flex items-center gap-3">
                            <SlidersHorizontal className="w-5 h-5 text-[#C8A64D]" />
                            <span className="font-semibold tracking-wide uppercase text-sm">Advanced Search & Filters</span>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isFilterOpen ? 'max-h-250 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                        <div className="bg-[#1F1F1F] border border-[#616161] rounded-xl p-6 shadow-2xl">

                            {/* Search + Sort row */}
                            <div className="flex flex-col md:flex-row gap-4 mb-6">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        placeholder="Search by title or description..."
                                        value={search}
                                        onChange={e => setSearch(e.target.value)}
                                        onKeyDown={e => e.key === 'Enter' && handleApply()}
                                        className={`${inputCls} pl-11`}
                                    />
                                </div>
                                <div className="w-full md:w-64 relative">
                                    <select value={sort} onChange={e => setSort(e.target.value)} className={`${inputCls} cursor-pointer`}>
                                        <option value="">Sort: Default Order</option>
                                        <option value="oldest">Sort: Oldest</option>
                                        <option value="price_asc">Price: Low to High</option>
                                        <option value="price_desc">Price: High to Low</option>
                                        <option value="mileage_asc">Mileage: Low to High</option>
                                        <option value="mileage_desc">Mileage: High to Low</option>
                                        <option value="year_asc">Year: Oldest to Newest</option>
                                        <option value="year_desc">Year: Newest to Oldest</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                                </div>
                            </div>

                            {/* Filters Row (Makes, Models, Fuel, Transmission) */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                <div className="relative">
                                    <select value={selectedManufacturers[0] ?? ''} onChange={handleManufacturerChange} className={inputCls}>
                                        <option value="">All Makes</option>
                                        {filterOptions.manufacturers.map(m => (
                                            <option key={m.id} value={m.id}>{m.title}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                                </div>
                                {/* Custom Multi-Select Checkbox Dropdown for Models */}
                                <div className="" ref={modelDropdownRef}>
                                    <button
                                        type="button"
                                        disabled={availableModels.length === 0}
                                        onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                                        className={`${inputCls} flex items-center justify-between text-left disabled:opacity-40 disabled:cursor-not-allowed`}
                                    >
                                        <span className="truncate">{getModelDropdownLabel()}</span>
                                        <ChevronDown className="w-4 h-4 text-gray-400 ml-2 flex-shrink-0" />
                                    </button>

                                    {isModelDropdownOpen && availableModels.length > 0 && (
                                        <div className="absolute z-50 mt-1 w-auto md:w-70 overflow-auto max-h-60 overflow-y-auto bg-[#1F1F1F] border border-[#616161] rounded-lg shadow-xl py-1">
                                            {availableModels.map((m: any) => {
                                                const isChecked = selectedModels.includes(m.id)
                                                return (
                                                    <label
                                                        key={m.id}
                                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-200 hover:bg-[#2a2a2a] cursor-pointer transition-colors select-none"
                                                    >
                                                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors
                                                            ${isChecked 
                                                                ? 'bg-[#C8A64D] border-[#C8A64D] text-[#1F1F1F]' 
                                                                : 'border-[#616161] bg-transparent'
                                                            }`}
                                                        >
                                                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                                                        </div>
                                                        <input
                                                            type="checkbox"
                                                            checked={isChecked}
                                                            onChange={() => handleModelCheckboxChange(m.id)}
                                                            className="hidden"
                                                        />
                                                        <span className="truncate">{m.name || m.title}</span>
                                                    </label>
                                                )
                                            })}
                                        </div>
                                    )}
                                </div>

                                <div className="relative">
                                    <select value={fuelType} onChange={e => setFuelType(e.target.value)} className={inputCls}>
                                        <option value="">Fuel Type</option>
                                        {filterOptions.fuel_types.map(f => (
                                            <option key={f} value={f}>{f.charAt(0).toUpperCase() + f.slice(1)}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                                </div>
                                <div className="relative">
                                    <select value={transmission} onChange={e => setTransmission(e.target.value)} className={inputCls}>
                                        <option value="">Transmission</option>
                                        {filterOptions.transmissions.map(t => (
                                            <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                                </div>
                            </div>

                            {/* Range inputs */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div>
                                    <label className="block text-[10px] text-[#C8A64D] uppercase mb-2 ml-1">Year Range</label>
                                    <div className="flex gap-3">
                                        <input type="number" placeholder="From" value={yearFrom} onChange={e => setYearFrom(e.target.value)} className={inputCls} />
                                        <input type="number" placeholder="To" value={yearTo} onChange={e => setYearTo(e.target.value)} className={inputCls} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] text-[#C8A64D] uppercase mb-2 ml-1">Price (AED)</label>
                                    <div className="flex gap-3">
                                        <input type="number" placeholder="Min" value={priceFrom} onChange={e => setPriceFrom(e.target.value)} className={inputCls} />
                                        <input type="number" placeholder="Max" value={priceTo} onChange={e => setPriceTo(e.target.value)} className={inputCls} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] text-[#C8A64D] uppercase mb-2 ml-1">Mileage (KM)</label>
                                    <div className="flex gap-3">
                                        <input type="number" placeholder="Min" value={mileageFrom} onChange={e => setMileageFrom(e.target.value)} className={inputCls} />
                                        <input type="number" placeholder="Max" value={mileageTo} onChange={e => setMileageTo(e.target.value)} className={inputCls} />
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end gap-4 border-t border-[#616161] pt-6">
                                <button
                                    onClick={handleReset}
                                    className="flex items-center gap-2 px-6 py-3 bg-transparent border border-[#616161] rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-[#616161] transition"
                                >
                                    <RotateCcw className="w-4 h-4" /> Reset
                                </button>
                                <button
                                    onClick={handleApply}
                                    className="px-10 py-3 bg-[#C8A64D] text-[#1F1F1F] rounded-lg text-sm font-bold uppercase tracking-widest hover:bg-opacity-90 transition shadow-lg"
                                >
                                    Apply Filters
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-20 text-[#C8A64D] font-semibold animate-pulse tracking-widest text-lg">
                        LOADING VEHICLES...
                    </div>
                ) : cars.length === 0 ? (
                    <div className="text-center py-20 text-gray-400 border border-dashed border-[#616161] rounded-xl bg-[#1F1F1F]">
                        No vehicles match your search criteria. Try adjusting your filters.
                    </div>
                ) : (
                    <>
                        <CarsGrid cars={cars} />
                        {renderPagination()}
                    </>
                )}
            </div>
        </div>
    )
}
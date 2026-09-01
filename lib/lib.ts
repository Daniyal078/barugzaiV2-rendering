// lib.ts
// Shared constants, types, and helpers for the car listing page.
// Used by both page.tsx (Server Component) and CarListingContent.tsx (Client Component).

export const PER_PAGE = 12

export function toArray<T = any>(val: any): T[] {
    if (Array.isArray(val)) return val as T[]
    if (val && typeof val === 'object') {
        const obj = val as Record<string, any>
        if (Array.isArray(obj.data)) return obj.data as T[]
        if (Array.isArray(obj.models)) return obj.models as T[]
        if (Array.isArray(obj.items)) return obj.items as T[]
    }
    return []
}

export function parseIds(str: string | null | undefined): number[] {
    if (!str) return []
    return str.split(',').map(Number).filter(n => Number.isFinite(n) && n > 0)
}

export interface FilterOptions {
    manufacturers: { id: number; title: string; slug: string }[]
    fuel_types: string[]
    transmissions: string[]
    conditions: string[]
}

export interface PaginationMeta {
    current_page: number
    last_page: number
    total: number
    from: number | null
    to: number | null
}

// A single, framework-agnostic version of "which filters are active" that can be
// built from either a URLSearchParams (client) or a plain searchParams object (server).
export interface CarQuery {
    search: string | null
    manufacturer_ids: string | null
    model_ids: string | null
    year_from: string | null
    year_to: string | null
    price_from: string | null
    price_to: string | null
    mileage_from: string | null
    mileage_to: string | null
    condition: string | null
    fuel_type: string | null
    transmission: string | null
    sort: string | null
    page: string | null
}

export function buildCarsApiParams(q: CarQuery): URLSearchParams {
    const params = new URLSearchParams()

    const mfrIds = parseIds(q.manufacturer_ids)
    const modelIds = parseIds(q.model_ids)
    const pageVal = Math.max(1, parseInt(q.page || '1') || 1)

    if (q.search) params.append('search', q.search)
    mfrIds.forEach(id => params.append('manufacturer[]', String(id)))
    modelIds.forEach(id => params.append('model[]', String(id)))
    if (q.year_from) params.append('year_from', q.year_from)
    if (q.year_to) params.append('year_to', q.year_to)
    if (q.price_from) params.append('price_from', q.price_from)
    if (q.price_to) params.append('price_to', q.price_to)
    if (q.mileage_from) params.append('mileage_from', q.mileage_from)
    if (q.mileage_to) params.append('mileage_to', q.mileage_to)
    if (q.condition) params.append('condition', q.condition)
    if (q.fuel_type) params.append('fuel_type', q.fuel_type)
    if (q.transmission) params.append('transmission', q.transmission)
    if (q.sort) params.append('sort', q.sort)
    params.append('per_page', String(PER_PAGE))
    params.append('page', String(pageVal))

    return params
}

export function metaFromApiResponse(data: any): PaginationMeta {
    return {
        current_page: data?.current_page ?? 1,
        last_page: data?.last_page ?? 1,
        total: data?.total ?? 0,
        from: data?.from ?? null,
        to: data?.to ?? null,
    }
}

// Next.js 15's `searchParams` prop resolves to Record<string, string | string[] | undefined>.
// This pulls a single string value out regardless of whether it arrived as one value or many.
export function spGet(sp: Record<string, string | string[] | undefined>, key: string): string | null {
    const v = sp[key]
    if (Array.isArray(v)) return v[0] ?? null
    return v ?? null
}
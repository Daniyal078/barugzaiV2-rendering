/* eslint-disable @typescript-eslint/no-explicit-any */
// page.tsx — Server Component (no 'use client')
// This runs on the server for every request, fetches the car list + filter
// options + (if relevant) models, and streams that data down as real HTML.
// That's what lets Google/Bing/LLM crawlers see actual listings instead of
// "LOADING...". All interactivity still lives in CarListingContent (client).

import { getSeoData } from '@/lib/utils/getSeo'
import CarListingContent from './Carlistingcontent'
import {
    toArray,
    parseIds,
    buildCarsApiParams,
    metaFromApiResponse,
    spGet,
    FilterOptions,
    PaginationMeta,
} from '@/lib/lib'
import { Metadata } from 'next'
import { api_base_url } from '@/lib/utils'

// Using `searchParams` automatically opts this route into dynamic (per-request)
// rendering in the App Router, which is what we want here — filters/pagination
// change the fetched data. No need to also set `export const dynamic`.

type SearchParams = Record<string, string | string[] | undefined>

async function safeJson(url: string, revalidate?: number) {
    try {
        const res = await fetch(url, revalidate !== undefined
            ? { next: { revalidate } }
            : { cache: 'no-store' })
        if (!res.ok) return null
        return await res.json()
    } catch (err) {
        console.error('Fetch failed:', url, err)
        return null
    }
}

export async function generateMetadata(): Promise<Metadata> {
    const currentSlug = '/cars-for-sale';

    const seo = await getSeoData(currentSlug);

    if (!seo) {
        return {
            title: "Barugzai Motors | Luxury VIP Vans Dubai",
            description: "Default premium car customization description.",
        };
    }

    return {
        title: seo.meta_title,
        description: seo.meta_description,
        keywords: seo.meta_keywords || undefined,
        alternates: {
            canonical: seo.canonical_url,
        },
        robots: seo.robots, openGraph: {
            title: seo.og_title || seo.meta_title,
            description: seo.og_description || seo.meta_description,
            type: seo.og_type || 'website',
            url: seo.canonical_url,
            images: seo.og_image ? [{ url: seo.og_image }] : undefined,
        },
    };
}

export default async function CarListingPage({
    searchParams,
}: {
    searchParams: Promise<SearchParams>
}) {
    const sp = await searchParams

    const query = {
        search: spGet(sp, 'search'),
        manufacturer_ids: spGet(sp, 'manufacturer_ids'),
        model_ids: spGet(sp, 'model_ids'),
        year_from: spGet(sp, 'year_from'),
        year_to: spGet(sp, 'year_to'),
        price_from: spGet(sp, 'price_from'),
        price_to: spGet(sp, 'price_to'),
        mileage_from: spGet(sp, 'mileage_from'),
        mileage_to: spGet(sp, 'mileage_to'),
        condition: spGet(sp, 'condition'),
        fuel_type: spGet(sp, 'fuel_type'),
        transmission: spGet(sp, 'transmission'),
        sort: spGet(sp, 'sort'),
        page: spGet(sp, 'page'),
    }

    const apiParams = buildCarsApiParams(query)
    const mfrIds = parseIds(query.manufacturer_ids)

    // Fire all server-side requests in parallel.
    const [carsData, filterData, modelsData] = await Promise.all([
        safeJson(`${api_base_url}/api/v1/cars?${apiParams.toString()}`),
        safeJson(`${api_base_url}/api/v1/cars/filter-options`, 3600), // filter options change rarely — cache 1hr
        mfrIds.length === 1
            ? safeJson(`${api_base_url}/api/v1/manufacturers/${mfrIds[0]}/models`)
            : Promise.resolve(null),
    ])

    const initialCars = toArray(carsData?.data)
    const initialMeta: PaginationMeta = metaFromApiResponse(carsData)
    const initialFilterOptions: FilterOptions = {
        manufacturers: toArray(filterData?.manufacturers),
        fuel_types: toArray(filterData?.fuel_types),
        transmissions: toArray(filterData?.transmissions),
        conditions: toArray(filterData?.conditions),
    }
    const initialModels = modelsData ? toArray(modelsData) : []

    return (
        <CarListingContent
            initialCars={initialCars}
            initialMeta={initialMeta}
            initialFilterOptions={initialFilterOptions}
            initialModels={initialModels}
        />
    )
}
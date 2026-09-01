import { api_base_url } from "../utils";

export async function getSeoData(slug: string) {
    try {
        // API Call (Aapka actual URL yahan aayega)
        const res = await fetch(`${api_base_url}/api/v1/seo?slug=${slug}`, {
            next: { revalidate: 3600 } // Optional: 1 ghante ke liye cache karne ke liye
        });

        if (res.status === 404) return null;
        if (!res.ok) throw new Error('Failed to fetch SEO data');

        return await res.json();
    } catch (error) {
        console.error("SEO Fetch Error:", error);
        return null;
    }
}
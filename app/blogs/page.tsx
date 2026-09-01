/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Navbar from "../components/Navbar";
import { getSeoData } from "@/lib/utils/getSeo";
import { Metadata } from "next";
import { api_base_url } from "@/lib/utils";


async function getBlogs(category: string, page: number) {
    const url = new URL(api_base_url + '/api/v1/blogs');

    if (category && category !== 'all') {
        url.searchParams.append('category', category);
    }

    url.searchParams.append('page', page.toString());
    url.searchParams.append('per_page', '12');

    const res = await fetch(url.toString(), { cache: 'no-store' });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

export async function generateMetadata(): Promise<Metadata> {
    const currentSlug = '/blogs';

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


export default async function BlogPage(props: { searchParams?: Promise<{ [key: string]: string | string[] | undefined }> }) {

    const searchParams = await props.searchParams;
    const rawCategory = Array.isArray(searchParams?.category) ? searchParams?.category[0] : searchParams?.category;
    const activeCategory = rawCategory || 'all';
    const rawPage = Array.isArray(searchParams?.page) ? searchParams?.page[0] : searchParams?.page;
    const currentPage = parseInt(rawPage || '1', 10);
    const responseData = await getBlogs(activeCategory, currentPage);
    const filteredBlogs = responseData?.blogs?.data || [];
    const categories = responseData?.BlogCategories || [];
    const lastPage = responseData?.blogs?.last_page || 1;

    return (
        <>
            <Navbar />
            <section className="bg-neutral-950 min-h-screen">
                <div className="max-w-7xl mx-auto px-6 py-12 text-white mt-20">

                    {/* Header Section */}
                    <div className="mb-10">
                        <h1 className="text-4xl font-bold border-l-4 border-yellow-500 pl-4 mb-6">
                            Latest Insights
                        </h1>

                        {/* Interactive Categories Section */}
                        <div className="flex flex-wrap gap-3 mt-6">
                            <Link
                                href="/blogs"
                                className={`px-5 py-2 text-sm rounded-full transition-all border ${activeCategory === 'all'
                                    ? 'bg-yellow-500 text-neutral-950 font-medium border-yellow-500'
                                    : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-yellow-500 hover:text-white'
                                    }`}>
                                All
                            </Link>
                            {categories.map((category: any) => (
                                <Link
                                    key={category.id}
                                    href={`/blogs?category=${category.slug}`}
                                    className={`px-5 py-2 text-sm rounded-full transition-all border ${activeCategory === category.slug
                                        ? 'bg-yellow-500 text-neutral-950 font-medium border-yellow-500'
                                        : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-yellow-500 hover:text-white'
                                        }`}
                                >
                                    {category.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Blogs Grid Section */}
                    {filteredBlogs.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredBlogs.map((blog: any) => (
                                    <Link
                                        href={`/blogs/${blog?.slug}`}
                                        key={blog?.id}
                                        className="group bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-yellow-500 transition-all flex flex-col"
                                    >
                                        <div className="w-full h-48 bg-neutral-800 overflow-hidden relative">
                                            {blog?.featured_image_url ? (
                                                <img
                                                    src={blog.featured_image_url}
                                                    alt={`${blog?.title ?? 'Blog image'}`}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-neutral-600">
                                                    No Image Available
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-6 flex flex-col flex-grow">
                                            <span className="text-yellow-500 text-xs uppercase tracking-widest font-semibold">
                                                {typeof blog?.category === 'object' && blog?.category !== null && 'name' in blog.category
                                                    ? (blog.category as { name: string }).name
                                                    : blog?.category}
                                            </span>

                                            <h2 className="text-xl font-semibold mt-2 mb-4 group-hover:text-yellow-400 line-clamp-2">
                                                {blog?.title}
                                            </h2>

                                            <p className="text-sm text-neutral-400 mb-6 line-clamp-2 flex-grow">
                                                {blog?.excerpt?.replace(/<[^>]+>/g, '')}
                                            </p>

                                            <div className="flex justify-between items-center text-neutral-500 text-xs mt-auto border-t border-neutral-800 pt-4">
                                                <div className="flex items-center gap-2">
                                                    <span>{blog?.author_name}</span>
                                                    <span>•</span>
                                                    <span>{blog?.published_at ? new Date(blog.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                                                    </span>
                                                </div>
                                                <span>👁️ {blog?.views_count || 0}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* Pagination Section */}
                            {lastPage > 1 && (
                                <div className="flex justify-center items-center gap-4 mt-12">
                                    {currentPage > 1 ? (
                                        <Link
                                            href={`/blogs?category=${activeCategory}&page=${currentPage - 1}`}
                                            className="px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-300 hover:border-yellow-500 hover:text-white transition-all"
                                        >
                                            Previous
                                        </Link>
                                    ) : (
                                        <button disabled className="px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-600 cursor-not-allowed">
                                            Previous
                                        </button>
                                    )}

                                    <span className="text-neutral-400 text-sm">
                                        Page <strong className="text-white">{currentPage}</strong> of <strong className="text-white">{lastPage}</strong>
                                    </span>

                                    {currentPage < lastPage ? (
                                        <Link
                                            href={`/blogs?category=${activeCategory}&page=${currentPage + 1}`}
                                            className="px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-300 hover:border-yellow-500 hover:text-white transition-all"
                                        >
                                            Next
                                        </Link>
                                    ) : (
                                        <button disabled className="px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-600 cursor-not-allowed">
                                            Next
                                        </button>
                                    )}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-20 bg-neutral-900 border border-neutral-800 rounded-2xl">
                            <h3 className="text-xl text-neutral-400 font-medium">No articles found in this category.</h3>
                            <p className="text-neutral-500 mt-2">Try selecting a different category to explore more content.</p>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import Navbar from "@/app/components/Navbar";
import { api_base_url } from "@/lib/utils";
import { Metadata } from "next";
import { redirect, RedirectType } from "next/navigation";
import ViewTracker from "../ViewTracker";

type PageProps = {
    params: Promise<{ slug: string }>;
};

async function getBlog(slug: string) {
    try {
        const res = await fetch(`${api_base_url}/api/v1/blogs/${slug}`, {
            cache: 'no-store'
        });
        if (!res.ok) {
            console.log(`Failed to fetch blog: Status ${res.status}`);
            return null;
        }
        return await res.json();
    } catch (error) {
        console.error('Error fetching blog data:', error);
        return null;
    }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;

    try {
        const data = await getBlog(slug);
        const blog = data.blog;

        return {
            title: blog.meta_title || blog.title,
            description: blog.meta_description || blog.excerpt,
            alternates: {
                canonical: blog.canonical_url || undefined,
            },
            openGraph: {
                title: blog.og_title || blog.meta_title || blog.title,
                description: blog.og_description || blog.meta_description || blog.excerpt,
                url: blog.canonical_url || undefined,
                type: "article",
                images: blog.og_image ? [{ url: blog.og_image }] : (blog.featured_image_url ? [{ url: blog.featured_image_url }] : []),
            },
            robots: {
                index: !blog.noindex,
                follow: !blog.noindex,
            },
        };
    } catch (error) {
        return {
            title: "Blog Post | Barugzai Motors",
            description: "Read our latest blog post.",
        };
    }
}

export default async function SingleBlog({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const data = await getBlog(slug);
    if (!data || !data.blog) {
        redirect('/blogs', RedirectType.Permanent);
    }
    const blog = data.blog;

    return (
        <>
            {/* ViewTracker component handles client-side scroll tracking silently */}
            <ViewTracker slug={slug} />
            <Navbar />
            <section className="bg-neutral-950">
                <article className="max-w-7xl mx-auto px-6 py-16 mt-20 text-white">
                    <div className="mb-8">
                        <span className="text-yellow-500 font-semibold uppercase tracking-widest text-sm">
                            {blog?.category?.name}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-extrabold mt-2 mb-6 leading-tight">
                            {blog?.title}
                        </h1>
                        <div className="flex items-center text-neutral-400 text-sm gap-4">
                            <span>By {blog?.author_name}</span>
                            <span>•</span>
                            <span>👁️ {blog?.views_count} views</span>
                            <span>•</span>
                            <span>
                                {blog?.published_at
                                    ? new Date(blog.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                                    : 'N/A'}
                            </span>
                        </div>
                    </div>

                    <img
                        src={blog?.featured_image_url}
                        alt={blog?.title}
                        className="w-full h-auto rounded-2xl mb-12 shadow-2xl"
                    />

                    <div
                        className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-yellow-500"
                        dangerouslySetInnerHTML={{ __html: blog?.body }}
                    />
                </article>
            </section>
        </>
    );
}
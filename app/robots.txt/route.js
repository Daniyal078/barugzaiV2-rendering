export async function GET() {
    const body = `
User-agent: *
Allow: /

# Block internal/system folders (if they exist)
Disallow: /cgi-bin/
Disallow: /wp-admin/
Allow: /wp-admin/admin-ajax.php

# Sitemap
Sitemap: https://www.barugzaimotors.com/sitemap.xml
`.trim();

    return new Response(body, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
        },
    });
}
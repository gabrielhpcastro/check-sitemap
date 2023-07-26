export interface Sitemap {
    urlset: {
        url: SitemapURL[]
    }
}

export interface SitemapURL {
    loc: string,
    lastmod?: string
}
export interface Sitemap {
    urlset: {
        url: SitemapURL[]
    }
}

export interface SitemapURL {
    loc: string,
    lastmod?: string
    "xhtml:link"?: {
        "@_rel": string,
        "@_hreflang": string,
        "@_href": string
    }[]
}
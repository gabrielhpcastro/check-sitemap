import fs from 'fs'
import path from 'path'
import {XMLParser} from 'fast-xml-parser'
import merge from 'deepmerge'

interface Sitemap {
    urlset: {
        url: SitemapURL[]
    }
}

interface SitemapURL {
    loc: string,
    lastmod?: string
}

export function loadXMLFile(filepath: string): Sitemap {
    const fileContent: string = fs.readFileSync(filepath, 'utf-8')
    const parser = new XMLParser()
    return parser.parse(fileContent)
}

export function mergeMultipleSitemaps(filepath: string, filenames: readonly string[]): Sitemap {
    let mergedSitemap: Sitemap = {} as Sitemap
    
    filenames.forEach(filename => {
        const content = loadXMLFile(path.join(filepath, filename))
        mergedSitemap = merge(mergedSitemap, content)
    })
    
    return mergedSitemap
}

export function findMissingURLs(referenceUrls: SitemapURL[], checkUrls: SitemapURL[]): SitemapURL[] {
    const missingUrls: SitemapURL[] = []

    referenceUrls.forEach(referenceUrl => {
        const foundUrl: SitemapURL | undefined = checkUrls.find(checkUrl => checkUrl.loc === referenceUrl.loc)

        if(!foundUrl) {
            missingUrls.push(referenceUrl)
        }
    })

    return missingUrls
}
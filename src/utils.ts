import fs from 'fs'
import path from 'path'
import {XMLParser} from 'fast-xml-parser'
import merge from 'deepmerge'
import { Sitemap, SitemapURL } from './types'

export function loadXMLFile(filepath: string): Sitemap {
    const fileContent: string = fs.readFileSync(filepath, 'utf-8')
    const parser = new XMLParser({ignoreAttributes: false})
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

export function normalizeUrls(urls: SitemapURL[]): SitemapURL[] {
    return urls.map(url => ({
        ...url,
        loc: /\/$/.test(url.loc) ? url.loc : `${url.loc}/` 
    }))
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

export function saveLogFile(logname: string, data: Record<string, unknown>): void {
    fs.writeFileSync(`./src/logs/${logname}_log.json`, JSON.stringify(data, null, 2), 'utf-8')
}

export function checkAlternatesQuantity(urls: SitemapURL[], maxAlternates: number): SitemapURL[] {
    return urls.filter(url => (url['xhtml:link']?.length ?? 0) > maxAlternates)
}
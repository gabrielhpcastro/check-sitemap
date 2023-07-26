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

export function saveLogFile(data: Record<string, unknown>): void {
    fs.writeFileSync('./src/checklog.json', JSON.stringify(data, null, 2), 'utf-8')
}
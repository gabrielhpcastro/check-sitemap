import { loadXMLFile, mergeMultipleSitemaps, findMissingURLs, saveLogFile } from './utils'

const REFERENCE_SITEMAP_PATH = './src/sitemaps/sitemap-pages.xml' as const
const CHECK_SITEMAPS_PATH = './src/sitemaps' as const
const CHECK_SITEMAPS_NAMES = [
    'sitemap_da/sitemap-0.xml', 
    'sitemap_de/sitemap-0.xml', 
    'sitemap_en/sitemap-0.xml', 
    'sitemap_es/sitemap-0.xml', 
    'sitemap_fr/sitemap-0.xml',
    'sitemap_it/sitemap-0.xml',
    'sitemap_pt_BR/sitemap-0.xml',
] as const

function run() {
    // ***** LOAD STEP *****
    console.log('\n## Loading sitemaps')

    const referenceSitemap = loadXMLFile(REFERENCE_SITEMAP_PATH)
    const checkSitemaps = mergeMultipleSitemaps(CHECK_SITEMAPS_PATH, CHECK_SITEMAPS_NAMES)
    
    console.log('\n## Sitemaps loaded')
    console.log(`   Reference has ${referenceSitemap.urlset.url.length} urls`)
    console.log(`   Check has ${checkSitemaps.urlset.url.length} urls`)

    // ***** CHECK STEP *****
    console.log('\n## Checking URLs')
    
    const missingURLs = findMissingURLs(referenceSitemap.urlset.url, checkSitemaps.urlset.url)
    const extraURLs = findMissingURLs(checkSitemaps.urlset.url, referenceSitemap.urlset.url)

    console.log('\n## URLs checked')
    console.log(`   ${missingURLs.length} urls in the reference are missing in the new sitemaps`)
    console.log(`   ${extraURLs.length} urls in the new sitemaps are not in the reference`)

    // ***** SAVE STEP *****
    console.log('\n## Generating checklog.json file')

    saveLogFile({
        referenceUrls: referenceSitemap.urlset.url,
        newUrls: checkSitemaps.urlset.url,
        missingUrls: missingURLs,
        extraUrls: extraURLs,
    })

    console.log('\n## checklog.json file saved')

    console.log('\n## Finished script')
}

run()
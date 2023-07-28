import { loadXMLFile, mergeMultipleSitemaps, findMissingURLs, saveLogFile, normalizeUrls, checkAlternatesQuantity } from './utils'

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
const MAX_EXPECTED_ALTERNATES = 8 as const

function run() {
    // ***** LOAD STEP *****
    console.log('\n## Loading sitemaps')

    const checkSitemaps = mergeMultipleSitemaps(CHECK_SITEMAPS_PATH, CHECK_SITEMAPS_NAMES)
    
    console.log('\n## Sitemaps loaded')
    console.log(`   New sitemaps have ${checkSitemaps.urlset.url.length} urls`)

    // ***** CHECK STEP *****
    console.log('\n## Checking URLs alternates')
    
    const invalidUrls = checkAlternatesQuantity(checkSitemaps.urlset.url, MAX_EXPECTED_ALTERNATES)

    console.log('\n## URLs alternates checked')
    console.log(`   ${invalidUrls.length} have more than ${MAX_EXPECTED_ALTERNATES} alternates`)

    // ***** SAVE STEP *****
    console.log('\n## Generating log file')

    saveLogFile('alternate_check', {
        allUrls: checkSitemaps.urlset.url,
        invalidUrls
    })

    console.log('\n## alternate_check_log.json file saved')

    console.log('\n## Finished script')
}

run()
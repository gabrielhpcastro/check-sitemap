# Sitemap check scripts

This repo contains scripts that are used to check sitemap files health

## Scripts

### URL check

This script compares a group of sitemaps files against a reference sitemap to see
the difference in the URLs that appears in both of them.

The script can tell the number of URLs in the sitemaps, how many URLs appear in the
reference but not in the new sitemap, how many URLs appear in the new sitemaps but
not in the reference.

Before running the script upload your sitemaps (both reference and new ones) to the
**sitemaps** folder and update the constants inside of `url_check.ts`. Then run:

```bash
yarn check:url
```

An example of the script response:

```bash
## Loading sitemaps

## Sitemaps loaded
   Reference sitemap has 4921 urls
   New sitemaps have 5019 urls

## Normalizing URLs

## URLs normalized

## Checking URLs

## URLs checked
   0 urls in the reference are missing in the new sitemaps
   98 urls in the new sitemaps are not in the reference

## Generating log file

## url_check_log.json file saved

## Finished script
```

The script will generate a `url_check_log.json` file inside the logs folder.

### Alternate check

This script checks the alternate locale links in a group of sitemaps.

The script will check if the urls in the sitemaps contain the expected quantity
of alternate links. It does not consider having less alternate links as an error,
but having more than expected.

Before running the script upload your sitemaps to the **sitemaps** folder and update
the constants inside of `alternate_check.ts`. Then run:

```bash
yarn check:alternate
```

An example of the script response:

```bash
## Loading sitemaps

## Sitemaps loaded
   New sitemaps have 5019 urls

## Checking URLs alternates

## URLs alternates checked
   0 have more than 8 alternates

## Generating log file

## alternate_check_log.json file saved

## Finished script
```

The script will generate a `alternate_check_log.json` file inside the logs folder.

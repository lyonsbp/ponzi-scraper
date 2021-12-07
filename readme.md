# Scraper

## What it do?

This is a 2 part tool, a `scraper` portion and a `downloader` portion.

The scraper will go and gather image urls of each item in a given howrare collection, then save the image urls to a local json file.

The downloader will read the json file ouput by the scraper, and download each image in the array. The files will be named `{index}.png` where index is the array index of the url.

## How to use

1. Install dependencies with `npm install`
2. Open `./scraper/pageScraper.js` replace `url` with the url of the howrare collection to scrape
3. Run `npm run start:scraper` to gather a list of all image urls.
   - The scraper should open a chromium window and navigate to each page. This process will take awhile because there needs to be a long delay to bypass the Cloudflare DDOS protection on the site. If you see the pages getting stuck on the cloudflare check, try raising the rest limit and try again.
4. Run `npm run start:downloader` to download the images to `./images` folder.

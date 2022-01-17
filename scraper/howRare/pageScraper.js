function getURL(baseURL, page) {
  return `${baseURL}/?page=${page}&ids=&sort_by=rank`;
}

const scraperObject = {
  url: "https://howrare.is/smb",
  async scraper(browser) {
    const maxPage = 20;
    const PAGE_TIMEOUT = 12000;
    let currentPage = 0;

    const allImageUrls = [];
    while (currentPage < maxPage) {
      let currentURL = getURL(this.url, currentPage);

      const newPage = await browser.newPage();
      await newPage.setDefaultNavigationTimeout(0);
      console.log(`Navigating to ${currentURL}...`);

      await newPage.goto(currentURL);
      await newPage.waitForSelector(".featured_item_img");
      console.log("Scraping page...");

      const imageUrls = await newPage.$$eval(
        ".featured_item_img a img",
        images => {
          console.log(images);
          return images.map(image => image.src);
        }
      );
      allImageUrls.push(imageUrls);

      console.log("Finished scraping page", currentURL, allImageUrls.length);
      currentPage++;

      await new Promise(function (resolve) {
        setTimeout(resolve, PAGE_TIMEOUT + Math.random() * 100);
      });
    }

    console.log(allImageUrls.length, allImageUrls);
    return allImageUrls.flat();
  }
};

module.exports = scraperObject;

const scraperObject = {
  url: "https://moonrank.app/collection/stoned_ape_crew",
  async scraper(browser) {
    let page = await browser.newPage();
    console.log(`Navigating to ${this.url}...`);
    await page.goto(this.url);

    const total = 4200;
    const allImageUrls = [];

    while (allImageUrls.length < total) {
      const data = await page.$$eval(
        "main div div.group div.bg-gray-200 img",
        images => {
          const imageUrls = images.map(image => image.src);
          for (const image of images) {
            image.remove();
          }
          return imageUrls;
        }
      );

      await new Promise(function (resolve) {
        setTimeout(resolve, 1000);
      });
      allImageUrls.push(...data);
    }

    console.log(allImageUrls.length, allImageUrls);
    return allImageUrls.flat();
  }
};

module.exports = scraperObject;

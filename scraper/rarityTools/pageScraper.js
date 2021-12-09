const scraperObject = {
  url: "https://rarity.tools/mutant-ape-yacht-club",
  async scraper(browser) {
    const collectionTotal = 16961;

    let page = await browser.newPage();
    console.log(`Navigating to ${this.url}...`);
    await page.goto(this.url);

    console.log("Scraping page...");
    await page.waitForSelector("div.bgCard div.overflow-hidden a img");
    await page.waitForSelector("div.smallBtn");

    const allImageUrls = [];
    const [nextButon] = await page.$x("//div[contains(text(), 'Next >')]");
    while (allImageUrls.length < collectionTotal) {
      await new Promise(function (resolve) {
        setTimeout(resolve, 7000);
      });
      const imageUrls = await page.$$eval(
        "div.bgCard div.overflow-hidden a img",
        images => {
          // console.log(images);
          return images.map(image => image.src);
        }
      );
      allImageUrls.push(...imageUrls);
      console.log("Finised scraping page...", allImageUrls.length);

      await nextButon.click();
    }

    console.log(allImageUrls.length, allImageUrls, allImageUrls % 48);
    return allImageUrls.flat();
  }
};

module.exports = scraperObject;

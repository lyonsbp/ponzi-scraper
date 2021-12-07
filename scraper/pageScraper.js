const scraperObject = {
  url: "https://howrare.is/smb/?page=0&ids=&sort_by=rank",
  async scraper(browser) {
    let page = await browser.newPage();
    console.log(`Navigating to ${this.url}...`);
    await page.goto(this.url);

    console.log("Scraping page...");
    await page.waitForSelector(".nft-listing");

    let links = await page.$$eval("nav ul.pagination li a", links => {
      return links.map(link => link.href);
    });
    links = new Set(links);
    console.log(links);

    const allImageUrls = await page.$$eval(".nft-listing a div img", images => {
      console.log(images);
      return [images.map(image => image.src)];
    });

    for (const link of links) {
      await new Promise(function (resolve) {
        setTimeout(resolve, 16000 + Math.random() * 100);
      });
      const newPage = await browser.newPage();
      await newPage.goto(link);

      const imageUrls = await newPage.$$eval(
        ".nft-listing a div img",
        images => {
          console.log(images);
          return images.map(image => image.src);
        }
      );
      allImageUrls.push(imageUrls);
      console.log("Finished scraping page", link);
    }

    console.log(allImageUrls.length, allImageUrls);
    return allImageUrls.flat();
  }
};

module.exports = scraperObject;

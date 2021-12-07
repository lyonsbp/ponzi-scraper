const axios = require("axios");
const fs = require("fs");
const path = require("path");

async function downloadImage(url, filename) {
  const localPath = path.resolve(__dirname, "../images", filename);
  const writer = fs.createWriteStream(localPath);

  const resp = await axios({
    url,
    method: "GET",
    responseType: "stream"
  });

  resp.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
}

async function main() {
  const data = fs.readFileSync(
    path.resolve(__dirname, "../scraper/results/data.json")
  );
  const imageUrls = JSON.parse(data);

  for (const [index, imageUrl] of imageUrls.entries()) {
    await downloadImage(imageUrl, `${index}.png`);
    console.log(`Downloaded ${index}`);
  }
}

main();

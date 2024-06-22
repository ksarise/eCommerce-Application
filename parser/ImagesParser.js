const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
(async () => {
  const PARSEURL = process.env.PARSE_URL;
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(`${PARSEURL}`);

  // Parse all product cards links on the page
  let arr = await page.evaluate(() => {
    let links = Array.from(
      document.querySelectorAll(".product-thumb-link"),
      (link) => link.href
    );
    return links.map((link) => ({ Link: link }));
  });

  for (let linkNumber = 0; linkNumber < 2; linkNumber++) {
    try {
      const itemPage = await browser.newPage();
      await itemPage.goto(arr[linkNumber].Link);

      const folderName = `assets/SNW-${linkNumber}-01`;
      const detailsFolderName = `details`;

      if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName, { recursive: true });
      }
      if (!fs.existsSync(detailsFolderName)) {
        fs.mkdirSync(detailsFolderName, { recursive: true });
      }

      // Product Card parse and autoformat
      let { productImages, detailsImages } = await itemPage.evaluate(() => {
        function getUniqueImagesUrl(hero, elements, details) {
          let uniqueSrcSet = new Set();
          if (hero) {
            const heroSrc = hero.getAttribute("src");
            if (heroSrc) {
              const bigHeroSrc = heroSrc.replace("/80/", "/700/");
              uniqueSrcSet.add(bigHeroSrc);
            }
          }

          elements.forEach((element) => {
            const src = element.getAttribute("src");
            if (details) {
              const staticSrc = `https:${src}`;
              uniqueSrcSet.add(staticSrc);
            } else if (
              src &&
              src.indexOf("youtube") === -1 &&
              src.indexOf("clone") === -1
            ) {
              const bigSrc = src.replace("/80/", "/700/");
              uniqueSrcSet.add(bigSrc);
            }
          });
          if (uniqueSrcSet.size < 1 && !details) {
            elements.forEach((element) => {
              const src = element.getAttribute("src");
              if (src) {
                const bigSrc = src.replace("/80/", "/700/");
                uniqueSrcSet.add(bigSrc);
              }
            });
          }
          return Array.from(uniqueSrcSet);
        }

        let productImageElements = document.querySelectorAll(
          ".pdp-hero-alt-thumb"
        );
        let productHeroImageElement = document.querySelector(
          ".pdp-hero-image.active"
        );
        let detailsImageElements =
          document.querySelectorAll(".pdp-content-img");
        let productImages = getUniqueImagesUrl(
          productHeroImageElement,
          productImageElements
        );
        let detailsImages = getUniqueImagesUrl(
          false,
          detailsImageElements,
          true
        );

        return { productImages, detailsImages };
      });
      console.log(detailsImages);
      // Save product images to local folder
      for (let i = 0; i < productImages.length; i++) {
        const imageUrl = productImages[i];
        const viewSource = await itemPage.goto(imageUrl);
        const buffer = await viewSource.buffer();
        fs.writeFileSync(path.join(folderName, `${i}.jpg`), buffer);
      }

      // Save details images to local folder
      for (let i = 0; i < detailsImages.length; i++) {
        const imageUrl = detailsImages[i];
        const imageName = path.basename(imageUrl);
        const viewSource = await itemPage.goto(imageUrl);
        const buffer = await viewSource.buffer();
        fs.writeFileSync(path.join(detailsFolderName, imageName), buffer);
      }

      await itemPage.close();
    } catch (error) {
      console.error("Error occurred:", error);
    }
  }

  await browser.close();
})();

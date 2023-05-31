import { MightyDealJSON } from "@/types";
import { chunkdeal, getdeal } from "@/utils/getDeals";
import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";

const BASE_URL = "https://www.mightydeals.com/";
const getLinks = async () => {
  let htmlPages = [];

  const linksArr: { url: string; title: string }[] = [];
  for (let i = 1; i <= 35; i++) {
    const html = await axios.get(`${BASE_URL}all_deals/page/${i}`);
    htmlPages.push(html);
  }
  htmlPages.forEach((html) => {
    const $ = cheerio.load(html.data);
    const divs = $("div");

    divs.each((i, div) => {
      if (i === 22) {
        const links = $(div).find("a");

        links.each((i, link) => {
          const url = $(link).attr("href");
          const title = $(link).find("span").eq(2).text().trim();
          if (url && url.endsWith(".html") && title !== "") {
            const linkObj = {
              url,
              title,
            };

            linksArr.push(linkObj);
          }
        });
      }
    });
  });

  return linksArr;
};
(async () => {
  const links = await getLinks();

  let deals = [];
  for (let i = 0; i < links.length; i++) {
    const deal = await getdeal(links[i]);
    const chunkeddeal = await chunkdeal(deal);

    console.log(i);
    deals.push(chunkeddeal);
  }

  const json: MightyDealJSON = {
    current_date: Date.now().toLocaleString(),
    url: BASE_URL,
    length: deals.reduce((acc, deal) => acc + deal.length, 0),
    tokens: deals.reduce((acc, deal) => acc + deal.tokens, 0),
    deals,
  };

  fs.writeFileSync("scripts/pg.json", JSON.stringify(json));
})();

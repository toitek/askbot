import { MightyDealChunk, mightyDeals } from "@/types";
import axios from "axios";
import * as cheerio from "cheerio";
import { encode } from "gpt-3-encoder";

const CHUNK_SIZE = 200;

export const getdeal = async (linkObj: { url: string; title: string }) => {
  const { title, url } = linkObj;

  let deal: mightyDeals = { title: "", url: "", image: "", date: "", price: 0, old_price: 0, content: "", length: 0, tokens: 0, chunks: [] };
  const html = await axios.get(url);
  const $ = cheerio.load(html.data);
  const scripts = $("script");
  const divs = $("div");
  const spans = $("span");
  const imgs = $("img");
  let date = "";
  let content = "";
  let image = '";';
  let price = 0;
  let old_price = 0;

  scripts.each((i, script) => {
    if (i === 24) {
      const dateVar = $(script).text().trim();
      const splittedDate = dateVar.split("=");
      const returnDate = splittedDate[1];
      date = returnDate.slice(0, -1);
    }
  });
  divs.each((i, div) => {
    if (i === 51) {
      const p = $(div).find("p").text();
      content = p;
    }
  });

  spans.each((i, span) => {
    if (i === 7) {
      const priceVar = $(span).text().trim();
      price = +priceVar;
    }
    if (i === 8) {
      const priceVar = $(span).text().trim().substring(1);
      old_price = +priceVar;
    }
  });
  imgs.each((i, img) => {
    if (i === 4) {
      const imageUrl = $(img).attr("src");
      image = imageUrl as string;
    }
  });
  deal = { title, url, date, old_price, price, image, content, length: content.length, tokens: encode(content).length, chunks: [] };

  return deal;
};

export const chunkdeal = async (deal: mightyDeals) => {
  const { title, url, image, date, old_price, price, content, ...chunklessSection } = deal;

  let dealTextChunks = [];

  if (encode(content).length > CHUNK_SIZE) {
    const split = content.split(". ");
    let chunkText = "";

    for (let i = 0; i < split.length; i++) {
      const sentence = split[i];
      const sentenceTokenLength = encode(sentence);
      const chunkTextTokenLength = encode(chunkText).length;

      if (chunkTextTokenLength + sentenceTokenLength.length > CHUNK_SIZE) {
        dealTextChunks.push(chunkText);
        chunkText = "";
      }

      if (sentence[sentence.length - 1].match(/[a-z0-9]/i)) {
        chunkText += sentence + ". ";
      } else {
        chunkText += sentence + " ";
      }
    }

    dealTextChunks.push(chunkText.trim());
  } else {
    dealTextChunks.push(content.trim());
  }

  const dealChunks = dealTextChunks.map((text) => {
    const trimmedText = text.trim();

    const chunk: MightyDealChunk = {
      deal_title: title,
      deal_url: url,
      deal_date: date,
      deal_price: price,
      deal_image: image,
      deal_old_price: old_price,
      content: trimmedText,
      content_length: trimmedText.length,
      content_tokens: encode(trimmedText).length,
      embedding: [],
    };

    return chunk;
  });

  if (dealChunks.length > 1) {
    for (let i = 0; i < dealChunks.length; i++) {
      const chunk = dealChunks[i];
      const prevChunk = dealChunks[i - 1];

      if (chunk.content_tokens < 100 && prevChunk) {
        prevChunk.content += " " + chunk.content;
        prevChunk.content_length += chunk.content_length;
        prevChunk.content_tokens += chunk.content_tokens;
        dealChunks.splice(i, 1);
        i--;
      }
    }
  }

  const chunkedSection: mightyDeals = { ...deal, chunks: dealChunks };

  return chunkedSection;
};

export const getTitleUrl = async (url: string) => {
  const html = await axios.get(url);
  const $ = cheerio.load(html.data);
  const title = $("h1").text().trim();
  return { url, title };
};

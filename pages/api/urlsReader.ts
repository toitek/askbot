// const urlsUploader = async (req: Request): Promise<Response> => {
//   try {
//     const { links } = req.body as unknown as { links: string[] };

//     const sources = (await Promise.all(
//       links.map(async link => {
//         const response = await fetch(link.trim());
//         const html = await response.text();
//         const dom = new JSDOM(html);
//         console.log("========================DOM============================");
//         console.log(dom);
//         const doc = dom.window.document;
//         const parsed = new Readability(doc).parse();
//         console.log("=================================PARSED============================");
//         console.log(parsed);

//         if (parsed) {
//           let sourceText = cleanSourceText(parsed.textContent);

//           return { url: link, text: sourceText };
//         }
//       })
//     )) as Source[];

//     const filteredSources = sources.filter(source => source !== undefined);

//     for (const source of filteredSources) {
//       source.text = source.text.slice(0, 1500);
//     }

//     console.log("=============================UPLOADED SOURCE================");
//     console.log(JSON.stringify(filteredSources));

//     return new Response("response", { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return new Response("Error", { status: 500 });
//   }
// };
// export default urlsUploader;
// const urlsUploader = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { links } = req.body as unknown as { links: string[] };
//     const sources = [];

//     for (const link of links) {
//       const response = await axios.get(
//         "https://supportcommunity.milestonesys.com/s/article/set-up-Recording-Server-for-best-performance?language=en_US&sfdcIFrameOrigin=null"
//       );
//       const html = response;

//       const $ = cheerio.load(html.data);
//       console.log("============================================HTML================================");
//       // console.log($.text());
//       const sourceText = $("body").text(); // Modify this selector as per your requirements
//       console.log("================================SOURCE TEXT================================");
//       console.log(sourceText);

//       if (sourceText) {
//         const trimmedText = cleanSourceText(sourceText).slice(0, 1500);
//         sources.push({ url: link, text: trimmedText });
//       }
//     }

//     console.log("=============================UPLOADED SOURCE================");
//     console.log(JSON.stringify(sources));

//     // res.status(200).json(sources); // Send the sources array as the response
//   } catch (error) {
//     console.error(error);
//     // res.status(500).json({ error: "An error occurred while processing the data." });
//   }
// };

// export default urlsUploader;

// import { Request, Response } from "express"; // Make sure you import `Request` and `Response` from a library like express.

// C:\Program Files\Google\Chrome\Application
import type { NextApiRequest, NextApiResponse } from "next";
import { Source } from "@/types";
import { cleanSourceText } from "@/utils/cleaner";
import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";
import * as cheerio from "cheerio";
import puppeteer from "puppeteer";

const urlsUploader = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { links } = req.body as { links: string[] };
    const sources = [];

    const browser = await puppeteer.launch({
      headless: "new",
      executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", // provide the path to your Chrome installation
    });

    for (const link of links) {
      console.log("====================LINK=================================");
      console.log(link);

      const page = await browser.newPage();
      await page.goto(link);

      const bodyHandle = await page.$("body");
      const sourceText = await page.evaluate(body => body?.textContent, bodyHandle);

      if (sourceText) {
        const trimmedText = cleanSourceText(sourceText);
        sources.push({ url: link, text: trimmedText });
      }
    }

    await browser.close();
    console.log("=====================================SOURCES TEXT================================");
    console.log(sources);

    res.status(200).json(sources);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while processing the data." });
  }
};

export default urlsUploader;

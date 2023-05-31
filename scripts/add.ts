import { MightyDealChunk, mightyDeals } from "@/types";
import { loadEnvConfig } from "@next/env";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import { encode } from "gpt-3-encoder";
import { Configuration, OpenAIApi } from "openai";

const filepath = "new_deals/new_deals.json";

loadEnvConfig("");

const CHUNK_SIZE = 200;
const generateEmbeddings = async (deals: mightyDeals[]) => {
  const configuration = new Configuration({ apiKey: process.env.OPEN_API_KEY });
  const openai = new OpenAIApi(configuration);

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_SERVICE_URL!);

  for (let i = 0; i < deals.length; i++) {
    const section = deals[i];
    const { title, url, date, old_price, price, image, content } = section;
    let dealTextChunks = [];
    if (encode(content).length > 200) {
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
        if (sentence[sentence.length - 1].match(/[a-z0-9]/i)) chunkText += sentence + ". ";
        else chunkText += sentence + " ";
      }
      dealTextChunks.push(chunkText.trim());
    } else dealTextChunks.push(content.trim());

    const embeddingResponse = await openai.createEmbedding({ model: "text-embedding-ada-002", input: content });
    const [{ embedding }] = embeddingResponse.data.data;
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
        embedding: embedding,
      };
      return chunk;
    });

    const { data, error } = await supabase.from("ask_ai").insert(dealChunks).select("*");

    if (error) console.log("error", error);
    else console.log("saved", i);
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
};

(async () => {
  const data: mightyDeals[] = JSON.parse(fs.readFileSync(filepath, "utf8")).deals;
  await generateEmbeddings(data);
})();

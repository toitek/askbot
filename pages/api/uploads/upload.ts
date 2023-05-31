import { mightyDeals } from "@/types";
import { supabaseAdmin } from "@/utils";
import { chunkdeal, getTitleUrl, getdeal } from "@/utils/getDeals";
import { loadEnvConfig } from "@next/env";
import { createClient } from "@supabase/supabase-js";
import { Configuration, OpenAIApi } from "openai";

loadEnvConfig("");
const handler = async (req: Request): Promise<Response> => {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_SERVICE_URL!);
  const configuration = new Configuration({ apiKey: process.env.OPEN_API_KEY });
  const openai = new OpenAIApi(configuration);
  console.log("==================REQUEST================");
  console.log(req.body);

  //   const { files, urls } = (await req.json()) as { files: string[]; urls: string[] };
  //   console.log("backend");
  //   console.log(urls);

  //   console.log(files);

  //   if (urls.length > 0) {
  //     // const links: { url: string; title: string }[] = [];
  //     // let chunkeddeal: mightyDeals[] = [];
  //     // urls.map(async (url) => {
  //     //   const urlTitle = await getTitleUrl(url);
  //     //   links.push(urlTitle);
  //     // });
  //     // links.map(async (link) => {
  //     //   const deal = await getdeal(link);
  //     //   chunkeddeal.push(await chunkdeal(deal));
  //     // });

  //     // chunkeddeal.map(async (chunk, index) => {
  //     //   const embeddingResponse = await openai.createEmbedding({ model: "text-embedding-ada-002", input: chunk.content });

  //     //   const [{ embedding }] = embeddingResponse.data.data;
  //     //   const { data, error } = await supabase
  //     //     .from("ask_ai")
  //     //     .insert({
  //     //       deal_title: chunk.title,
  //     //       deal_url: chunk.url,
  //     //       deal_date: chunk.date,
  //     //       deal_old_price: chunk.old_price,
  //     //       deal_price: chunk.price,
  //     //       deal_image: chunk.image,
  //     //       content: chunk.content,
  //     //       content_length: chunk.length,
  //     //       content_tokens: chunk.tokens,
  //     //       embedding,
  //     //     })
  //     //     .select("*");

  //     //   if (error) {
  //     //     console.log("error", error);
  //     //   } else {
  //     //     console.log("saved", index);
  //     //   }
  //     // });
  //   }
  //   if (files.length > 0) {
  //     console.log("file", files);
  //   }

  try {
    // console.log("========================INSERT DATA RESPONSE==================================");

    // console.log(data);
    // console.log("===============================INSERT DATA ERROR================");
    // console.log(error);
    return new Response(JSON.stringify({}), { status: 200 });
  } catch (error) {
    return new Response("Error", { status: 500 });
  }
};

export default handler;

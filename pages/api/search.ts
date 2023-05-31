import { supabaseAdmin } from "@/utils";
export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  try {
    const { query } = (await req.json()) as { query: string };

    const input = query.replace(/\n/g, " ");
    const res = await fetch("https://api.openai.com/v1/embeddings", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPEN_API_KEY}`,
      },
      method: "POST",
      body: JSON.stringify({ model: "text-embedding-ada-002", input }),
    });

    const json = await res.json();

    const embedding = json.data[0].embedding;

    const { data: chunks, error } = await supabaseAdmin.rpc("ask_ai_search", {
      query_embedding: embedding,
      similarity_threshold: 0.7,
      match_count: 5,
    });

    if (error) throw new Error("something went wrong");
    return new Response(JSON.stringify(chunks), { status: 200 });
  } catch (error) {
    return new Response("Error", { status: 500 });
  }
};

export default handler;

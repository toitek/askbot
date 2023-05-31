import { OpenAIStream } from "@/utils";

export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  try {
    const { prompt } = (await req.json()) as { prompt: string };

    const stream = await OpenAIStream(prompt);
    return new Response(stream);
  } catch (error) {
    return new Response("Error", { status: 500 });
  }
};

export default handler;
import { createClient } from "@supabase/supabase-js";

const poatThreadsHandler = async (req: Request): Promise<Response> => {
  const { email, answer, query } = (await req.json()) as { email: string; answer: string; query: string };
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_SERVICE_URL!);
    const { data, error } = await supabase.from("users").insert({ email, answer, query }).select("*");

    if (error) {
      throw new Error(error.message);
    } else {
      return new Response(JSON.stringify({ data }), { status: 200 });
    }
  } catch (error) {
    return new Response("Error", { status: 500 });
  }
};
export default poatThreadsHandler;

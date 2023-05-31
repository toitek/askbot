import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/Input";
import { Navbar } from "@/components/Navbar";
import SnackBar from "@/components/SnackBar";
import { Colors } from "@/components/constants/color";
import { createClient } from "@supabase/supabase-js";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

export default function EditConfig() {
  const router = useRouter();
  const [version, setVersion] = useState("");
  const [prompt, setPrompt] = useState("");
  const [msg, setMsg] = useState("");

  const editHandler = async () => {
    if (version === "") return setMsg("Please enter your version");
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.NEXT_PUBLIC_SUPABASE_SERVICE_URL as string);
    const { data, error } = await supabase.rpc("email");
    if (error) {
      const errorMessage = error.message;
      setMsg(errorMessage);
      return;
    } else setMsg("Edited successfuly");
  };

  return (
    <>
      <Head>
        <title>Chat Ai</title>
        <meta name="description" content={`AI-powered search and chat Chat Ai.`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo2X.ico" />
      </Head>
      <div>
        <Navbar HideLogin={true} admin={true} loggedIn={true} />
        <div className={`flex justify-center items-center h-screen bg-[${Colors.bgColor}]`}>
          <div className="bg-white p-8 rounded-lg shadow-md mx-4">
            <div className="py-2">
              <h3 className="text-center">Edit configurations</h3>
            </div>
            <div className="py-2">
              <label>Gpt version </label>
              <Input name="version" placeHolder="3.5 turbo" value={version} onChange={setVersion} type="text" />
            </div>
            <div className="py-2">
              <label>Main prompt</label>
              <Input name="prompt" placeHolder="main prompt" value={prompt} onChange={setPrompt} type="text" />
            </div>
            <div className="w-full flex flex-col justify-center items-center py-4">
              <Button clickHandler={editHandler} text="Edit" />
            </div>
          </div>
        </div>

        <Footer />
        <SnackBar message={msg} show={msg ? true : false} onClose={() => setMsg("")} />
      </div>
    </>
  );
}

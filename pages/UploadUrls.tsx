import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { SideBar } from "@/components/SideBar";
import SnackBar from "@/components/SnackBar";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

export default function UploadFiles() {
  const router = useRouter();
  const [url, seturl] = useState("");
  const [msg, setMsg] = useState("");
  const [files, setFiles] = useState<any[]>([]);

  const UploadHandler = async () => {
    if (url === "") return setMsg("Please enter at least 1 url");
    const urls = url.split(",");
    console.log("==========================URLS================================");
    console.log(urls);
    try {
      const response = await fetch("/api/urlsReader", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ links: urls }),
      });

      console.log("============================RESPONSE============================");
      console.log(response);

      if (response.ok) {
        console.log("JSON file uploaded successfully");
      } else {
        throw new Error("Failed to upload JSON file");
      }
    } catch (error) {
      console.error("Error uploading JSON file:", error);
    }
  };

  const dashboardHandler = () => {
    router.push({ pathname: "/Dashboard" });
  };
  const uploadHandler = () => {};

  const settingsHandler = () => {
    router.push({ pathname: "/Settings" });
  };

  return (
    <>
      <Head>
        <title>Chat Ai</title>
        <meta name="description" content={`AI-powered search and chat Chat Ai.`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo2X.ico" />
      </Head>
      <div className="flex min-h-[100vh]">
        <SideBar settingsHandler={settingsHandler} uploadHandler={uploadHandler} activePage="/" admin={true} />
        <div className="grow">
          <div className="md:flex justify-center h-full px-md ">
            <div className="w-full mx-auto max-w-screen-md md:px-lg py-lg">
              <div className="h-full md:flex items-center relative justify-center">
                <div className="w-full space-y-lg">
                  <div className="mt-sm md:mt-lg md:min-w-screen-md min-h-[370px] border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark  bg-transparent">
                    <div className="py-2">
                      <h3 className="text-center">Upload Urls</h3>
                      <h3 className="text-center">each urls should be separated with a comma</h3>
                    </div>
                    <div className="py-2">
                      <label>Url</label>
                      <Input name="url" placeHolder="https://johndoe.com" value={url} onChange={seturl} type="text" />
                    </div>
                    <div className="w-full flex flex-col justify-center items-center py-4">
                      <Button clickHandler={UploadHandler} text="Upload" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SnackBar message={msg} show={msg ? true : false} onClose={() => setMsg("")} />
      </div>
    </>
  );
}

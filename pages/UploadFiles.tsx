import { Button } from "@/components/Button";
import FilePondUpload from "@/components/FileUpload";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/Input";
import { Navbar } from "@/components/Navbar";
import { SideBar } from "@/components/SideBar";
import SnackBar from "@/components/SnackBar";
import { Colors } from "@/components/constants/color";
import { createClient } from "@supabase/supabase-js";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

export default function UploadFiles() {
  const router = useRouter();
  const [url, seturl] = useState("");
  const [msg, setMsg] = useState("");
  const [files, setFiles] = useState<any[]>([]);

  const UploadHandler = async () => {
    if (url === "") return setMsg("Please enter your url");
    const formData = new FormData();
    formData.append("file", files[0]);
    try {
      const response = await fetch("/api/uploads/upload", {
        method: "POST",
        body: JSON.stringify(formData),
      });

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

  const uploadUrlsHandler = () => {
    router.push({ pathname: "/UploadUrls" });
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
        <SideBar settingsHandler={settingsHandler} uploadHandler={uploadHandler} uploadUrlsHandler={uploadUrlsHandler} activePage="/" admin={true} />
        <div className="grow">
          <div className="md:flex justify-center h-full px-md ">
            <div className="w-full mx-auto max-w-screen-md md:px-lg py-lg">
              <div className="h-full md:flex items-center relative justify-center">
                <div className="w-full space-y-lg">
                  <div className="mt-sm md:mt-lg md:min-w-screen-md min-h-[370px] border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark  bg-transparent">
                    <div className="py-2">
                      <h3 className="text-center">Upload files</h3>
                    </div>
                    <div className="py-2">
                      <label>File</label>
                      <FilePondUpload setFilesUpload={setFiles} />
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

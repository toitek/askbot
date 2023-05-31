import AuthPage from "@/components/AuthPage";
import PopularCard from "@/components/PopularCard";
import { SideBar } from "@/components/SideBar";
import localforage from "localforage";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function Dashboard() {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [query, setQuery] = useState<string>("");
  const [search, setSearch] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [userName, setUsername] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const router = useRouter();

  useLayoutEffect(() => {
    localforage.getItem("user").then((user: any) => {
      if (user) {
        setUsername(user?.session.email);
      } else {
        router.push({ pathname: "/" });
      }
    });
  }, [router]);

  useEffect(() => {}, [query, router, search]);

  const settingsHandler = () => {
    router.push({ pathname: "/Settings" });
  };

  const uploadHandler = () => {
    router.push({ pathname: "/UploadFiles" });
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
                    <div className="divide-y md:divide-none md:grid lg:grid-cols-2 gap-sm md:pt-md border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark  bg-transparent">
                      <PopularCard />
                      <PopularCard />
                      <PopularCard />
                      <PopularCard />
                      <PopularCard />
                      <PopularCard />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {(showLogin || showSignup) && (
        <AuthPage
          onClose={() => {
            setShowLogin(false);
            setShowSignup(false);
          }}
          setShowSignup={setShowSignup}
          setShowLogin={setShowLogin}
          showLogin={showLogin}
          showSignup={showSignup}
        />
      )}
    </>
  );
}

import AuthPage from "@/components/AuthPage";
import SearchModal from "@/components/SearchModal";
import { SideBar } from "@/components/SideBar";
import { Title } from "@/components/Title";
import { createClient } from "@supabase/supabase-js";
import localforage from "localforage";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { KeyboardEvent, useEffect, useLayoutEffect, useRef, useState } from "react";

export default function Settings() {
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

  useEffect(() => {
    const handleSearch = async () => {
      if (!query) {
        alert("Please enter a query.");
        return;
      }
      router.push({ pathname: "/page2", query: { data: JSON.stringify(query) } });
      setSearch(false);
    };
    if (search) handleSearch();
  }, [query, router, search]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearch(true);
      setShowSearch(false);
    }
  };

  const handleSearch = () => {
    setSearch(true);
    setShowSearch(false);
  };
  const newThreadHandler = () => {
    setShowSearch(true);
  };

  const yourThreadHandler = () => {
    router.push({ pathname: "/YourThread" });
  };

  const signOutHandler = () => {
    localforage.removeItem("user").then(() => {
      router.push({ pathname: "/" });
    });
  };

  const deleteAccountHandler = async () => {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.NEXT_PUBLIC_SUPABASE_SERVICE_URL as string);
    const { error } = await supabase.auth.signOut();
    if (error) {
      return;
    } else {
      router.push({ pathname: "/" });
    }
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
        <SideBar
          setShowLogin={setShowLogin}
          newThreadHandler={newThreadHandler}
          setShowSignup={setShowSignup}
          yourThreadHandler={yourThreadHandler}
          activePage="Settings"
        />
        <div className="grow">
          <div className="md:hidden pt-[48px]">
            <div className="py-sm px-md fixed left-0 right-0 top-0 md:mb-0 z-10 w-full border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-background dark:bg-backgroundDark">
              <div className="flex items-center justify-between gap-x-sm md:hidden">
                <a>
                  <Title />
                </a>
                <a className="bg-super text-white hover:opacity-80 font-sans focus:outline-none outline-none transition duration-300 ease-in-out font-sans select-none items-center relative group justify-center rounded-md cursor-point active:scale-95 origin-center whitespace-nowrap inline-flex text-sm px-sm font-medium h-8">
                  <div className="flex items-center leading-none justify-center gap-xs">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fass"
                      data-icon="plus"
                      className="svg-inline--fa fa-plus fa-fw fa-1x"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path fill="currentColor" d="M240 80V48H176V80 224H32 0v64H32 176V432v32h64V432 288H384h32V224H384 240V80z"></path>
                    </svg>
                    <span className="flex items-center relative">New</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="md:flex justify-center h-full px-md">
            <div className="w-full mx-auto max-w-screen-sm md:px-lg py-lg">
              <div>
                <div className="sticky top-[48px] md:top-0 -mt-lg pt-lg z-20 border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-background dark:bg-backgroundDark">
                  <div className="flex justify-between items-center pb-sm border-b border-border border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-transparent">
                    <div className="">
                      <div className="flex items-center gap-x-sm">
                        <h1 className="super font-sans text-2xl font-semibold text-super selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                          <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fass"
                            data-icon="gear"
                            className="svg-inline--fa fa-gear fa-fw"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path
                              fill="currentColor"
                              d="M194 0H306l17.2 78.4c15.8 6.5 30.6 15.1 44 25.4l76.5-24.4 56 97-59.4 54.1c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l59.4 54.1-56 97-76.5-24.4c-13.4 10.3-28.2 18.9-44 25.4L306 512H194l-17.2-78.4c-15.8-6.5-30.6-15.1-44-25.4L56.3 432.5l-56-97 59.4-54.1C58.6 273.1 58 264.6 58 256s.6-17.1 1.7-25.4L.3 176.5l56-97 76.5 24.4c13.4-10.3 28.2-18.9 44-25.4L194 0zm56 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"
                            ></path>
                          </svg>
                        </h1>
                        <h1 className="default font-sans text-2xl font-semibold text-textMain dark:text-textMainDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                          Settings
                        </h1>
                      </div>
                    </div>
                    <div className="flex gap-x-sm"></div>
                  </div>
                </div>
                <div className="divide-y border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-transparent">
                  <div className="flex justify-between py-md items-center">
                    <div className="default font-sans text-base text-textMain dark:text-textMainDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                      Appearance
                    </div>
                    <div>
                      <button
                        type="button"
                        className="md:hover:bg-offsetPlus text-textOff md:hover:text-textMain dark:md:hover:bg-offsetPlusDark dark:md:hover:text-textMainDark font-sans focus:outline-none outline-none transition duration-300 ease-in-out font-sans select-none items-center relative group justify-center rounded-md cursor-point active:scale-95 origin-center whitespace-nowrap inline-flex text-sm px-sm font-medium h-8"
                      >
                        <div className="flex items-center leading-none justify-center gap-xs">
                          <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fass"
                            data-icon="sun"
                            className="svg-inline--fa fa-sun fa-fw fa-1x"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path
                              fill="currentColor"
                              d="M256 73.1L150 0 126.7 126.7 0 150 73.1 256 0 362l126.7 23.3L150 512l106-73.1L362 512l23.3-126.7L512 362 438.9 256 512 150 385.3 126.7 362 0 256 73.1zM352 256a96 96 0 1 0 -192 0 96 96 0 1 0 192 0zm-224 0a128 128 0 1 1 256 0 128 128 0 1 1 -256 0z"
                            ></path>
                          </svg>
                          <span className="flex items-center relative">Light</span>
                        </div>
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between py-md items-center">
                    <div className="default font-sans text-base text-textMain dark:text-textMainDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                      Avatar
                    </div>
                    <div className="flex flex-col gap-sm items-end">
                      <div className="relative">
                        <div className="aspect-square rounded-full overflow-hidden flex items-center justify-center w-[80px] border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-offsetPlus dark:bg-offsetPlusDark">
                          <Image src={"/user.png"} alt="user avatar" width={24} height={24} />
                          <div className="absolute bottom-0 right-0">
                            <button
                              type="button"
                              className="bg-offsetPlus dark:bg-offsetPlusDark text-textMain dark:text-textMainDark md:hover:text-textOff md:dark:hover:text-textOffDark font-sans focus:outline-none outline-none transition duration-300 ease-in-out font-sans select-none items-center relative group justify-center rounded-full cursor-point active:scale-95 origin-center whitespace-nowrap inline-flex text-sm aspect-square h-8"
                            >
                              <div className="flex items-center leading-none justify-center gap-xs">
                                <svg
                                  aria-hidden="true"
                                  focusable="false"
                                  data-prefix="fass"
                                  data-icon="pen-to-square"
                                  className="svg-inline--fa fa-pen-to-square fa-fw fa-1x"
                                  role="img"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 512 512"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M144 272L128 384l112-16L436.7 171.3l-96-96L144 272zM512 96L416 0 363.3 52.7l96 96L512 96zM32 64H0V96 480v32H32 416h32V480 320 288H384v32V448H64V128H192h32V64H192 32z"
                                  ></path>
                                </svg>
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between py-md items-center">
                    <div className="default font-sans text-base text-textMain dark:text-textMainDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                      Email
                    </div>
                    <div className="default font-sans text-sm text-textMain dark:text-textMainDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                      {userName}
                    </div>
                  </div>
                  <div className="flex justify-between py-md items-center">
                    <div className="-ml-sm flex space-x-sm">
                      <button
                        type="button"
                        className="md:hover:bg-offsetPlus text-textOff md:hover:text-textMain dark:md:hover:bg-offsetPlusDark dark:md:hover:text-textMainDark font-sans focus:outline-none outline-none transition duration-300 ease-in-out font-sans select-none items-center relative group justify-center rounded-md cursor-point active:scale-95 origin-center whitespace-nowrap inline-flex text-sm px-sm font-medium h-8"
                        onClick={signOutHandler}
                      >
                        <div className="flex items-center leading-none justify-center gap-xs">
                          <span className="flex items-center relative">Sign Out</span>
                        </div>
                      </button>
                      <button
                        type="button"
                        className="md:hover:bg-offsetPlus text-textOff md:hover:text-textMain dark:md:hover:bg-offsetPlusDark dark:md:hover:text-textMainDark font-sans focus:outline-none outline-none transition duration-300 ease-in-out font-sans select-none items-center relative group justify-center rounded-md cursor-point active:scale-95 origin-center whitespace-nowrap inline-flex text-sm px-sm font-medium h-8"
                        onClick={deleteAccountHandler}
                      >
                        <div className="flex items-center leading-none justify-center gap-xs">
                          <span className="flex items-center relative">Delete Account</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showSearch && (
        <SearchModal
          inputRef={inputRef}
          query={query}
          setQuery={setQuery}
          handleKeyDown={handleKeyDown}
          handleSearch={handleSearch}
          onClose={() => setShowSearch(false)}
        />
      )}
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

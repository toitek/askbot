import { SideBar } from "@/components/SideBar";
import { IconStack2, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/router";
import React, { useRef, useState, KeyboardEvent, useEffect } from "react";
import Head from "next/head";
import SearchModal from "@/components/SearchModal";
import AuthPage from "@/components/AuthPage";
import { IconPlus } from "@tabler/icons-react";
import localforage from "localforage";

type thread = { title: string; content: string };

export default function YourThread() {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [query, setQuery] = useState<string>("");
  const [search, setSearch] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showThread, setShowThread] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [userName, setUsername] = useState();
  const router = useRouter();
  const [threads, setThreads] = useState<thread[]>([]); //display threads

  localforage.getItem("user").then((user: any) => {
    setUsername(user?.session.email);
  });

  useEffect(() => {
    const fetchThreads = async () => {
      const searchResponse = await fetch("/api/threads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userName }),
      });
      if (!searchResponse.ok) {
        // setError("something went wrong. Please try again later");
      }
      const results = await searchResponse.json();
      console.log("===============user threads =============");
      console.log(results);
      setThreads(prev => [...prev, results]);
      localforage.setItem("threads", results);
    };
    if (userName) fetchThreads();
  }, [userName]);

  const handleSearch = () => {
    setSearch(true);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearch(true);
    }
  };
  const newThreadHandler = () => {
    setShowSearch(true);
  };

  const yourThreadHandler = () => {
    setShowThread(true);
  };
  const popularHandler = () => {
    router.push({ pathname: "/" });
  };
  const clearThreadHandler = () => {
    localforage.removeItem("threads");
    setThreads([]);
  };
  const settingsHandler = () => {
    router.push({ pathname: "/Settings" });
  };
  return (
    <>
      <Head>
        <title>AI-powered chat </title>
        <meta name="description" content={`AI-powered chat `} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo2X.ico" />
      </Head>
      <div className="flex min-h-[100vh]">
        <SideBar
          setShowSignup={setShowSignup}
          newThreadHandler={newThreadHandler}
          yourThreadHandler={yourThreadHandler}
          activePage="thread"
          settingsHandler={settingsHandler}
          popularHandler={popularHandler}
          setShowLogin={setShowLogin}
        />

        <div className="grow">
          <div className="md:hidden pt-[48px]">
            <div className="py-sm px-md fixed left-0 right-0 top-0 md:mb-0 z-10 w-full border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-background dark:bg-backgroundDark">
              <div className="flex items-center justify-between gap-x-sm md:hidden">
                <a>
                  <div className="flex space-x-sm items-center">
                    <div className="super font-sans text-base text-super selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                      <div className="h-auto transition-all duration-300 rounded-sm overflow-hidden group w-6 md:w-6">
                        <rect width="1024" height="1024" className="transition-all duration-1000 fill-zinc-900 dark:fill-zinc-300"></rect>
                        <svg className="fill-zinc-50 dark:fill-zinc-900 transition-all duration-1000">
                          <circle cx="512.408" cy="511.592" r="65.236"></circle>
                          <circle cx="512.408" cy="731.764" r="65.236"></circle>
                          <circle cx="512.408" cy="292.236" r="65.236"></circle>
                          <circle cx="292.236" cy="511.592" r="65.236"></circle>
                          <circle cx="292.236" cy="731.764" r="65.236"></circle>
                          <circle cx="292.236" cy="292.236" r="65.236"></circle>
                          <circle cx="732.579" cy="511.592" r="65.236"></circle>
                          <circle cx="732.579" cy="731.764" r="65.236"></circle>
                          <circle cx="732.579" cy="292.236" r="65.236"></circle>
                        </svg>
                      </div>
                    </div>
                    <div className="default font-sans text-base text-textMain dark:text-textMainDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                      <div className="font-display font-semibold select-none text-[24px] md:text-[22px]">Chat Ai</div>
                    </div>
                  </div>
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
            <div className="w-full mx-auto max-w-screen-md md:px-lg py-lg">
              <div></div>
              <div>
                <div className="sticky top-[48px] md:top-0 -mt-lg pt-lg z-20 border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-background dark:bg-backgroundDark">
                  <div className="flex justify-between items-center pb-sm border-b border-border border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-transparent">
                    <div className="">
                      <div className="flex items-center gap-x-sm">
                        <h1 className="super font-sans text-2xl font-semibold text-super selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                          <IconStack2 size={34} color="#007aff" />
                        </h1>
                        <h1 className="default font-sans text-2xl font-semibold text-textMain dark:text-textMainDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                          Your Threads
                        </h1>
                      </div>
                    </div>
                    <div className="flex gap-x-sm">
                      <div className="h-full relative flex items-center">
                        <button
                          type="button"
                          className="bg-offsetPlus dark:bg-offsetPlusDark text-textMain dark:text-textMainDark md:hover:text-textOff md:dark:hover:text-textOffDark font-sans focus:outline-none outline-none transition duration-300 ease-in-out font-sans select-none items-center relative group justify-center rounded-md cursor-point active:scale-95 origin-center whitespace-nowrap inline-flex text-sm aspect-square h-8"
                          onClick={newThreadHandler}
                        >
                          <div className="flex items-center leading-none justify-center gap-xs">
                            <IconPlus size={24} color="black" />
                          </div>
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="bg-offsetPlus dark:bg-offsetPlusDark text-textMain dark:text-textMainDark md:hover:text-textOff md:dark:hover:text-textOffDark font-sans focus:outline-none outline-none transition duration-300 ease-in-out font-sans select-none items-center relative group justify-center rounded-md cursor-point active:scale-95 origin-center whitespace-nowrap inline-flex text-sm aspect-square h-8"
                          onClick={clearThreadHandler}
                        >
                          <div className="flex items-center leading-none justify-center gap-xs">
                            <IconTrash size={24} color="black" />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-md">
                    <div className="mb-sm border-b pb-md border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-transparent">
                      <div>
                        <div className="rounded-full">
                          <div className="relative flex items-center">
                            <div className="absolute left-md">
                              <div className="light font-sans text-base text-textOff dark:text-textOffDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                                <svg
                                  aria-hidden="true"
                                  focusable="false"
                                  data-prefix="fass"
                                  data-icon="magnifying-glass"
                                  className="svg-inline--fa fa-magnifying-glass"
                                  role="img"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 512 512"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M416 208c0 45.9-14.9 88.3-40 122.7L486.6 441.4 509.3 464 464 509.3l-22.6-22.6L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                                  ></path>
                                </svg>
                              </div>
                            </div>
                            <input
                              type="search"
                              placeholder="Search"
                              className="outline-none focus:outline-none w-full font-sans font-medium duration-200 transition-all caret-super focus:ring-1 resize-none overflow-hidden bg-white focus:bg-white border text-textMain border-borderMain focus:ring-borderMain place-holder-textOff dark:bg-offsetDark dark:focus:bg-offsetDark dark:text-textMainDark dark:placeholder-textOffDark dark:border-borderMainDark dark:focus:ring-borderMainDark rounded-t-[32px] rounded-b-[32px] py-sm text-sm px-md pl-[40px] pr-md"
                              value=""
                            />
                            <div className="absolute right-sm flex items-center gap-x-sm"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="divide-y border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-transparent">
                  <div className="py-sm md:px-0 max-w-[100%] border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-transparent">
                    <a className="block group" href="/search/762033a4-5b25-4879-a0cb-9a22ae934e72">
                      <div className="flex items-center group border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-transparent">
                        <div>
                          <div className="">
                            <div className="default font-sans text-base font-medium text-textMain dark:text-textMainDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                              <div className="md:group-hover:text-super transition duration-300 line-clamp-1 break-all">Aloe</div>
                            </div>
                            <div className="break-all line-clamp-2 mt-two light font-sans text-xs font-medium text-textOff dark:text-textOffDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                              Aloe vera has many benefits for hair, including strengthening hair, promoting healthy hair growth, and repairing hair
                              strands. Aloe vera contains vitamins A, C, and E, which contribute to cell turnover and promote healthy cell growth,
                              resulting in shiny hair. Some researchers believe that aloenin, a chemical compound in the plant, is a primary factor in
                              promoting hair growth, as found in people with a hair-loss condition called alopecia. Aloe vera can be mixed with other
                              ingredients such as castor oil, onion juice, or licorice to promote hair growth and thickness. To use aloe vera for hair
                              growth, apply it throughout your scalp and hair, and leave it in for 30-45 minutes before rinsing out with a gentle
                              shampoo. This process can be repeated twice a week. While there is little clinical evidence to prove or disprove the
                              claims that aloe vera causes hair to grow faster, using aloe vera is a great way to get hair that looks healthier,
                              shinier, and softer.
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                    <div className="">
                      <div className="flex justify-between items-center">
                        <div className="flex gap-x-md items-center">
                          <div className="flex gap-x-xs items-center">
                            <div className="light font-sans text-xs font-medium text-textOff dark:text-textOffDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                              <svg
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fass"
                                data-icon="layer-group"
                                className="svg-inline--fa fa-layer-group"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 576 512"
                              >
                                <path
                                  fill="currentColor"
                                  d="M0 128L288 256 576 128 288 0 0 128zm104.6 81.5L0 256 288 384 576 256 471.4 209.5 288 291 104.6 209.5zM288 419L104.6 337.5 0 384 288 512 576 384 471.4 337.5 288 419z"
                                ></path>
                              </svg>
                            </div>
                            <div className="light font-sans text-xs font-medium text-textOff dark:text-textOffDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                              1
                            </div>
                          </div>
                          <div className="flex gap-x-xs items-center">
                            <div className="light font-sans text-xs font-medium text-textOff dark:text-textOffDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                              <svg
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fass"
                                data-icon="clock"
                                className="svg-inline--fa fa-clock"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                              >
                                <path
                                  fill="currentColor"
                                  d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256v12.8l10.7 7.1 96 64 20 13.3 26.6-39.9-20-13.3L280 243.2V120 96H232v24z"
                                ></path>
                              </svg>
                            </div>
                            <div className="light font-sans text-xs font-medium text-textOff dark:text-textOffDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                              15 hours ago
                            </div>
                          </div>
                        </div>
                        <div className="-mr-xs">
                          <div>
                            <button
                              type="button"
                              className="md:hover:bg-offsetPlus text-textOff md:hover:text-textMain dark:md:hover:bg-offsetPlusDark dark:md:hover:text-textMainDark font-sans focus:outline-none outline-none transition duration-300 ease-in-out font-sans select-none items-center relative group justify-center rounded-md cursor-point active:scale-95 origin-center whitespace-nowrap inline-flex text-sm aspect-square h-8"
                            >
                              <div className="flex items-center leading-none justify-center gap-xs">
                                <svg
                                  aria-hidden="true"
                                  focusable="false"
                                  data-prefix="fass"
                                  data-icon="ellipsis"
                                  className="svg-inline--fa fa-ellipsis fa-fw fa-1x"
                                  role="img"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 448 512"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M0 304l0-96 96 0 0 96L0 304zm160 0l0-96 96 0 0 96-96 0zm160-96l96 0 0 96-96 0 0-96z"
                                  ></path>
                                </svg>
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="py-sm md:px-0 max-w-[100%] border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-transparent">
                    <a className="block group" href="/search/2322fdf7-0b83-4e08-a88e-556eda7a1c2a">
                      <div className="flex items-center group border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-transparent">
                        <div>
                          <div className="">
                            <div className="default font-sans text-base font-medium text-textMain dark:text-textMainDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                              <div className="md:group-hover:text-super transition duration-300 line-clamp-1 break-all">hello</div>
                            </div>
                            <div className="break-all line-clamp-2 mt-two light font-sans text-xs font-medium text-textOff dark:text-textOffDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                              Hello is a common greeting used to start a conversation. Here are some of the search results related to hello: 1. Hello
                              is a song recorded by Lionel Richie. 2. HELLO! US edition is a magazine that brings the latest celebrity and royal news
                              from the US and around the world. 3. Hello is a song recorded by Adele, released in 2015 as the lead single from her
                              third studio album. It is a soul piano ballad with soul influences. 4.Hello! is a fun and energetic song to talk about
                              how you feel as you greet each other. 5. Hello is a song by Adele, available on Spotify. 6. hello is a brand that offers
                              naturally friendly products, including toothpaste that is vegan, cruelty-free, and made with each smile in mind.
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                    <div className="">
                      <div className="flex justify-between items-center">
                        <div className="flex gap-x-md items-center">
                          <div className="flex gap-x-xs items-center">
                            <div className="light font-sans text-xs font-medium text-textOff dark:text-textOffDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                              <svg
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fass"
                                data-icon="layer-group"
                                className="svg-inline--fa fa-layer-group"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 576 512"
                              >
                                <path
                                  fill="currentColor"
                                  d="M0 128L288 256 576 128 288 0 0 128zm104.6 81.5L0 256 288 384 576 256 471.4 209.5 288 291 104.6 209.5zM288 419L104.6 337.5 0 384 288 512 576 384 471.4 337.5 288 419z"
                                ></path>
                              </svg>
                            </div>
                            <div className="light font-sans text-xs font-medium text-textOff dark:text-textOffDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                              1
                            </div>
                          </div>
                          <div className="flex gap-x-xs items-center">
                            <div className="light font-sans text-xs font-medium text-textOff dark:text-textOffDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                              <svg
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fass"
                                data-icon="clock"
                                className="svg-inline--fa fa-clock"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                              >
                                <path
                                  fill="currentColor"
                                  d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256v12.8l10.7 7.1 96 64 20 13.3 26.6-39.9-20-13.3L280 243.2V120 96H232v24z"
                                ></path>
                              </svg>
                            </div>
                            <div className="light font-sans text-xs font-medium text-textOff dark:text-textOffDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                              1 day ago
                            </div>
                          </div>
                        </div>
                        <div className="-mr-xs">
                          <div>
                            <button
                              type="button"
                              className="md:hover:bg-offsetPlus text-textOff md:hover:text-textMain dark:md:hover:bg-offsetPlusDark dark:md:hover:text-textMainDark font-sans focus:outline-none outline-none transition duration-300 ease-in-out font-sans select-none items-center relative group justify-center rounded-md cursor-point active:scale-95 origin-center whitespace-nowrap inline-flex text-sm aspect-square h-8"
                            >
                              <div className="flex items-center leading-none justify-center gap-xs">
                                <svg
                                  aria-hidden="true"
                                  focusable="false"
                                  data-prefix="fass"
                                  data-icon="ellipsis"
                                  className="svg-inline--fa fa-ellipsis fa-fw fa-1x"
                                  role="img"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 448 512"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M0 304l0-96 96 0 0 96L0 304zm160 0l0-96 96 0 0 96-96 0zm160-96l96 0 0 96-96 0 0-96z"
                                  ></path>
                                </svg>
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div></div>
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

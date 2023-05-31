import { AnswerList } from "@/components/AnswerList";
import AuthPage from "@/components/AuthPage";
import SearchModal from "@/components/SearchModal";
import { SideBar } from "@/components/SideBar";
import { Colors } from "@/components/constants/color";
import { ArticleChunk } from "@/types";
import { createClient } from "@supabase/supabase-js";
import { IconArrowRight, IconArrowUp } from "@tabler/icons-react";
import endent from "endent";
import localforage from "localforage";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";

type quote = { text: string; author: string };

export default function Page2() {
  const router = useRouter();
  const { data } = router?.query;
  const searchQuery = data ? JSON.parse(data as string) : undefined;
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showButton, setShowButton] = useState(false);
  const [ansLoaded, setAnsLoaded] = useState(false);
  const [showQuery, setShowQuery] = useState(true);
  const [showAuth, setShowAuth] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const startSearch = useRef(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [query, setQuery] = useState<string>(searchQuery);
  const [searchQ, setSearchQ] = useState<string>("");
  const [randomQuotes, setRandomQuotes] = useState<quote[]>([]);
  const [randomQuote, setRandomQuote] = useState<quote>();
  const [error, setError] = useState("");
  const [userName, setUsername] = useState("");

  const [answerData, setAnswerData] = useState<{ query: string; chunks: ArticleChunk[] }[]>([]);

  useEffect(() => {
    if (router?.query?.data) {
      const parsedData = JSON.parse(router.query.data as string);
      setQuery(parsedData);
    }
  }, [router]);

  useEffect(() => {
    const randomQuotes = async () => {
      const randomQuotes = await fetch("/randomQuotes.json");
      setRandomQuotes(await randomQuotes.json());
    };
    if (startSearch.current) randomQuotes();
  }, [searchQuery, query, randomQuote]);

  useEffect(() => {
    const timer = setInterval(() => {
      setRandomQuote(randomQuotes[Math.floor(Math.random() * 1200) + 1]);
    }, 4000);

    return () => {
      clearInterval(timer);
    };
  }, [randomQuotes]);

  // const fetchSources = async () => {
  //   const response = await fetch("/api/sources", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ query }),
  //   });

  //   if (!response.ok) {
  //     setLoading(false);
  //     throw new Error(response.statusText);
  //   }

  //   const { sources }: { sources: Source[] } = await response.json();

  //   return sources;
  // };

  // const handleStream = async (sources: Source[]) => {
  //   try {
  //     const prompt = endent`Provide a 1-2 sentence answer to the query based on the following sources. Be original, concise, accurate, and helpful. Cite sources as [1] or [2] or [3] after each sentence (not just the very end) to back up your answer (Ex: Correct: [1], Correct: [2][3], Incorrect: [1, 2]).

  //     ${sources.map((source, idx) => `Source [${idx + 1}]:\n${source.text}`).join("\n\n")}
  //     `;

  //     const response = await fetch("/api/answer", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ prompt }),
  //     });

  //     if (!response.ok) {
  //       setLoading(false);
  //       throw new Error(response.statusText);
  //     }

  //     setLoading(false);
  //     // onSearch({ query, sourceLinks: sources.map((source) => source.url) });

  //     const data = response.body;

  //     if (!data) {
  //       return;
  //     }

  //     const reader = data.getReader();
  //     const decoder = new TextDecoder();
  //     let done = false;

  //     while (!done) {
  //       const { value, done: doneReading } = await reader.read();
  //       done = doneReading;
  //       const chunkValue = decoder.decode(value);
  //       // onAnswerUpdate(chunkValue);
  //     }

  //     // onDone(true);
  //   } catch (err) {
  //     // onAnswerUpdate("Error");
  //   }
  // };

  const createResponseHandler = useCallback(
    async (res: ArticleChunk) => {
      try {
        const prompt = endent`use this text to provide an accurate response on a product. ${res.content}`;
        const answerResponse = await fetch("/api/answer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        });

        if (!answerResponse.ok) {
          setLoading(false);
          throw new Error(answerResponse.statusText);
        }

        const reader = answerResponse.body!.getReader();
        const decoder = new TextDecoder();
        let done = false;
        let ans = "";

        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          const chunkValue = decoder.decode(value);
          const newAnswer = answer + chunkValue;
          ans += newAnswer;

          setAnswer(newAnswer);
          setAnswerData(prev => {
            const lastObj = prev[prev.length - 1];
            const foundIndex = lastObj.chunks.findIndex(chunk => chunk.title === res.title);
            const updatedChunks = [...lastObj.chunks];
            if (foundIndex === -1) updatedChunks.push({ ...res, content: ans });
            else updatedChunks[foundIndex].content = ans;
            const updatedObj = { ...lastObj, chunks: updatedChunks };
            return [...prev.slice(0, -1), updatedObj];
          });
        }
      } catch (error) {
        setError("something went wrong. Please try again later");
      }
    },
    [answer]
  );

  useEffect(() => {
    const search = async () => {
      startSearch.current = false;
      setShowQuery(true);
      setAnswer("");
      setLoading(true);

      setAnswerData(prev => [...prev, { query: query ? query : searchQuery, chunks: [] }]);
      const searchResponse = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: query ? query : searchQuery }),
      });
      if (!searchResponse.ok) {
        setLoading(false);
        setError("something went wrong. Please try again later");
      }

      const results: ArticleChunk[] = await searchResponse.json();
      const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.NEXT_PUBLIC_SUPABASE_SERVICE_URL as string);
      supabase.from("prompts").insert({ prompt: query ? query : searchQuery, date: new Date().toLocaleDateString() });
      startSearch.current = false;

      if (results.length > 0) {
        await Promise.all(results.map(createResponseHandler));
        setAnsLoaded(true);
      } else {
        await createResponseHandler({
          ...results[0],
          content: "No product was found. Please refine your search or provide more information on your search",
        });
      }
      setLoading(false);
      setQuery("");
    };

    // if (startSearch.current && router?.query?.data) search();
  }, [answer, createResponseHandler, data, query, router?.query?.data, searchQuery]);

  const handleSearch = () => {
    startSearch.current = true;
    setQuery(searchQ);
    setSearchQ("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  useEffect(() => {
    function handleScroll() {
      const fullHeight = window.innerHeight;
      const currentPosition = window.pageYOffset;
      if (currentPosition > fullHeight) setShowButton(true);
      else setShowButton(false);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => window.scrollTo({ top: 0, behavior: "smooth" });

  useEffect(() => {
    if (answerData && ansLoaded) {
      scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
      setAnsLoaded(false);
    }
  }, [ansLoaded, answerData]);

  const resetHandler = () => {
    setAnswerData([{ query: "", chunks: [] }]);
    startSearch.current = false;
    setQuery("");
    setShowQuery(false);
  };
  const popularHandler = () => {
    router.push({ pathname: "/" });
  };
  const newThreadHandler = () => {
    setShowSearch(true);
  };

  const yourThreadHandler = () => {
    router.push({ pathname: "/YourThread" });
  };
  const settingsHandler = () => {
    router.push({ pathname: "/Settings" });
  };

  const threadsHandler = async () => {
    localforage.getItem("user").then((user: any) => {
      setUsername(user?.session.email);
    });

    const obj = { query, answer: answer, userName };
    const answerResponse = await fetch("/api/uploads/UploadThreads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ obj }),
    });
    console.log(answerResponse);
  };

  return (
    <>
      <Head>
        <title>Chat Ai</title>
        <meta name="description" content={`AI-powered search and chat Chat Ai.`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo2X.ico" />
      </Head>
      <>
        <div className="flex w-full min-h-[100vh]">
          <SideBar
            setShowLogin={setShowLogin}
            setShowSignup={setShowSignup}
            newThreadHandler={newThreadHandler}
            yourThreadHandler={yourThreadHandler}
            settingsHandler={settingsHandler}
            activePage=""
            popularHandler={popularHandler}
          />
          <div className="grow">
            <div className="md:flex justify-center h-full px-md">
              <div className="w-full mx-auto max-w-screen-md md:px-lg">
                <div className="py-sm px-md fixed left-0 md:left-sideBarWidth 2xl:left-sideBarWidthXL right-0 top-0 md:mb-0 z-10 border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-background dark:bg-backgroundDark">
                  <div className="flex items-center justify-between">
                    <div className="hidden md:block">
                      <div className="flex items-center gap-x-xs">
                        <div className="border rounded-full px-sm py-xs flex items-center gap-x-sm border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-transparent">
                          <div className="flex items-center gap-x-xs light font-sans text-sm font-medium text-textOff dark:text-textOffDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              data-prefix="fass"
                              data-icon="eye"
                              className="svg-inline--fa fa-eye fa-fw fa-sm"
                              role="img"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 576 512"
                            >
                              <path
                                fill="currentColor"
                                d="M288 32C129.6 32 30 181.3 0 256c30 74.7 129.6 224 288 224s258-149.3 288-224C546 181.3 446.4 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm48 0c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-6.4 0-12.7 .6-18.8 1.8L288 256l-94.2-18.8c-1.2 6.1-1.8 12.4-1.8 18.8z"
                              ></path>
                            </svg>
                            <div>175</div>
                          </div>
                          <div className="flex items-center gap-x-xs light font-sans text-sm font-medium text-textOff dark:text-textOffDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              data-prefix="fass"
                              data-icon="code-fork"
                              className="svg-inline--fa fa-code-fork fa-fw fa-sm"
                              role="img"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                            >
                              <path
                                fill="currentColor"
                                d="M104 56v48H56V56h48zM56 0H0V56v48 56H48v32c0 53 43 96 96 96h48v64H144v56 48 56h56 48 56V456 408 352H256V288h48c53 0 96-43 96-96V160h48V104 56 0H392 344 288V56v48 56h48v32c0 17.7-14.3 32-32 32H144c-17.7 0-32-14.3-32-32V160h48V104 56 0H104 56zM392 56v48H344V56h48zM200 408h48v48H200V408z"
                              ></path>
                            </svg>
                            <div>11</div>
                          </div>
                          <div className="border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-transparent">
                            <div className="flex items-center gap-x-xs transition duration-300 select-none cursor-pointer hover:text-superAlt light font-sans text-sm font-medium text-textOff dark:text-textOffDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                              <div className="">
                                <svg
                                  aria-hidden="true"
                                  focusable="false"
                                  data-prefix="fass"
                                  data-icon="heart"
                                  className="svg-inline--fa fa-heart fa-fw fa-sm"
                                  role="img"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 512 512"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M64 288L39.8 263.8C14.3 238.3 0 203.8 0 167.8C0 92.8 60.8 32 135.8 32c36 0 70.5 14.3 96 39.8L256 96l24.2-24.2c25.5-25.5 60-39.8 96-39.8C451.2 32 512 92.8 512 167.8c0 36-14.3 70.5-39.8 96L448 288 256 480 64 288z"
                                  ></path>
                                </svg>
                              </div>
                              <div>Like</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-x-sm md:hidden">
                      <a>
                        <div className="h-auto transition-all duration-300 rounded-sm overflow-hidden group w-8 md:w-12">
                          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
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
                          </svg>
                        </div>
                      </a>
                      <a className="bg-offsetPlus dark:bg-offsetPlusDark text-textMain dark:text-textMainDark md:hover:text-textOff md:dark:hover:text-textOffDark font-sans focus:outline-none outline-none transition duration-300 ease-in-out font-sans select-none items-center relative group justify-center rounded-md cursor-point active:scale-95 origin-center whitespace-nowrap inline-flex text-sm px-sm font-medium h-8">
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
                    <div className="flex items-center gap-x-sm">
                      <div className="transition-all duration-300 opacity flex items-center gap-x-xs md:gap-x-0 opacity-100">
                        <div className="hidden md:block">
                          <div>
                            <button
                              type="button"
                              className="bg-super text-white hover:opacity-80 font-sans focus:outline-none outline-none transition duration-300 ease-in-out font-sans select-none items-center relative group justify-center rounded-md cursor-point active:scale-95 origin-center whitespace-nowrap inline-flex text-sm px-sm font-medium h-8"
                            >
                              <div className="flex items-center leading-none justify-center gap-xs">
                                <svg
                                  aria-hidden="true"
                                  focusable="false"
                                  data-prefix="fass"
                                  data-icon="chevron-down"
                                  className="svg-inline--fa fa-chevron-down fa-fw fa-1x"
                                  role="img"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 512 512"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M238 429.3l22.6-22.6 192-192L475.3 192 430 146.7l-22.6 22.6L238 338.7 68.6 169.4 46 146.7 .7 192l22.6 22.6 192 192L238 429.3z"
                                  ></path>
                                </svg>
                                <span className="flex items-center relative">Share</span>
                              </div>
                            </button>
                          </div>
                        </div>
                        <div className="block md:hidden">
                          <button
                            type="button"
                            className="bg-super text-white hover:opacity-80 font-sans focus:outline-none outline-none transition duration-300 ease-in-out font-sans select-none items-center relative group justify-center rounded-md cursor-point active:scale-95 origin-center whitespace-nowrap inline-flex text-sm px-sm font-medium h-8"
                          >
                            <div className="flex items-center leading-none justify-center gap-xs">
                              <svg
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fass"
                                data-icon="share"
                                className="svg-inline--fa fa-share fa-fw fa-1x"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                              >
                                <path
                                  fill="currentColor"
                                  d="M512 208L320 384H288V288H208c-61.9 0-112 50.1-112 112c0 48 32 80 32 80s-128-48-128-176c0-97.2 78.8-176 176-176H288V32h32L512 208z"
                                ></path>
                              </svg>
                              <span className="flex items-center relative">Share</span>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="min-h-[100vh] flex flex-col pt-[56px] pb-[124px] md:pb-0">
                  <div>
                    <div className="items-center w-full h-full md:mx-auto max-w-screen-md grow border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-background dark:bg-backgroundDark">
                      <div className="md:hidden mb-sm">
                        <div className="flex items-center gap-x-xs">
                          {/* <div className="border rounded-full py-xs px-sm pl-xs border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-transparent">
                            <div className="flex items-center gap-x-xs relative">
                              <div className="relative">
                                <div className="aspect-square rounded-full overflow-hidden flex items-center justify-center w-5 border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-offsetPlus dark:bg-offsetPlusDark">
                                 <Image alt="User avatar" className="w-full h-auto" src="/static/images/bot.png" />
                                </div>
                              </div>
                              <div className="line-clamp-1 break-all default font-sans text-sm font-medium text-textMain dark:text-textMainDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                                Chat Ai Bot
                              </div>
                            </div>
                          </div> */}
                          <div className="border rounded-full px-sm py-xs flex items-center gap-x-sm border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-transparent">
                            <div className="flex items-center gap-x-xs light font-sans text-sm font-medium text-textOff dark:text-textOffDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                              <svg
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fass"
                                data-icon="eye"
                                className="svg-inline--fa fa-eye fa-fw fa-sm"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 576 512"
                              >
                                <path
                                  fill="currentColor"
                                  d="M288 32C129.6 32 30 181.3 0 256c30 74.7 129.6 224 288 224s258-149.3 288-224C546 181.3 446.4 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm48 0c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-6.4 0-12.7 .6-18.8 1.8L288 256l-94.2-18.8c-1.2 6.1-1.8 12.4-1.8 18.8z"
                                ></path>
                              </svg>
                              <div>175</div>
                            </div>
                            <div className="flex items-center gap-x-xs light font-sans text-sm font-medium text-textOff dark:text-textOffDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                              <svg
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fass"
                                data-icon="code-fork"
                                className="svg-inline--fa fa-code-fork fa-fw fa-sm"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                              >
                                <path
                                  fill="currentColor"
                                  d="M104 56v48H56V56h48zM56 0H0V56v48 56H48v32c0 53 43 96 96 96h48v64H144v56 48 56h56 48 56V456 408 352H256V288h48c53 0 96-43 96-96V160h48V104 56 0H392 344 288V56v48 56h48v32c0 17.7-14.3 32-32 32H144c-17.7 0-32-14.3-32-32V160h48V104 56 0H104 56zM392 56v48H344V56h48zM200 408h48v48H200V408z"
                                ></path>
                              </svg>
                              <div>11</div>
                            </div>
                            <div className="border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-transparent">
                              <div className="flex items-center gap-x-xs transition duration-300 select-none cursor-pointer hover:text-superAlt light font-sans text-sm font-medium text-textOff dark:text-textOffDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                                <div className="">
                                  <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fass"
                                    data-icon="heart"
                                    className="svg-inline--fa fa-heart fa-fw fa-sm"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M64 288L39.8 263.8C14.3 238.3 0 203.8 0 167.8C0 92.8 60.8 32 135.8 32c36 0 70.5 14.3 96 39.8L256 96l24.2-24.2c25.5-25.5 60-39.8 96-39.8C451.2 32 512 92.8 512 167.8c0 36-14.3 70.5-39.8 96L448 288 256 480 64 288z"
                                    ></path>
                                  </svg>
                                </div>
                                <div>Like</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="">
                        <div style={{ maxHeight: "1310px" }}>
                          <div>
                            <div className="pb-md mb-md border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-transparent">
                              <div className="border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-transparent">
                                <div className="border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-transparent">
                                  <div className="">
                                    <div className="mb-md">
                                      <h1 className="break-words [word-break:break-word] default font-sans text-2xl font-semibold text-textMain dark:text-textMainDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                                        {query}
                                      </h1>
                                    </div>
                                  </div>
                                  <div className="border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-background dark:bg-backgroundDark">
                                    <div className="flex items-center justify-between border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-background dark:bg-backgroundDark">
                                      <div className="flex items-center justify-between w-full mb-sm">
                                        <div className="">
                                          <div className="space-x-[11px] flex items-center super font-sans text-base text-super selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                                            <svg
                                              aria-hidden="true"
                                              focusable="false"
                                              data-prefix="fass"
                                              data-icon="arrow-down-right"
                                              className="svg-inline--fa fa-arrow-down-right"
                                              role="img"
                                              xmlns="http://www.w3.org/2000/svg"
                                              viewBox="0 0 384 512"
                                            >
                                              <path
                                                fill="currentColor"
                                                d="M320 416h32V384 160 128H288v32V306.7L86.6 105.4 64 82.7 18.7 128l22.6 22.6L242.7 352H96 64v64H96 320z"
                                              ></path>
                                            </svg>
                                            <div className="super text-[13px] font-bold tracking-widest font-mono leading-none uppercase text-super selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                                              CHAT AI
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="default font-sans text-base text-textMain dark:text-textMainDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                                      <div className="break-words min-w-0 [word-break:break-word]">
                                        <div dir="auto">
                                          <div className="prose dark:prose-invert inline leading-normal break-words min-w-0 [word-break:break-word]">
                                            <span className="">
                                              Practicing positive thinking on a daily basis can help improve your overall well-being. Here are some
                                              tips from the search results:
                                            </span>
                                            <ol className="list-decimal list-outside">
                                              <AnswerList />
                                              <AnswerList />
                                              <AnswerList />
                                              <AnswerList />
                                              <AnswerList />
                                              <AnswerList />
                                              <AnswerList />
                                              <AnswerList />
                                              <AnswerList />
                                              <AnswerList />
                                              <AnswerList />
                                              <AnswerList />
                                              <AnswerList />
                                            </ol>
                                          </div>
                                        </div>
                                        <div className="mt-xs">
                                          <div className="border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-transparent">
                                            <div className="border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-background dark:bg-backgroundDark">
                                              <div className="flex items-center justify-between border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-background dark:bg-backgroundDark"></div>
                                              <div className="mt-sm">
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-md"></div>
                                                <div className="flex flex-wrap gap-sm">
                                                  <div>
                                                    <a
                                                      href="https://northmemorial.com/the-power-of-positive-thinking-5-ways-you-can-practice-positivity/"
                                                      className="block group cursor-pointer"
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                    >
                                                      <div className="rounded-full border py-xs pl-xs pr-sm flex items-center group border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-transparent">
                                                        <div className="w-[20px] aspect-square rounded-full flex items-center justify-center text-center border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-offset dark:bg-offsetDark">
                                                          <div className="light font-sans text-xs font-medium text-textOff dark:text-textOffDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                                                            1
                                                          </div>
                                                        </div>
                                                        <div className="pl-xs -mt-one">
                                                          <div className="flex items-center gap-x-xs border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-transparent">
                                                            <div className="relative top-one">
                                                              <div className="rounded-full overflow-hidden">
                                                                <Image
                                                                  className="block w-[16px] h-[16px]"
                                                                  src="https://www.google.com/s2/favicons?sz=128&amp;domain=northmemorial.com"
                                                                  alt="northmemorial.com favicon"
                                                                  width="16"
                                                                  height="16"
                                                                />
                                                              </div>
                                                            </div>
                                                            <div className="group-hover:text-super duration-300 transition-all line-clamp-1 break-all default font-sans text-sm text-textMain dark:text-textMainDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                                                              northmemorial
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </a>
                                                  </div>
                                                  <div>
                                                    <a
                                                      href="https://www.mayoclinic.org/healthy-lifestyle/stress-management/in-depth/positive-thinking/art-20043950"
                                                      className="block group cursor-pointer"
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                    >
                                                      <div className="rounded-full border py-xs pl-xs pr-sm flex items-center group border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-transparent">
                                                        <div className="w-[20px] aspect-square rounded-full flex items-center justify-center text-center border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-offset dark:bg-offsetDark">
                                                          <div className="light font-sans text-xs font-medium text-textOff dark:text-textOffDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                                                            2
                                                          </div>
                                                        </div>
                                                        <div className="pl-xs -mt-one">
                                                          <div className="flex items-center gap-x-xs border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-transparent">
                                                            <div className="relative top-one">
                                                              <div className="rounded-full overflow-hidden">
                                                                <Image
                                                                  className="block w-[16px] h-[16px]"
                                                                  src="https://www.google.com/s2/favicons?sz=128&amp;domain=mayoclinic.org"
                                                                  alt="mayoclinic.org favicon"
                                                                  width="16"
                                                                  height="16"
                                                                />
                                                              </div>
                                                            </div>
                                                            <div className="group-hover:text-super duration-300 transition-all line-clamp-1 break-all default font-sans text-sm text-textMain dark:text-textMainDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                                                              mayoclinic
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </a>
                                                  </div>
                                                  <div>
                                                    <a
                                                      href="https://www.berkeleywellbeing.com/think-positive-16-ways-positive-thinking.html"
                                                      className="block group cursor-pointer"
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                    >
                                                      <div className="rounded-full border py-xs pl-xs pr-sm flex items-center group border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-transparent">
                                                        <div className="w-[20px] aspect-square rounded-full flex items-center justify-center text-center border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-offset dark:bg-offsetDark">
                                                          <div className="light font-sans text-xs font-medium text-textOff dark:text-textOffDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                                                            3
                                                          </div>
                                                        </div>
                                                        <div className="pl-xs -mt-one">
                                                          <div className="flex items-center gap-x-xs border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-transparent">
                                                            <div className="relative top-one">
                                                              <div className="rounded-full overflow-hidden">
                                                                <Image
                                                                  className="block w-[16px] h-[16px]"
                                                                  src="https://www.google.com/s2/favicons?sz=128&amp;domain=berkeleywellbeing.com"
                                                                  alt="berkeleywellbeing.com favicon"
                                                                  width="16"
                                                                  height="16"
                                                                />
                                                              </div>
                                                            </div>
                                                            <div className="group-hover:text-super duration-300 transition-all line-clamp-1 break-all default font-sans text-sm text-textMain dark:text-textMainDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                                                              berkeleywellbeing
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </a>{" "}
                                                  </div>
                                                  <div>
                                                    <a
                                                      href="https://www.healthline.com/health/how-to-think-positive"
                                                      className="block group cursor-pointer"
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                    >
                                                      <div className="rounded-full border py-xs pl-xs pr-sm flex items-center group border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-transparent">
                                                        <div className="w-[20px] aspect-square rounded-full flex items-center justify-center text-center border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-offset dark:bg-offsetDark">
                                                          <div className="light font-sans text-xs font-medium text-textOff dark:text-textOffDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                                                            4
                                                          </div>
                                                        </div>
                                                        <div className="pl-xs -mt-one">
                                                          <div className="flex items-center gap-x-xs border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-transparent">
                                                            <div className="relative top-one">
                                                              <div className="rounded-full overflow-hidden">
                                                                <Image
                                                                  className="block w-[16px] h-[16px]"
                                                                  src="https://www.google.com/s2/favicons?sz=128&amp;domain=healthline.com"
                                                                  alt="healthline.com favicon"
                                                                  width="16"
                                                                  height="16"
                                                                />
                                                              </div>
                                                            </div>
                                                            <div className="group-hover:text-super duration-300 transition-all line-clamp-1 break-all default font-sans text-sm text-textMain dark:text-textMainDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                                                              healthline
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </a>
                                                  </div>
                                                  <div>
                                                    <a
                                                      href="https://www.lifehack.org/781506/power-of-positive-thinking"
                                                      className="block group cursor-pointer"
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                    >
                                                      <div className="rounded-full border py-xs pl-xs pr-sm flex items-center group border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-transparent">
                                                        <div className="w-[20px] aspect-square rounded-full flex items-center justify-center text-center border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-offset dark:bg-offsetDark">
                                                          <div className="light font-sans text-xs font-medium text-textOff dark:text-textOffDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                                                            5
                                                          </div>
                                                        </div>
                                                        <div className="pl-xs -mt-one">
                                                          <div className="flex items-center gap-x-xs border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-transparent">
                                                            <div className="relative top-one">
                                                              <div className="rounded-full overflow-hidden">
                                                                <Image
                                                                  className="block w-[16px] h-[16px]"
                                                                  src="https://www.google.com/s2/favicons?sz=128&amp;domain=lifehack.org"
                                                                  alt="lifehack.org favicon"
                                                                  width="16"
                                                                  height="16"
                                                                />
                                                              </div>
                                                            </div>
                                                            <div className="group-hover:text-super duration-300 transition-all line-clamp-1 break-all default font-sans text-sm text-textMain dark:text-textMainDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                                                              lifehack
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </a>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex flex-row items-center gap-xs mt-sm -ml-sm">
                                      <button
                                        type="button"
                                        className="text-textOff dark:text-textOffDark md:hover:bg-offsetPlus dark:md:hover:bg-offsetPlusDark md:hover:text-superAlt font-sans focus:outline-none outline-none transition duration-300 ease-in-out font-sans select-none items-center relative group justify-center rounded-md cursor-point active:scale-95 origin-center whitespace-nowrap inline-flex text-sm aspect-square h-8"
                                      >
                                        <div className="pointer-events-none absolute bottom-[120%] z-30 translate-y-1 scale-90 opacity-0 shadow-sm transition-all delay-200 duration-200 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
                                          <div className="py-xs px-sm rounded-md border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-offsetPlusDark">
                                            <div className="default font-sans text-xs font-medium text-textMain dark:text-textMainDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                                              <span className="text-zinc-200">Not Accurate</span>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="flex items-center leading-none justify-center gap-xs">
                                          <svg
                                            aria-hidden="true"
                                            focusable="false"
                                            data-prefix="fass"
                                            data-icon="flag"
                                            className="svg-inline--fa fa-flag fa-fw fa-1x"
                                            role="img"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 448 512"
                                          >
                                            <path
                                              fill="currentColor"
                                              d="M64 32V0H0V32 64 368 480v32H64V480 352l64.3-16.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4L448 336V16L393.6 43.2c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22-113.5-12.5L64 48V32z"
                                            ></path>
                                          </svg>
                                        </div>
                                      </button>
                                      <button
                                        type="button"
                                        className="md:hover:bg-offsetPlus text-textOff md:hover:text-textMain dark:md:hover:bg-offsetPlusDark dark:md:hover:text-textMainDark font-sans focus:outline-none outline-none transition duration-300 ease-in-out font-sans select-none items-center relative group justify-center rounded-md cursor-point active:scale-95 origin-center whitespace-nowrap inline-flex text-sm aspect-square h-8"
                                      >
                                        <div className="pointer-events-none absolute bottom-[120%] z-30 translate-y-1 scale-90 opacity-0 shadow-sm transition-all delay-200 duration-200 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
                                          <div className="py-xs px-sm rounded-md border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-offsetPlusDark">
                                            <div className="default font-sans text-xs font-medium text-textMain dark:text-textMainDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                                              <span className="text-zinc-200">View Sources</span>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="flex items-center leading-none justify-center gap-xs">
                                          <svg
                                            aria-hidden="true"
                                            focusable="false"
                                            data-prefix="fass"
                                            data-icon="brackets-square"
                                            className="svg-inline--fa fa-brackets-square fa-fw fa-1x"
                                            role="img"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 448 512"
                                          >
                                            <path
                                              fill="currentColor"
                                              d="M416 32h32V64 448v32H416 320 288V416h32 64V96H320 288V32h32 96zM32 32h96 32V96H128 64V416h64 32v64H128 32 0V448 64 32H32z"
                                            ></path>
                                          </svg>
                                        </div>
                                      </button>
                                      <button
                                        type="button"
                                        className="md:hover:bg-offsetPlus text-textOff md:hover:text-textMain dark:md:hover:bg-offsetPlusDark dark:md:hover:text-textMainDark font-sans focus:outline-none outline-none transition duration-300 ease-in-out font-sans select-none items-center relative group justify-center rounded-md cursor-point active:scale-95 origin-center whitespace-nowrap inline-flex text-sm aspect-square h-8"
                                      >
                                        <div className="pointer-events-none absolute bottom-[120%] z-30 translate-y-1 scale-90 opacity-0 shadow-sm transition-all delay-200 duration-200 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
                                          <div className="py-xs px-sm rounded-md border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-offsetPlusDark">
                                            <div className="default font-sans text-xs font-medium text-textMain dark:text-textMainDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                                              <span className="text-zinc-200">Copy To Clipboard</span>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="flex items-center leading-none justify-center gap-xs">
                                          <svg
                                            aria-hidden="true"
                                            focusable="false"
                                            data-prefix="fass"
                                            data-icon="clipboard"
                                            className="svg-inline--fa fa-clipboard fa-fw fa-1x"
                                            role="img"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 384 512"
                                          >
                                            <path
                                              fill="currentColor"
                                              d="M192 0c-41.8 0-77.4 26.7-90.5 64H0V512H384V64H282.5C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM112 192H272h16v32H272 112 96V192h16z"
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
                        </div>
                      </div>
                      <div id="ppl-message-scroll-target"></div>
                      <div className="z-10 border-t md:border-none bottom-0 md:pb-lg py-sm left-0 right-0 fixed md:sticky justify-center px-sm md:p-0 border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-transparent">
                        <div className="max-w-screen-sm mx-auto border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-transparent">
                          <div>
                            <div className="grow">
                              <div>
                                <div className="rounded-full md:p-sm bg-offset dark:bg-offsetDark">
                                  <div className="relative flex items-center">
                                    <textarea
                                      placeholder="Ask follow-up..."
                                      className="outline-none focus:outline-none w-full font-sans font-medium duration-200 transition-all caret-super focus:ring-1 resize-none overflow-hidden bg-white focus:bg-white border text-textMain border-borderMain focus:ring-borderMain place-holder-textOff dark:bg-offsetDark dark:focus:bg-offsetDark dark:text-textMainDark dark:placeholder-textOffDark dark:border-borderMainDark dark:focus:ring-borderMainDark shadow-sm rounded-t-[32px] rounded-b-[32px] py-md px-lg pr-[49px] md:pr-[59px]"
                                      style={{ height: "58px" }}
                                    ></textarea>
                                    <div className="absolute right-sm flex items-center gap-x-sm">
                                      <button
                                        type="button"
                                        className="bg-super text-white hover:opacity-80 font-sans focus:outline-none outline-none transition duration-300 ease-in-out font-sans select-none items-center relative group justify-center rounded-full cursor-point active:scale-95 origin-center whitespace-nowrap inline-flex text-base aspect-square h-10"
                                      >
                                        <div className="pointer-events-none absolute bottom-[120%] z-30 translate-y-1 scale-90 opacity-0 shadow-sm transition-all delay-200 duration-200 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
                                          <div className="py-xs px-sm rounded-md border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-offsetPlusDark">
                                            <div className="default font-sans text-xs font-medium text-textMain dark:text-textMainDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                                              <span className="text-zinc-200">Start your own thread</span>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="flex items-center leading-none justify-center gap-xs">
                                          <button>
                                            <IconArrowRight
                                              style={{ backgroundColor: Colors.btnColor }}
                                              onClick={() => {}}
                                              size={11}
                                              className="rounded-full bg-blue-500 p-0.5 hover:cursor-pointer hover:bg-blue-600 sm:right-3 sm:top-3 sm:h-10 sm:w-10 text-white"
                                            />
                                          </button>
                                        </div>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="md:hidden">
                          <div className="flex items-center gap-x-sm pt-sm">
                            <button
                              type="button"
                              className="bg-super text-white hover:opacity-80 font-sans focus:outline-none outline-none transition duration-300 ease-in-out font-sans select-none items-center relative group justify-center rounded-md cursor-point active:scale-95 origin-center whitespace-nowrap flex w-full text-sm px-sm font-medium h-8"
                            >
                              <div className="flex items-center leading-none justify-center gap-xs">
                                <span className="flex items-center relative">Sign Up</span>
                              </div>
                            </button>
                            <button
                              type="button"
                              className="bg-offsetPlus dark:bg-offsetPlusDark text-textMain dark:text-textMainDark md:hover:text-textOff md:dark:hover:text-textOffDark font-sans focus:outline-none outline-none transition duration-300 ease-in-out font-sans select-none items-center relative group justify-center rounded-md cursor-point active:scale-95 origin-center whitespace-nowrap flex w-full text-sm px-sm font-medium h-8"
                            >
                              <div className="flex items-center leading-none justify-center gap-xs">
                                <span className="flex items-center relative">Sign In</span>
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
      {showButton && (
        <button
          onClick={handleClick}
          className="fixed bottom-10 right-2 z-5 flex flex-col items-center justify-center rounded bg-gray-100/50 p-1 hover:bg-gray-100/75"
        >
          <span className="text-xs">Scroll top</span>
          <div className="mt-1 flex h-8 w-8 items-start justify-center rounded-full border-2 border-black">
            <IconArrowUp size={24} />
          </div>
        </button>
      )}
    </>
  );
}

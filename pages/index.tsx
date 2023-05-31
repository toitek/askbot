import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import Head from "next/head";
import Image from "next/image";
import { StartContent } from "@/components/StartContent";
import { Search } from "@/components/Search";
import { SetStateAction, useEffect, useRef, useState, KeyboardEvent } from "react";
import { useRouter } from "next/router";
import { Colors } from "@/components/constants/color";
import { Button } from "@/components/Button";
import { SideBar } from "@/components/SideBar";
import AuthPage from "@/components/AuthPage";
import SearchModal from "@/components/SearchModal";
import PopularCard from "@/components/PopularCard";

export default function Home() {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [query, setQuery] = useState<string>("");
  const [search, setSearch] = useState(false);

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const [showThread, setShowThread] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const router = useRouter();

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
        <SideBar
          setShowSignup={setShowSignup}
          newThreadHandler={newThreadHandler}
          yourThreadHandler={yourThreadHandler}
          settingsHandler={settingsHandler}
          activePage="/"
          setShowLogin={setShowLogin}
        />

        <div className="grow">
          <div className="md:flex justify-center h-full px-md ">
            <div className="w-full mx-auto max-w-screen-md md:px-lg py-lg">
              <div className="absolute md:hidden top-sm right-sm">
                <a href="/settings">
                  <div className="relative">
                    <div className="aspect-square rounded-full overflow-hidden flex items-center justify-center  w-5 border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark  bg-offsetPlus dark:bg-offsetPlusDark"></div>
                  </div>
                </a>
              </div>
              <div className="h-full md:flex items-center relative justify-center">
                <div className="w-full space-y-lg">
                  <div>
                    <div className="pb-md md:pb-lg flex items-center justify-center">
                      <div className="flex space-x-sm items-center">
                        <div className="super font-sans text-base text-super selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                          <div className="h-auto transition-all duration-300 rounded-sm overflow-hidden group w-6 md:w-8">
                            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                              <rect width="1024" height="1024" className="transition-all duration-1000 fill-zinc-900 dark:fill-zinc-300 "></rect>
                              <svg className="fill-zinc-50 dark:fill-zinc-900  transition-all duration-1000">
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
                        </div>
                        <div className="default font-sans text-base text-textMain dark:text-textMainDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                          <div className="font-display  font-semibold select-none text-[24px] md:text-[28px]">Chat Ai </div>
                        </div>
                      </div>
                    </div>
                    <Search inputRef={inputRef} query={query} setQuery={setQuery} handleKeyDown={handleKeyDown} handleSearch={handleSearch} />
                  </div>
                  <div className="mt-sm md:mt-lg md:min-w-screen-md min-h-[370px] border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark  bg-transparent">
                    <div className="hidden md:block">
                      <div className="border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark  bg-background dark:bg-backgroundDark">
                        <div className="flex justify-between items-center pb-sm border-b border-border  border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark  bg-transparent">
                          <div className="">
                            <div className="flex items-center gap-x-sm ">
                              <h2 className="default font-sans text-lg font-semibold text-textMain dark:text-textMainDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                                <svg
                                  aria-hidden="true"
                                  focusable="false"
                                  data-prefix="fass"
                                  data-icon="newspaper"
                                  className="svg-inline--fa fa-newspaper fa-fw "
                                  role="img"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 512 512"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M96 32h32H480h32V64 448v32H480 160 128 80 32 0V448 128 96H64v32V416H80 96V64 32zm64 64V224H448V96H160zm0 192v32h16 96 16V288H272 176 160zm160 0v32h16 96 16V288H432 336 320zM160 384v32h16 96 16V384H272 176 160zm160 0v32h16 96 16V384H432 336 320z"
                                  ></path>
                                </svg>
                              </h2>
                              <h2 className="default font-sans text-lg font-semibold text-textMain dark:text-textMainDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                                Popular Now
                              </h2>
                            </div>
                          </div>
                          {/* <div className="flex gap-x-sm">
                            <div className="h-full relative flex items-center">
                              <button
                                type="button"
                                className="bg-offsetPlus dark:bg-offsetPlusDark text-textMain dark:text-textMainDark  md:hover:text-textOff md:dark:hover:text-textOffDark font-sans focus:outline-none outline-none transition duration-300 ease-in-out font-sans  select-none items-center relative group justify-center rounded-md cursor-point active:scale-95 origin-center whitespace-nowrap inline-flex text-sm aspect-square h-8"
                              >
                                <div className="flex items-center leading-none justify-center gap-xs">
                                  <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fass"
                                    data-icon="arrows-rotate"
                                    className="svg-inline--fa fa-arrows-rotate fa-fw fa-1x "
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M89.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L370.3 160H320 288v64h32H448h32V192 64 32H416V64v51.2L398.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C57.2 122 39.6 150.7 28.8 181.4l60.4 21.3zM64 396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7l-60.4-21.3c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L109.6 352H160h32V288H160 32 0v32V448v32H64V448 396.9z"
                                    ></path>
                                  </svg>
                                </div>
                              </button>
                            </div>
                          </div> */}
                        </div>
                      </div>
                    </div>
                    <div className="md:hidden h-12 border-b border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark  bg-transparent">
                      <div className="items-center relative  gap-x-xs flex h-full w-fit w-full">
                        <div className="relative h-full flex items-center w-full px-two flex justify-center">
                          <div className="">
                            <button
                              type="button"
                              className="md:hover:bg-offsetPlus text-textMain dark:text-textMainDark dark:md:hover:bg-offsetPlusDark font-sans focus:outline-none outline-none transition duration-300 ease-in-out font-sans  select-none items-center relative group justify-center rounded-md cursor-point active:scale-95 origin-center whitespace-nowrap inline-flex text-base px-md font-medium h-10"
                            >
                              <div className="flex items-center leading-none justify-center gap-xs">
                                <svg
                                  aria-hidden="true"
                                  focusable="false"
                                  data-prefix="fass"
                                  data-icon="newspaper"
                                  className="svg-inline--fa fa-newspaper fa-fw fa-1x "
                                  role="img"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 512 512"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M96 32h32H480h32V64 448v32H480 160 128 80 32 0V448 128 96H64v32V416H80 96V64 32zm64 64V224H448V96H160zm0 192v32h16 96 16V288H272 176 160zm160 0v32h16 96 16V288H432 336 320zM160 384v32h16 96 16V384H272 176 160zm160 0v32h16 96 16V384H432 336 320z"
                                  ></path>
                                </svg>
                                <span className="flex items-center relative ">Popular</span>
                              </div>
                            </button>
                            <div className="absolute bottom-0 left-0 right-0 h-[3px] rounded-t-sm bg-zinc-800 dark:bg-zinc-50 border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark  bg-transparent"></div>
                          </div>
                        </div>
                        <div className="relative h-full flex items-center w-full px-two flex justify-center">
                          <div className="">
                            <button
                              type="button"
                              className="md:hover:bg-offsetPlus text-textOff md:hover:text-textMain dark:md:hover:bg-offsetPlusDark  dark:md:hover:text-textMainDark font-sans focus:outline-none outline-none transition duration-300 ease-in-out font-sans  select-none items-center relative group justify-center rounded-md cursor-point active:scale-95 origin-center whitespace-nowrap inline-flex text-base px-md font-medium h-10"
                            >
                              <div className="flex items-center leading-none justify-center gap-xs">
                                <svg
                                  aria-hidden="true"
                                  focusable="false"
                                  data-prefix="fass"
                                  data-icon="layer-group"
                                  className="svg-inline--fa fa-layer-group fa-fw fa-1x "
                                  role="img"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 576 512"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M0 128L288 256 576 128 288 0 0 128zm104.6 81.5L0 256 288 384 576 256 471.4 209.5 288 291 104.6 209.5zM288 419L104.6 337.5 0 384 288 512 576 384 471.4 337.5 288 419z"
                                  ></path>
                                </svg>
                                <span className="flex items-center relative ">Your Threads</span>
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
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

import React, { useState } from "react";
import { Button } from "./Button";
import { IconBrandDiscord, IconBrandTwitter, IconLogin, IconStack2, IconStack3, IconArticle } from "@tabler/icons-react";
import Image from "next/image";
import localforage from "localforage";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/router";

type Props = {
  setShowSignup?: (show: boolean) => void;
  setShowLogin?: (show: boolean) => void;
  newThreadHandler?: () => void;
  yourThreadHandler?: () => void;
  activePage: string;
  admin?: boolean;
  settingsHandler?: () => void;
  popularHandler?: () => void;
  dashboardHandler?: () => void;
  uploadHandler?: () => void;
  uploadUrlsHandler?: () => void;
};

export const SideBar = ({
  setShowSignup,
  setShowLogin,
  newThreadHandler,
  yourThreadHandler,
  activePage,
  admin,
  popularHandler,
  settingsHandler,
  dashboardHandler,
  uploadHandler,
  uploadUrlsHandler,
}: Props) => {
  const [userName, setUsername] = useState("");

  localforage.getItem("user").then((user: any) => {
    setUsername(user?.session.email);
  });

  return (
    <div className="hidden md:block min-[2500px]:fixed flex-none w-sideBarWidth 2xl:w-sideBarWidthXL border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-transparent">
      <div className="h-full fixed w-sideBarWidth 2xl:w-sideBarWidthXL border-r z-20 border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-offset dark:bg-offsetDark">
        <div className="pt-lg pb-sm sticky top-0 flex justify-between flex-col h-full">
          <div className="grow">
            <a className="pl-md mb-lg block ">
              <div className="flex space-x-sm items-center">
                <div className="super font-sans text-base text-super selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                  <div className="h-auto transition-all duration-300 rounded-sm overflow-hidden group w-6 md:w-6">
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
                  <div className="font-display  font-semibold select-none text-[24px] md:text-[22px]">Chat Ai </div>
                </div>
              </div>
            </a>
            {admin && userName ? (
              <>
                <div className="">
                  <div className="items-center relative space-y-sm">
                    <div className="relative">
                      <div
                        className={`md:dark:hover:bg-offsetPlusDark md:hover:bg-offsetPlus ml-xs rounded-l-full overflow-hidden transition duration-300 ${
                          activePage === "/" && "bg-offsetPlus dark:bg-offsetPlusDark"
                        }`}
                      >
                        <a
                          className="md:hover:bg-offsetPlus text-textMain dark:text-textMainDark dark:md:hover:bg-offsetPlusDark font-sans focus:outline-none outline-none transition duration-300 ease-in-out font-sans select-none items-center relative group justify-start rounded-none cursor-point active:scale-95 origin-center whitespace-nowrap flex w-full text-base px-md font-medium h-10"
                          onClick={dashboardHandler}
                        >
                          <div className="flex items-center leading-none justify-start gap-xs">
                            <IconArticle size={20} color="#c4c4c9" />
                            <span className="flex items-center relative">Dashboard</span>
                          </div>
                        </a>
                        <div className="absolute bg-zinc-800 dark:bg-zinc-50 border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-transparent"></div>
                      </div>
                    </div>

                    <div className="relative">
                      <div
                        className={`md:dark:hover:bg-offsetPlusDark md:hover:bg-offsetPlus ml-xs rounded-l-full overflow-hidden transition duration-300 ${
                          activePage === "login" && "bg-offsetPlus dark:bg-offsetPlusDark"
                        }`}
                      >
                        <button
                          type="button"
                          className="md:hover:bg-offsetPlus text-textOff md:hover:text-textMain dark:md:hover:bg-offsetPlusDark dark:md:hover:text-textMainDark font-sans focus:outline-none outline-none transition duration-300 ease-in-out font-sans select-none items-center relative group justify-start rounded-none cursor-point active:scale-95 origin-center whitespace-nowrap flex w-full text-base px-md font-medium h-10"
                          onClick={uploadHandler}
                        >
                          <div className="flex items-center leading-none justify-start gap-xs">
                            <IconLogin size={20} color="#c4c4c9" />
                            <span className="flex items-center relative">Upload files</span>
                          </div>
                        </button>
                      </div>
                    </div>
                    <div className="relative">
                      <div
                        className={`md:dark:hover:bg-offsetPlusDark md:hover:bg-offsetPlus ml-xs rounded-l-full overflow-hidden transition duration-300 ${
                          activePage === "login" && "bg-offsetPlus dark:bg-offsetPlusDark"
                        }`}
                      >
                        <button
                          type="button"
                          className="md:hover:bg-offsetPlus text-textOff md:hover:text-textMain dark:md:hover:bg-offsetPlusDark dark:md:hover:text-textMainDark font-sans focus:outline-none outline-none transition duration-300 ease-in-out font-sans select-none items-center relative group justify-start rounded-none cursor-point active:scale-95 origin-center whitespace-nowrap flex w-full text-base px-md font-medium h-10"
                          onClick={uploadUrlsHandler}
                        >
                          <div className="flex items-center leading-none justify-start gap-xs">
                            <IconLogin size={20} color="#c4c4c9" />
                            <span className="flex items-center relative">Upload Urls</span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="mb-md" onClick={newThreadHandler}>
                  <div>
                    <div className="border rounded-full pl-md pr-sm py-sm flex justify-between items-center ml-md mr-md mt-md cursor-pointer group ring-2 ring-transparent hover:border-white hover:!ring-super transition duration-300 border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-background dark:bg-backgroundDark">
                      <div className="light font-sans text-sm font-medium text-textOff dark:text-textOffDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                        New Thread
                      </div>
                      <div className="flex items-center space-x-two light font-sans text-xs font-medium text-textOff dark:text-textOffDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                        <div className="rounded-md min-w-5 h-5 flex items-center px-xs justify-center border border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-transparent">
                          Ctrl
                        </div>
                        <div className="font-mono rounded-md w-5 h-5 flex items-center justify-center border border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-transparent">
                          I
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="items-center relative space-y-sm">
                    <div className="relative">
                      <div
                        className={`md:dark:hover:bg-offsetPlusDark md:hover:bg-offsetPlus ml-xs rounded-l-full overflow-hidden transition duration-300 ${
                          activePage === "/" && "bg-offsetPlus dark:bg-offsetPlusDark"
                        }`}
                      >
                        <a
                          className="md:hover:bg-offsetPlus text-textMain dark:text-textMainDark dark:md:hover:bg-offsetPlusDark font-sans focus:outline-none outline-none transition duration-300 ease-in-out font-sans select-none items-center relative group justify-start rounded-none cursor-point active:scale-95 origin-center whitespace-nowrap flex w-full text-base px-md font-medium h-10"
                          onClick={popularHandler}
                        >
                          <div className="flex items-center leading-none justify-start gap-xs">
                            <IconArticle size={20} color="#c4c4c9" />
                            <span className="flex items-center relative">Popular</span>
                          </div>
                        </a>
                        <div className="absolute bg-zinc-800 dark:bg-zinc-50 border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-transparent"></div>
                      </div>
                    </div>
                    <div className="relative">
                      <div
                        className={`md:dark:hover:bg-offsetPlusDark md:hover:bg-offsetPlus ml-xs rounded-l-full overflow-hidden transition duration-300 ${
                          activePage === "thread" && "bg-offsetPlus dark:bg-offsetPlusDark"
                        }`}
                      >
                        <button
                          type="button"
                          className="md:hover:bg-offsetPlus text-textOff md:hover:text-textMain dark:md:hover:bg-offsetPlusDark dark:md:hover:text-textMainDark font-sans focus:outline-none outline-none transition duration-300 ease-in-out font-sans select-none items-center relative group justify-start rounded-none cursor-point active:scale-95 origin-center whitespace-nowrap flex w-full text-base px-md font-medium h-10"
                          onClick={yourThreadHandler}
                        >
                          <div className="flex items-center leading-none justify-start gap-xs">
                            <IconStack2 size={20} color="#c4c4c9" />
                            <span className="flex items-center relative">Your Threads</span>
                          </div>
                        </button>
                      </div>
                    </div>
                    {!userName && (
                      <div className="relative">
                        <div
                          className={`md:dark:hover:bg-offsetPlusDark md:hover:bg-offsetPlus ml-xs rounded-l-full overflow-hidden transition duration-300 ${
                            activePage === "login" && "bg-offsetPlus dark:bg-offsetPlusDark"
                          }`}
                        >
                          <button
                            type="button"
                            className="md:hover:bg-offsetPlus text-textOff md:hover:text-textMain dark:md:hover:bg-offsetPlusDark dark:md:hover:text-textMainDark font-sans focus:outline-none outline-none transition duration-300 ease-in-out font-sans select-none items-center relative group justify-start rounded-none cursor-point active:scale-95 origin-center whitespace-nowrap flex w-full text-base px-md font-medium h-10"
                            onClick={() => setShowLogin && setShowLogin(true)}
                          >
                            <div className="flex items-center leading-none justify-start gap-xs">
                              <IconLogin size={20} color="#c4c4c9" />
                              <span className="flex items-center relative">Login</span>
                            </div>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {!userName && !admin && (
              <div className="ml-md mt-md mr-md">
                <button
                  type="button"
                  className="bg-super text-white hover:opacity-80 font-sans focus:outline-none outline-none transition duration-300 ease-in-out font-sans select-none items-center relative group justify-center rounded-full cursor-point active:scale-95 origin-center whitespace-nowrap flex w-full text-base px-md font-medium h-10"
                  onClick={() => setShowSignup && setShowSignup(true)}
                >
                  <div className="flex items-center leading-none justify-center gap-xs">
                    <span className="flex items-center relative">Sign Up</span>
                  </div>
                </button>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-y-sm">
            {userName && (
              <a onClick={settingsHandler}>
                <div className="px-sm py-sm border-b border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark  bg-transparent">
                  <div className="flex py-xs pl-sm pr-sm items-center rounded-full gap-x-sm border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark  transition duration-300 bg-transparent md:hover:bg-offsetPlus md:dark:hover:bg-offsetPlusDark">
                    <div className="relative">
                      <div className="aspect-square rounded-full overflow-hidden flex items-center justify-center  w-9 border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark  bg-offsetPlus dark:bg-offsetPlusDark">
                        <Image src={"/user.png"} alt="user avatar" width={20} height={20} />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-x-xs relative">
                        <div className="line-clamp-1 break-all default font-sans text-sm font-medium text-textMain dark:text-textMainDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                          {userName}
                        </div>
                      </div>
                      <div className="light font-sans text-sm text-textOff dark:text-textOffDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                        Settings
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            )}

            {!admin && (
              <div>
                <div className="flex items-center gap-x-xs px-xs mb-sm border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-transparent">
                  <a
                    className="md:hover:bg-offsetPlus text-textOff md:hover:text-textMain dark:md:hover:bg-offsetPlusDark dark:md:hover:text-textMainDark font-sans focus:outline-none outline-none transition duration-300 ease-in-out font-sans select-none items-center relative group justify-center rounded-full cursor-point active:scale-95 origin-center whitespace-nowrap inline-flex text-sm px-sm font-medium h-8"
                    href="https://twitter.com/perplexity_ai"
                  >
                    <div className="flex items-center leading-none justify-center gap-xs">
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fab"
                        data-icon="twitter"
                        className="svg-inline--fa fa-twitter fa-fw fa-1x"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                        ></path>
                      </svg>
                      <span className="flex items-center relative">Follow</span>
                    </div>
                  </a>
                  <a
                    className="md:hover:bg-offsetPlus text-textOff md:hover:text-textMain dark:md:hover:bg-offsetPlusDark dark:md:hover:text-textMainDark font-sans focus:outline-none outline-none transition duration-300 ease-in-out font-sans select-none items-center relative group justify-center rounded-full cursor-point active:scale-95 origin-center whitespace-nowrap inline-flex text-sm px-sm font-medium h-8"
                    href="https://discord.gg/perplexity-ai"
                  >
                    <div className="flex items-center leading-none justify-center gap-xs">
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fab"
                        data-icon="discord"
                        className="svg-inline--fa fa-discord fa-fw fa-1x"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 512"
                      >
                        <path
                          fill="currentColor"
                          d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"
                        ></path>
                      </svg>
                      <span className="flex items-center relative">Join</span>
                    </div>
                  </a>
                </div>
                <div className="flex flex-wrap gap-x-sm gap-y-xs px-sm pb-[58px] md:pb-0 border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-transparent">
                  <a href="/about">
                    <div className="light font-sans text-xs font-medium text-textOff dark:text-textOffDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                      About
                    </div>
                  </a>
                  <a href="/blog">
                    <div className="light font-sans text-xs font-medium text-textOff dark:text-textOffDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                      Blog
                    </div>
                  </a>
                  <a href="/privacy">
                    <div className="light font-sans text-xs font-medium text-textOff dark:text-textOffDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                      Privacy Policy
                    </div>
                  </a>
                  <a href="/tos">
                    <div className="light font-sans text-xs font-medium text-textOff dark:text-textOffDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                      Terms of Service
                    </div>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

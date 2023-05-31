import React, { Dispatch, RefObject, SetStateAction } from "react";
import { IconArrowRight, IconExternalLink, IconSearch } from "@tabler/icons-react";
import { Colors } from "./constants/color";

interface prop {
  inputRef: RefObject<HTMLTextAreaElement>;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  handleKeyDown: (e: any) => void;
  handleSearch: () => void;
}
export const Search = (prp: prop) => {
  return (
    <div>
      <div className="grow">
        <div>
          <div className="rounded-full rounded-md">
            <div className="relative flex items-center">
              <div className="absolute bottom-sm md:bottom-[6px] left-[6px] left-sm">
                <div className="">
                  <div>
                    <button
                      type="button"
                      className="md:hover:bg-offsetPlus text-textOff md:hover:text-textMain dark:md:hover:bg-offsetPlusDark dark:md:hover:text-textMainDark font-sans focus:outline-none outline-none transition duration-300 ease-in-out font-sans select-none items-center relative group justify-center rounded-full cursor-point active:scale-95 origin-center whitespace-nowrap inline-flex text-sm px-sm font-medium h-8"
                    >
                      <div className="flex items-center leading-none justify-center gap-xs">
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fass"
                          data-icon="globe"
                          className="svg-inline--fa fa-globe fa-fw fa-1x"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="M352 256c0 22.1-2.2 43.5-6.1 64H166.1c-3.9-20.5-6.1-41.9-6.1-64s2.2-43.5 6.1-64H345.9c3.9 20.5 6.1 41.9 6.1 64zm26.4-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H378.4c3.6-20.5 5.6-41.9 5.6-64s-2-43.5-5.6-64zm115-32h-122c-17-65.6-48.3-120-74-156.7c89.2 14.5 163 75.2 196 156.7zm-155.1 0H173.7c11.4-40.2 28.4-75.9 45.8-105.4c13-21.9 25.9-40 36.5-53.5c10.5 13.5 23.5 31.6 36.5 53.5c17.4 29.4 34.5 65.1 45.8 105.4zm-197.7 0H18.6c33-81.5 106.7-142.2 196-156.7c-25.7 36.7-57 91-74 156.7zM8.1 192H133.6c-3.6 20.5-5.6 41.9-5.6 64s2 43.5 5.6 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM173.7 352H338.3c-11.4 40.2-28.4 75.9-45.8 105.4c-13 21.9-25.9 40-36.5 53.5c-10.5-13.5-23.5-31.6-36.5-53.5c-17.4-29.4-34.5-65.1-45.8-105.4zm-33.2 0c17 65.6 48.3 120 74 156.7c-89.2-14.5-163-75.2-196-156.7h122zm352.8 0c-33 81.5-106.7 142.2-196 156.7c25.7-36.7 57-91 74-156.7h122z"
                          ></path>
                        </svg>
                        <span className="flex items-center relative">All</span>
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fass"
                          data-icon="chevron-down"
                          className="svg-inline--fa fa-chevron-down fa-sm"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="M256 429.3l22.6-22.6 192-192L493.3 192 448 146.7l-22.6 22.6L256 338.7 86.6 169.4 64 146.7 18.7 192l22.6 22.6 192 192L256 429.3z"
                          ></path>
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              <textarea
                className="outline-none focus:outline-none w-full font-sans font-medium duration-200 transition-all caret-super focus:ring-1 resize-none overflow-hidden bg-white focus:bg-white border text-textMain border-borderMain focus:ring-borderMain place-holder-textOff dark:bg-offsetDark dark:focus:bg-offsetDark dark:text-textMainDark dark:placeholder-textOffDark dark:border-borderMainDark dark:focus:ring-borderMainDark rounded-t-md rounded-b-md text-base p-md pb-xl"
                style={{ height: "90px" }}
                ref={prp.inputRef}
                placeholder="Ask anything"
                value={prp.query}
                onChange={e => prp.setQuery(e.target.value)}
                onKeyDown={prp.handleKeyDown}
              ></textarea>
              <div className="absolute right-sm flex items-center gap-x-sm bottom-sm right-sm">
                <button
                  type="button"
                  className="text-textOff md:hover:text-textMain dark:md:hover:text-textMainDark font-sans focus:outline-none outline-none transition duration-300 ease-in-out font-sans select-none items-center relative group justify-center rounded-full cursor-point active:scale-95 origin-center whitespace-nowrap inline-flex text-sm px-sm font-medium h-8"
                >
                  <div className="pointer-events-none absolute bottom-[120%] z-30 translate-y-1 scale-90 opacity-0 shadow-sm transition-all delay-200 duration-200 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
                    <div className="py-xs px-sm rounded-md border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-offsetPlusDark">
                      <div className="default font-sans text-xs font-medium text-textMain dark:text-textMainDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                        <span className="text-zinc-200">Powered by GPT-4. 5 uses left. Reloads every 4 hours.</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center leading-none justify-center gap-xs">
                    <div>
                      <div className="rounded-full p-three border transition duration-300 border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-transparent">
                        <div className="relative w-8 transition duration-200 ease-in-out">
                          <div className="rounded-full h-4 w-4 transition-all duration-300 ease-in-out shadow-sm md:group-hover:scale-90 ml-0 border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-offsetPlus dark:bg-offsetPlusDark"></div>
                        </div>
                      </div>
                    </div>
                    <span className="flex items-center relative">Copilot</span>
                    <span className=""> · 5</span>
                  </div>
                </button>
                {/* <button
                  type="button"
                  className="text-white hover:opacity-80 font-sans focus:outline-none outline-none transition duration-300 ease-in-out font-sans select-none items-center relative group justify-center rounded-full cursor-point active:scale-95 origin-center whitespace-nowrap inline-flex text-sm aspect-square h-8"
                  onClick={prp.handleSearch}
                >
                  <div className="flex items-center leading-none justify-center gap-xs">
                    <IconArrowRight color={Colors.btnColor} size={22} />
                  </div>
                </button> */}
                <button>
                  <IconArrowRight
                    style={{ backgroundColor: Colors.btnColor }}
                    onClick={prp.handleSearch}
                    size={11}
                    className="rounded-full bg-blue-500 p-0.5 hover:cursor-pointer hover:bg-blue-600 sm:right-3 sm:top-3 sm:h-10 sm:w-10 text-white"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="relative w-full mt-4 max-w-[750px] ">
    //   <input
    //     ref={prp.inputRef}
    //     className="h-10 w-full bg-[#171719] text-white rounded-full border border-zinc-600 pr-12 pl-11 focus:border-zinc-800 focus:outline-none focus:ring-1 focus:ring-zinc-800 sm:h-16 sm:py-2 sm:pr-16 sm:pl-16 sm:text-lg"
    //     type="text"
    //     placeholder="Ask anything"
    //     value={prp.query}
    //     onChange={(e) => prp.setQuery(e.target.value)}
    //     onKeyDown={prp.handleKeyDown}
    //   />
    //   <button>
    //     <IconArrowRight
    //       style={{ backgroundColor: Colors.btnColor }}
    //       onClick={prp.handleSearch}
    //       className="absolute right-2 top-2.5 h-6 w-7 rounded-full bg-blue-500 p-1 hover:cursor-pointer hover:bg-blue-600 sm:right-3 sm:top-3 sm:h-10 sm:w-10 text-white"
    //     />
    //   </button>
    // </div>
  );
};

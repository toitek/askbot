import React from "react";

export const AnswerList = () => {
  return (
    <li>
      <span className="">
        Tackle one area at a time: Start with one area of your life that you want to improve and focus on that first
        <span className="whitespace-nowrap">
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="citation ml-xs inline"
            href="https://www.healthline.com/health/how-to-think-positive"
          >
            <div className="inline-flex relative -top-[0.3rem] light font-sans text-base text-textOff dark:text-textOffDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
              <span className="text-[0.60rem]">
                <div className="inline-flex h-[1rem] min-w-[1rem] px-[0.2em] rounded-full items-center justify-center text-center font-semibold md:hover:text-white tabular-nums border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark transition duration-300 bg-offsetPlus dark:bg-offsetPlusDark md:hover:bg-super">
                  4
                </div>
              </span>
            </div>
          </a>
          .
        </span>
      </span>
    </li>
  );
};

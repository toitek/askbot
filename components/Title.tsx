import React from "react";

export const Title = () => {
  return (
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
  );
};

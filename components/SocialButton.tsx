import React from "react";
import Image from "next/image";

export const SocialButton = () => {
  return (
    <div>
      <a href="https://www.hellomagazine.com/us/" className="block group cursor-pointer" target="_blank" rel="noopener noreferrer">
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
                    src="https://www.google.com/s2/favicons?sz=128&amp;domain=hellomagazine.com"
                    alt="hellomagazine.com favicon"
                    width={16}
                    height={16}
                  />
                </div>
              </div>
              <div className="group-hover:text-super duration-300 transition-all line-clamp-1 break-all default font-sans text-sm text-textMain dark:text-textMainDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                hellomagazine
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

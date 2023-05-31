import React, { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState, KeyboardEvent } from "react";
import { Search } from "./Search";
import { Colors } from "./constants/color";
import Image from "next/image";
import { Cards } from "./Cards";
import { useRouter } from "next/router";

interface Props {
  inputRef: RefObject<HTMLInputElement>;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  setSearch: Dispatch<SetStateAction<boolean>>;
  handleKeyDown: (e: any) => void;
  handleSearch: () => void;
}

export const StartContent = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState<string>("");
  const [search, setSearch] = useState(false);
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
    }
  };

  const handleSearch = () => {
    setSearch(true);
  };
  const textCard = [
    "I need a tool for editing images and photos",
    "I need a tool for designing adverts for marketing",
    "Image background remover deals",
    "I need a tool for editing my blog post videos",
  ];
  return (
    <div className={`mx-auto flex w-full grow flex-col items-center gap-y-8 py-6 px-4 md:py-16 md:px-8 bg-[${Colors.bgColor}]`}>
      <div className="flex flex-col items-center gap-y-2 text-center">
        <div className="flex flex-row justify-center items-center ">
          <Image
            alt="Mighty deals AI"
            src="https://mightydeals.s3.amazonaws.com/css-images/logo2x.png"
            className="w-20 h-10 sm:w-40 sm:h-20"
            width={150}
            height={75}
            decoding="async"
            data-nimg="1"
            loading="lazy"
            style={{ color: "transparent" }}
          />
          <h1 className="font-header font-bold text-3xl !text-[1rem] md:!text-[1.5rem] px-1 text-[#7a4393]">Ai</h1>
        </div>
        <div className="my-2 text-center">
          <h1 className="font-header text-3xl font-bold !text-[26px] md:!text-[36px]">Score unbeatable deals with AI precision</h1>
          <h5 className="mt-2 mb-3 text-lg">Find affordable product options by chatting with Mighty Deals AI</h5>
        </div>
        <Search inputRef={inputRef} setQuery={setQuery} query={query} handleKeyDown={handleKeyDown} handleSearch={handleSearch} />
        <>
          <div className="grid gap-4 pt-4 text-black-pearl sm:max-md:grid-cols-3 md:max-lg:grid-cols-3 max-sm:grid-cols-1 lg:grid-cols-4">
            {textCard.map((text, index) => {
              const handleClick = () => {
                setQuery(text);
                setSearch(true);
              };
              return <Cards key={index} text={text} onClick={handleClick} />;
            })}
          </div>
        </>
      </div>
    </div>
  );
};

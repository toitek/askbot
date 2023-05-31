import { IconX, IconBrandApple, IconBrandGoogle } from "@tabler/icons-react";
import React, { Dispatch, RefObject, SetStateAction, useRef, useState } from "react";
import { Search } from "./Search";

interface Prop {
  inputRef: RefObject<HTMLTextAreaElement>;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  handleKeyDown: (e: any) => void;
  handleSearch: () => void;
  onClose: () => void;
}

const SearchModal = ({ onClose, handleKeyDown, handleSearch, inputRef, query, setQuery }: Prop) => {
  const parent = useRef<boolean>(false);
  const child = useRef<boolean>(false);
  return (
    <>
      <div className="bg-black/70 fixed top-0 left-0 bottom-0 right-0 z-20 transition-all duration-5000 items-center animate-in fade-in duration-200"></div>
      <div
        onClick={() => {
          parent.current = true;
          if (parent.current && !child.current) {
            onClose();
          }
          child.current = false;
        }}
        className="flex justify-center fixed top-0 left-0 bottom-0 right-0 z-20 items-center "
      >
        <div className="animate-in fade-in zoom-in-95 duration-300">
          <div
            className="max-w-screen-md min-w-[790px] w-[50vw] p-lg rounded-xl shadow-md relative border-borderMain/75 dark:border-borderMainDark divide-borderMain dark:divide-borderMainDark ring-borderMain dark:ring-borderMainDark bg-offset dark:bg-offsetDark"
            onClick={() => {
              child.current = true;
              parent.current = false;
            }}
          >
            <Search inputRef={inputRef} query={query} setQuery={setQuery} handleKeyDown={handleKeyDown} handleSearch={handleSearch} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchModal;

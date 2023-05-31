import React from "react";

interface Text {
  text: string;
  onClick: () => void;
}

export const Cards: React.FC<Text> = ({ text, onClick }) => {
  return (
    <button
      className="relative rounded border border-sundog bg-white py-6 px-4 mx-2 pb-12 text-left shadow-md outline-none hover:border-black-pearl [&amp;:nth-child(3)]:max-lg:hidden hover:border-gray-400"
      onClick={onClick}
    >
      {text}
      <div className="absolute bottom-4 right-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="h-6 w-6 absolute bottom-1 right-1 mt-3 bi bi-arrow-right"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
          />
        </svg>
      </div>
    </button>
  );
};

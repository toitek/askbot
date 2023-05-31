import React from "react";

interface Prp {
  url: string;
  title: string;
  content: string;
  index: number;
}
export const ResponseText = (prp: Prp) => {
  return (
    <div>
      <p>
        <a href={prp.url} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
          {prp.title && prp.index + 1 + "." + " " + prp.title}
        </a>{" "}
        {prp.content}
      </p>
    </div>
  );
};

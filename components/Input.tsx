import React from "react";

interface Props {
  type: string;
  name: string;
  placeHolder: string;
  value: string;
  onChange: (value: string) => void;
  pressDownHandler?: () => void;
}
export const Input = (prp: Props) => {
  return (
    <input
      type={prp.type}
      name={prp.name}
      className="w-full py-2 px-4 outline-none text-[#000] rounded-lg border border-gray-400"
      placeholder={prp.placeHolder}
      value={prp.value}
      onChange={(e) => prp.onChange(e.target.value)}
      onKeyDown={prp.pressDownHandler}
    />
  );
};

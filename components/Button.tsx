import React from "react";
import { Colors } from "./constants/color";

interface Props {
  clickHandler: () => void;
  text: string;
  style?: React.CSSProperties;
  transparent?: boolean;
}

export const Button = (props: Props) => {
  return (
    <button
      className={`w-full my-2 px-4 py-2 text-sm border-full rounded-full text-white bg-[#007aff] hover:bg-[${Colors.btnColor}-600]`}
      onClick={props.clickHandler}
      style={props.style}
    >
      {props.text}
    </button>
  );
};

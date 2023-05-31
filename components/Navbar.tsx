import { useRouter } from "next/router";
import { FC } from "react";
import { Button } from "./Button";

interface Props {
  HideLogin?: boolean;
  admin?: boolean;
  loggedIn?: boolean;
}
export const Navbar = (Prp: Props) => {
  const router = useRouter();
  const HandlerClick = () => {
    router.push({ pathname: "/Login" });
  };
  return (
    <div className="flex w-full h-10 sm:h-20 border-b border-gray-300 py-2 px-8 items-center justify-between">
      <div className="flex items-center justify-center sm:justify-start">
        <a
          href="https://www.mightydeals.com/"
          className="w-16 sm:w-20 h-8 sm:h-10 p-2 sm:p-4 bg-center bg-cover hover:opacity-50"
          style={{ backgroundImage: "url(https://mightydeals.s3.amazonaws.com/css-images/logo2x.png)" }}
        ></a>
      </div>
      {!Prp.HideLogin && (
        <>
          <div className="flex sm:hidden">
            <Button clickHandler={HandlerClick} text="Login" />
          </div>
          <div className="hidden sm:flex items-center justify-between">
            <Button clickHandler={HandlerClick} text="Login" />
          </div>
        </>
      )}
      {Prp.admin && (
        <div className="flex flex-row">
          <button className="p-2 hover:opacity-50" onClick={() => router.push({ pathname: "/EditConfig" })}>
            Edit configurations
          </button>
          <button className="p-2 hover:opacity-50" onClick={() => router.push({ pathname: "/UploadFiles" })}>
            Upload
          </button>
        </div>
      )}
      {Prp.loggedIn && (
        <>
          <div className="flex sm:hidden">
            <Button clickHandler={HandlerClick} text="Logout" />
          </div>
          <div className="hidden sm:flex items-center justify-between">
            <Button clickHandler={HandlerClick} text="Logout" />
          </div>
        </>
      )}
    </div>
  );
};

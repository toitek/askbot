import { createClient } from "@supabase/supabase-js";
import { IconX, IconBrandApple, IconBrandGoogle } from "@tabler/icons-react";
import React, { useState } from "react";
import localforage from "localforage";

interface Prop {
  onClose: () => void;
  setShowSignup?: (show: boolean) => void;
  setShowLogin?: (show: boolean) => void;
  showSignup?: boolean;
  showLogin?: boolean;
}

const AuthPage = ({ onClose, setShowSignup, setShowLogin, showLogin, showSignup }: Prop) => {
  const [email, setEmail] = useState("");
  const [password, setpassWord] = useState("");
  const [error, setError] = useState("");
  const [invalidEmail, setinvalidEmail] = useState(false);
  const [invalidPassword, setinvalidPassword] = useState(false);
  const signUpHandler = async () => {
    if (email === "") {
      setinvalidEmail(true);
      setError("Please enter a valid email address");
      return;
    }
    if (password === "" && password.length < 8) {
      setinvalidPassword(true);
      setError("Please enter a valid password");
      return;
    }
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.NEXT_PUBLIC_SUPABASE_SERVICE_URL as string);
    if (showSignup) {
      const { data, error } = await supabase.auth.signUp({ email: email.toLowerCase(), password: password });
      if (error) {
        setError(error.message);
        return;
      } else {
        const user = { session: data.user };
        localforage.setItem("user", user);
        setShowLogin && setShowLogin(false);
        setShowSignup && setShowSignup(false);
      }
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({ email: email.toLowerCase(), password: password });
      if (error) {
        setError(error.message);
        return;
      } else {
        const user = { session: data.user };
        localforage.setItem("user", user);
        setShowLogin && setShowLogin(false);
        setShowSignup && setShowSignup(false);
      }
    }
  };
  return (
    <>
      <div className="bg-black/70 fixed top-0 left-0 bottom-0 right-0 z-20 transition-all duration-5000 items-center animate-in fade-in duration-200"></div>
      <div className="flex justify-center fixed top-0 left-0 bottom-0 right-0 z-20 items-center ">
        <div className="">
          <div className="bg-[#202025] text-white dark:bg-offsetDark md:w-full shadow-md overflow-auto animate-in fade-in md:rounded-xl md:min-w-[600px] max-w-screen-md shadow-md relative h-full max-h-[100vh] md:max-h-[95vh] overflow-auto zoom-in-95 duration-300">
            <div className="absolute right-0 top-xs right-xs">
              <button
                type="button"
                className="font-sans focus:outline-none outline-none transition duration-300 ease-in-out font-sans select-none items-center relative group justify-center rounded-full cursor-point active:scale-95 origin-center whitespace-nowrap inline-flex text-sm aspect-square h-8"
                onClick={onClose}
              >
                <div className="flex items-center leading-none justify-center gap-xs">
                  <div className="flex items-center justify-center w-8 h-8 border border-[#2a2a33]  bg-[#2a2a33] rounded-full">
                    <IconX size={18} />
                  </div>
                </div>
              </button>
            </div>

            <div className="flex flex-col h-full">
              <div className=" px-6 md:px-xl grow md:pt-xl md:pb-xl">
                <div className="flex h-full items-center md:block">
                  <div className="grow">
                    <div className=" text-[#007aff] text-center super font-display text-4xl md:text-6xl font-bold text-super selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                      Welcome
                    </div>
                    <h2 className="text-[#6e6e76]  text-center mt-sm light font-sans text-lg font-semibold text-textOff dark:text-textOffDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                      Sign in or sign up to continue
                    </h2>
                    <div className="max-w-sm mx-auto mt-lg">
                      <div className="space-y-sm">
                        <button
                          type="button"
                          className="bg-[#2a2a33] text-black my-4 py-0.5 px-3 font-sans focus:outline-none outline-none transition duration-300 ease-in-out font-sans select-none items-center relative group justify-center rounded-full cursor-point active:scale-95 origin-center whitespace-nowrap flex w-full text-base px-md font-medium h-10"
                        >
                          <div className="flex items-center leading-none justify-center gap-xs">
                            <button className={`w-full `}>
                              <span className="flex items-center justify-center">
                                <IconBrandGoogle size={20} color="#c4c4c9" />
                                <span className="px-4 text-[#c4c4c9]">Continue with Google</span>
                              </span>
                            </button>
                          </div>
                        </button>
                        <button
                          type="button"
                          className="bg-[#2a2a33] text-black my-4 py-0.5 px-3 font-sans focus:outline-none outline-none transition duration-300 ease-in-out font-sans select-none items-center relative group justify-center rounded-full cursor-point active:scale-95 origin-center whitespace-nowrap flex w-full text-base px-md font-medium h-10"
                        >
                          <div className="flex items-center leading-none justify-center gap-xs">
                            <button className={`w-full `}>
                              <span className="flex items-center justify-center">
                                <IconBrandApple size={20} color="#c4c4c9" />
                                <span className="px-4 text-[#c4c4c9]">Continue with Apple</span>
                              </span>
                            </button>
                          </div>
                        </button>
                      </div>
                      <div className="border-t border-[#38383a] mt-md pt-md space-y-sm ">
                        <div>
                          <div className="flex items-center text-center justify-between mb-sm">
                            <div className="p-sm rounded-md ">
                              <div className="default font-sans text-xs font-medium  dark:text-textMainDark selection:bg-super selection:text-white dark:selection:bg-opacity-50 selection:bg-opacity-70">
                                {(invalidEmail || invalidPassword || error) && <span className="text-[#d15959] text-center">{error}</span>}
                              </div>
                            </div>
                          </div>

                          <div className="rounded-full">
                            <div className="relative flex items-center">
                              <input
                                type="email"
                                placeholder="johndoe@example.com"
                                className="bg-[#2a2a33] text-white my-4 py-1 px-3 outline-none focus:outline-none w-full font-sans font-medium duration-200 transition-all caret-super focus:ring-1 overflow-hidden border border-[#38383a] rounded-t-[32px] rounded-b-[32px] py-sm"
                                onChange={e => {
                                  setEmail(e.target.value);
                                  setinvalidEmail(false);
                                  setError("");
                                }}
                              />

                              <div className="absolute right-sm flex items-center gap-x-sm"></div>
                            </div>
                          </div>
                          <div className="rounded-full">
                            <div className="relative flex items-center">
                              <input
                                type="password"
                                placeholder="at least 8 characters long"
                                className="bg-[#2a2a33] text-white my-4 py-1 px-3 outline-none focus:outline-none w-full font-sans font-medium duration-200 transition-all caret-super focus:ring-1 overflow-hidden border border-[#38383a] rounded-t-[32px] rounded-b-[32px] py-sm"
                                onChange={e => {
                                  setpassWord(e.target.value);
                                  setinvalidPassword(false);
                                  setError("");
                                }}
                              />

                              <div className="absolute right-sm flex items-center gap-x-sm"></div>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-center">
                          <button
                            type="button"
                            className="md:hover:bg-super font-sans focus:outline-none outline-none transition duration-300 ease-in-out font-sans select-none items-center relative group justify-center rounded-full cursor-point active:scale-95 origin-center whitespace-nowrap inline-flex text-sm px-sm font-medium h-8"
                            onClick={signUpHandler}
                          >
                            <div className="flex items-center leading-none justify-center gap-xs">
                              <span className="flex items-center relative">Continue with Email</span>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;

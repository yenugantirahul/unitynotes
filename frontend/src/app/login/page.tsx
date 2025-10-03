"use client";

import Auth from "@/components/Auth";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { logout } from "./actions";

export default function Authentication() {
  const [isSignUp, setIsSignUp] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  async function checkLogin() {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
      setIsLoggedIn(false);
    }
  }
  useEffect(() => {
    checkLogin();
  });
  const signupFields = {
    title: "SignUp",
    desc: "Create your account",
    type: "signup",
    fields: [
      {
        name: "Email",
        type: "email",
        placeholder: "Enter your email",
      },
      {
        name: "Password",
        type: "password",
        placeholder: "Create Password",
      },
    ],
  };

  const loginFields = {
    title: "Login",
    desc: "Login to your account",
    type: "login",
    fields: [
      {
        name: "Email",
        type: "email",
        placeholder: "Enter your email",
      },
      {
        name: "Password",
        type: "password",
        placeholder: "Enter Password",
      },
    ],
  };

  return (
    <div className="">
      {isLoggedIn ? (
        <Button
          onClick={logout}
          className="flex items-center mt-[10%] justify-center h-[50px] lg:w-[300px] w-[250px] tracking-[5px] text-2xl cursor-pointer mx-auto"
        >
          Logout
        </Button>
      ) : (
        <div className="w-full max-w-lg mx-auto flex flex-col items-center gap-4 p-4 mt-4 sm:mt-7">
          <div className="bg-gray-300 p-1 flex gap-2 justify-center rounded-2xl shadow-xl w-full max-w-xs h-12">
            <Button
              onClick={() => setIsSignUp(true)}
              className={`w-1/2 cursor-pointer rounded-2xl text-base sm:text-lg font-medium transition-colors ${
                isSignUp
                  ? "bg-black text-white"
                  : "bg-gray-200 text-black hover:bg-gray-400"
              }`}
            >
              SignUp
            </Button>
            <Button
              onClick={() => setIsSignUp(false)}
              className={`w-1/2 rounded-2xl text-base sm:text-lg font-medium transition-colors ${
                !isSignUp
                  ? "bg-black cursor-pointer text-white"
                  : "bg-gray-200 cursor-pointer text-black hover:bg-gray-400"
              }`}
            >
              Login
            </Button>
          </div>
          {isSignUp ? (
            <Auth
              {...signupFields}
              action="signup"
              btn="SignUp"
              toggle={isSignUp}
            />
          ) : (
            <Auth
              {...loginFields}
              action="login"
              btn="Login"
              toggle={isSignUp}
            />
          )}
        </div>
      )}
    </div>
  );
}

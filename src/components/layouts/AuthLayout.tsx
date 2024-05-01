import React from "react";
import { Header } from "./Header";
import Image from "@src/assets/images/authLayout.png";

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header
        isAuthPage
        authHeaderTitle="Have an account?"
        authBtnTitle="Login"
        targetUrl="login"
      />

      <div className="flex max-h-screen">
        <div className="hidden md:w-1/2 md:block">
          <img
            src={Image}
            alt="Left Image"
            className="w-full h-[100vh] object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
          {children}
        </div>
      </div>
    </>
  );
};

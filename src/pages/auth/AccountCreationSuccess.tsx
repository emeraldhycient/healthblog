import React from "react";
import { Link } from "react-router-dom";
import EmailIcon from "@src/assets/images/email.svg";

export const AccountCreationSuccess = () => {
  return (
    <div className="flex mt-10 lg:mt-0 flex-col px-6 md:px-0 justify-center items-center">
      <img src={EmailIcon} alt="email icon" />
      <div className="flex gap-3 mt-5 max-w-sm flex-col justify-center items-center">
        <h2 className="font-medium text-lg">Verify Your Email Address</h2>
        <p className="text-center text-gray text-sm">
          We’ve sent a verification link to your email. Please click the link to
          continue.
        </p>
        <Link
          to="mailto:hello@phrednetwork.com"
          className="bg-white text-sm border-blue border p-2 rounded-full px-6"
        >
          Open Mail Box
        </Link>
      </div>
    </div>
  );
};

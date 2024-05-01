import React from "react";
import EmailIcon from "@src/assets/images/email.svg";
import { Link } from "react-router-dom";

export const VerifyPending = () => {
  return (
    <div className="flex mt-16 flex-col px-6 md:px-0 justify-center items-center">
      <img src={EmailIcon} alt="email icon" />
      <div className="flex gap-3 mt-5 max-w-sm flex-col justify-center items-center">
        <h2 className="font-medium text-lg">Verifcation Status Pending!</h2>
        <p className="text-center text-gray text-sm">
          Your verification status is currently pending, try again later or
          contact the admin.
        </p>
        <Link
          to="/"
          className="bg-white text-sm border-blue border p-2 rounded-full px-6"
        >
          Go back Home
        </Link>
      </div>
    </div>
  );
};

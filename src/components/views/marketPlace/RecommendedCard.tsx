import React from "react";
import { Link } from "react-router-dom";

export const RecommendedCard = () => {
  return (
    <Link
      className="p-4 max-w-[50%] md:max-w-[220px] border border-borderColor rounded-md hover:shadow-xl hover:shadow-indigo-50 flex flex-col items-center"
      to="/"
    >
      <img
        src="https://loremflickr.com/800/600/girl"
        className="shadow  overflow-hidden"
      />
      <div className="mt-8">
        <h4 className="font-medium text-base">$9876</h4>
        <p className="mt-2 text-gray text-sm">
          Brown winter coat & medium size
        </p>
      </div>
    </Link>
  );
};

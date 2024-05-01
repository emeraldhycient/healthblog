import { useAuthStore } from "@src/lib/state";
import React from "react";
import { Button } from "./Button/Button";

export const ExploreSearchResultCard = () => {
  const { fullname } = useAuthStore();

  return (
    <div className="border border-borderColor p-4 rounded-lg">
      <div className="flex whitespace-nowrap items-center md:mb-4">
        <img
          src="https://images.unsplash.com/profile-fb-1526640523-72455d00636e.jpg?bg=fff&crop=faces&dpr=2&h=150&w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
          alt="user"
          className="w-8 h-8 md:w-10 md:h-10 mr-3 rounded-full"
        />
        <div>
          <p className="text-[12px] md:text-sm font-medium">{fullname}</p>
        </div>
      </div>
      <p className="text-sm">
        Dominic’s case studies to help doctors, & health practitioners to learn
        from what’s happening around & curate better experiences for their
        patients.
      </p>
      <hr className="mt-4 border-borderColor" />
      <div
        id="footer"
        className="flex mt-2.5 items-center flex-row justify-between"
      >
        <h2 className="text-gray">59K Followers</h2>
        <Button>Follow</Button>
      </div>
    </div>
  );
};

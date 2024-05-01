import { useAuthStore } from "@src/lib/state";
import React from "react";
import { Button } from "./Button/Button";

export const PeopleSearchResultCard = () => {
  const { fullname } = useAuthStore();

  return (
    <div className="border flex flex-row gap-8 border-borderColor p-4 rounded-lg">
      <div className=" md:mb-4">
        <img
          src="https://images.unsplash.com/profile-fb-1526640523-72455d00636e.jpg?bg=fff&crop=faces&dpr=2&h=150&w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
          alt="user"
          className="w-8 h-8 md:w-[80px] md:h-[50px] rounded-full"
        />
      </div>
      <div>
        <div>
          <p className="text-[12px] md:text-sm font-medium">{fullname}</p>
        </div>
        <p className="text-sm text-gray mt-3">
          Dominic’s case studies to help doctors, & health practitioners to
          learn from what’s happening around & curate better experiences for
          their patients.
        </p>
      </div>
      <div
        id="footer"
        className="flex mt-2.5 items-center gap-3 flex-row justify-between"
      >
        <Button variant="outline">Connect</Button>
        <Button>Follow</Button>
      </div>
    </div>
  );
};

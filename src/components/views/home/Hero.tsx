import { RightArrow } from "@src/components/icons";
import { Button } from "@src/components/ui";
import { useAuthStore } from "@src/lib/state";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  const { isLoggedIn, isVerified } = useAuthStore();

  const handleClick = () => {
    if (isLoggedIn) {
      if (isVerified) {
        navigate("/write-post");
      } else {
        navigate("/verify-account");
      }
    } else {
      navigate("/signup");
    }
  };

  return (
    <div className="py-8 md:py-16 container mx-auto flex flex-col md:flex-row items-center">
      <div className="container px-4 md:w-1/2">
        <div className="w-[90%] m-auto">
        <h1 className="text-[24px] md:text-3xl font-medium mt-5 leading-loose	">
          Take <span className="text-blue">center stage!</span> Share your
          research & expertise in forums to build your{" "}
          <span className="text-blue">professional profile</span>.
        </h1>
        <p className="text-sm text-gray-600 my-5">
          Engage with the community, showcase your knowledge, and establish
          yourself as an expert in your field. Connect with like-minded
          professionals.
        </p>
        <div className="flex whitespace-nowrap items-center justify-between md:justify-normal md:flex-row ">
          <Button
            variant="blue"
            onClick={handleClick}
            className="text-[11px] md:text-base -ml-2"
          >
            {isLoggedIn ? "Create a post" : "Create an account now!"}
          </Button>
          <a
            href="#"
            className="text-gray text-[11px] md:text-base ml-2 md:ml-4 hover:text-blue no-underline flex items-center"
          >
            Read community guidelines <RightArrow className="ml-1" />
          </a>
          </div>
          </div>
      </div>
      <div className="hidden md:block md:w-1/2">
        <img
          src="https://i.im.ge/2024/05/01/ZA03lx.d07c65aa-00af-4cd9-bb21-cc8b8a9e3fa4.jpeg"
          alt="Medicine"
          className="w-[70%] m-auto h-[50%] rounded"
        />
      </div>
    </div>
  );
};

import { RightArrow } from "@src/components/icons";
import { Button } from "@src/components/ui";
import React from "react";

export const CTA = () => {
  return (
    <div className="bg-blue text-white py-20 px-4 md:py-28 flex flex-col justify-center  md:px-16 md:mx-16 mx-4 rounded-[60px] max-w-[90vw]">
      <div className="md:max-w-[45vw]  ">
        <h1 className="md:text-5xl text-xl font-medium md:leading-[1.3em]">
          Join over 89K members today & become part of the community!
        </h1>
        <p className="mt-5 md:mt-10 text-sm md:text-base">
          Join over 600 professionals, 900 organizations and experts to
          determine the future of healthcare all over the world.
        </p>
        <div className="flex flex-row mt-5 md:mt-10 whitespace-nowrap">
          <Button variant="white" className="text-[11px] md:text-base">
            Get Started Now
          </Button>
          <a
            href="#"
            className="text-white text-[11px] md:text-base ml-2 md:ml-4 hover:text-blue no-underline flex items-center"
          >
            Read community guidelines{" "}
            <RightArrow className="ml-1" stroke="#fff" />
          </a>
        </div>
      </div>
    </div>
  );
};

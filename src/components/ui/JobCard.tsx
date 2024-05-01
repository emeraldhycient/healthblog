import React from "react";
import { ArrowRightUpIcon } from "../icons";

export const JobCard = () => {
  return (
    <div className="flex items-center border-b border-borderColor pb-2 gap-10 justify-between flex-row">
      <div>
        <h2>Auxiliary Nurse Needed</h2>
        <p className="text-gray">
          A very experienced auxiliary nurse is needed for an urgent role in
          Gbadebo Hospital, Yaba
        </p>
      </div>
      <ArrowRightUpIcon />
    </div>
  );
};

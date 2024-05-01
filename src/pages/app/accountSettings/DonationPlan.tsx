import { PlanCard } from "@src/components/composed";
import { planOptions } from "@src/constants/plan";
import React from "react";

export const DonationPlan = () => {
  return (
    <div className="flex flex-col gap-8 mt-16 flex-wrap">
      <div className="flex flex-col md:flex-row items-center justify-center gap-1">
        {planOptions.map((option) => (
          <div className="w-full max-w-[18rem]" key={option.key}>
            <PlanCard
              handlePlanSelection={() => console.log("first")}
              plan={option.plan}
              frequency="monthly"
              planKey={option.planKey as string}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

import { Card } from "flowbite-react";
import React from "react";
import { CheckIcon } from "../icons";
import { Plan } from "@src/types";
import { Button } from "../ui";
import { formatPrice } from "@src/lib/utils";

interface PlanCardProps {
  plan: Plan;
  frequency: "monthly" | "annually" | "quarterly" | "semi_annually";
  handlePlanSelection: (plan: string) => void;
  planKey: string;
}

export const PlanCard: React.FC<PlanCardProps> = ({
  plan,
  frequency,
  handlePlanSelection,
  planKey,
}) => {
  handlePlanSelection(planKey);

  const planColors: { [key: string]: string } = {
    monthly: "bg-white",
    quarterly: "bg-blue",
    semiAnnually: "bg-white",
    annually: "bg-white",
  };

  const bgColor = planColors[plan.key];

  const textColor = bgColor === "bg-white" ? "text-black" : "text-white";

  return (
    <Card className={`border-0 ${bgColor} px-12 py-12`}>
      <h2
        className={`text-lg font-medium ${textColor} bg-gray px-2 rounded-md`}
      >
        {plan.name}
      </h2>
      <div className="flex flex-col items-center">
        <span className={`font-medium text-2xl ${textColor}`}>
          {plan.pricing && formatPrice(plan.pricing[frequency]?.amount)}
        </span>
        <div className="items-baseline ml-1 mt-2 mb-5">
          <span className={`text-sm capitalize ${textColor}`}>
            Per memeber, per {frequency}
          </span>
        </div>
        <ul className="space-y-2">
          {plan.benefits.map((benefit, index) => (
            <li
              className={`flex gap-2 py-1.5 text-sm  ${textColor}`}
              key={index}
            >
              <span className="shrink-0">
                <CheckIcon
                  size={20}
                  stroke={bgColor === "bg-blue" ? "#fff" : "#000"}
                />
              </span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
        <div>
          <Button
            variant={bgColor === "bg-blue" ? "white" : "blue"}
            onClick={() => handlePlanSelection}
          >
            Select Plan
          </Button>
        </div>
      </div>
    </Card>
  );
};

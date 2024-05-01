import { Button } from "@src/components/ui";
import { MarketPlaceHero, RecommendedCard } from "@src/components/views";
import React from "react";

export const MarketPlace = () => {
  return (
    <div className="md:px-16 px-4 mt-2">
      <div className="flex flex-row justify-between items-center">
        <h2 className="font-medium text-lg">Marketplace</h2>
        <Button variant="outline">Post a product</Button>
      </div>
      <MarketPlaceHero />
      <RecommendedCard />
    </div>
  );
};

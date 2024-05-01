import { Button, FlutterWaveSelect } from "@src/components/ui";
import React from "react";

export const Donation = ({ handleUpdateInfo }: any) => {
  return (
    <div className="max-w-md mt-10">
      <div className="amount flex flex-row gap-16">
        <div>
          <h2>44,246.00</h2>
          <p className="text-gray text-sm">Annually</p>
        </div>
        <div>
          <h2>4,246.00</h2>
          <p className="text-gray text-sm">Semi Annual</p>
        </div>
        <div>
          <h2>11,246.00</h2>
          <p className="text-gray text-sm">Quarterly</p>
        </div>

        <div>
          <h2>4,246.00</h2>
          <p className="text-gray text-sm">Monthly</p>
        </div>
      </div>
      <FlutterWaveSelect />
      <Button className="w-full" onClick={handleUpdateInfo}>
        Pay Now
      </Button>
    </div>
  );
};

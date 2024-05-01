import React from "react";
import { FlutterWaveIcon } from "../icons";

export const FlutterWaveSelect = () => {
  return (
    <div className="mb-5 mt-10 bg-pale p-4 py-6 rounded-[1.3rem]">
      <label className="flex items-center space-x-2">
        <input type="radio" className="form-checkbox self-start" />
        <div className="-mt-1">
          <div className="flex flex-row justify-between">
            <h3 className="text-base font-medium">
              Pay with card, or bank account{" "}
            </h3>
            <FlutterWaveIcon />
          </div>
          <p className="text-[13px] text-gray mt-3">
            Our secure payment gateway enables you to conveniently pay for your
            purchases using credit or debit cards & bank transfers.
          </p>
        </div>
      </label>
    </div>
  );
};

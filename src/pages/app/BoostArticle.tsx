import { FlutterWaveIcon } from "@src/components/icons";
import { Button, Input } from "@src/components/ui";
import React from "react";

export const BoostArticle = () => {
  return (
    <div className="flex flex-col px-4  items-center justify-center mt-10">
      <div className="md:text-center max-w-md">
        <h3 className="font-medium text-xl">Boost Article</h3>
        <p className="text-sm text-gray mt-2">
          Allow your post reach more audience when you boost.
        </p>
      </div>
      <div className="mt-10 w-full max-w-sm">
        <Input
          placeholder={"How many days do you want to boost post?"}
          label="How many days"
        />

        <p
          className={`bg-purple text-white
    }   self-center px-5 text-[14px] max-w-[13rem] whitespace-nowrap md:text-base py-2  md:mr-3 rounded-full`}
        >
          You will pay: ₦30,000
        </p>

        <div className="mb-5 mt-10 bg-pale p-4 py-6 rounded-[1.3rem]">
          <label className="flex items-center space-x-2">
            <input type="radio" className="form-checkbox self-start" />
            <div className="-mt-1">
              <div className="flex flex-row justify-between">
                <h3 className="text-base font-medium">
                  Pay with card, USSD or bank transfer
                </h3>
                <FlutterWaveIcon />
              </div>
              <p className="text-[13px] text-gray mt-3">
                Our secure payment gateway enables you to conveniently pay for
                your purchases using credit or debit cards & bank transfers.
              </p>
            </div>
          </label>
        </div>
        <Button className="w-full">Pay Now</Button>
      </div>
    </div>
  );
};

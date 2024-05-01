import { Button, Input } from "@src/components/ui";
import React from "react";

export const UpdatePassword = ({ handleUpdateInfo }: any) => {
  return (
    <div className="flex mt-5">
      <div className="w-full max-w-md md:max-w-sm lg:max-w-md">
        <div className="mb-4">
          <h3 className="text-2xl font-medium mb-2">Update Password</h3>
          <p className="text-gray text-sm">
            We’ll help you reset it and get back on track.
          </p>
        </div>
        <form className="space-y-4">
          <Input placeholder="6+ Characters" label="Password" type="password" />
          <Input
            placeholder="Confirm your new password"
            label="Confirm Password"
            type="password"
          />

          <Button className="w-full" onClick={handleUpdateInfo}>
            Update Password
          </Button>
        </form>
      </div>
    </div>
  );
};

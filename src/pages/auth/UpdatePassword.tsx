import { Button, Input } from "@src/components/ui";
import React from "react";

export const UpdatePassword = () => {
  return (
    <div className="w-full max-w-md px-8">
      <h3 className="text-1xl font-medium mb-4">Update your password?</h3>

      <form className="space-y-4">
        <Input placeholder="6+ Characters" label="Password" type="password" />
        <Input
          placeholder="Confirm Password"
          label="Confirm your new password"
          type="password"
        />
        <Button className="w-full">Create Account</Button>
      </form>
    </div>
  );
};

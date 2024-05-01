import { Button, Input } from "@src/components/ui";
import { useMakeWithdrawal } from "@src/services/mutations";
import { Withdraw as WithdrawType } from "@src/types";
import React from "react";
import { useForm } from "react-hook-form";

export const Withdraw = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WithdrawType>({
    mode: "onChange",
  });

  const { mutate, isPending } = useMakeWithdrawal();

  const onSubmit = async (data: WithdrawType) => {
    mutate(data);
  };

  return (
    <div className="flex flex-col px-4 items-center justify-center mt-10">
      <div className="text-center max-w-md">
        <h3 className="font-medium text-xl">Withdraw</h3>
        <p className="text-sm">Withdraw your earnings on Phred</p>
      </div>
      <form className="mt-10 w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder={"How much do you want to withdraw??"}
          label="Amount"
          {...register("amountToWithdraw", {
            required: "Amount to withdraw is required",
            valueAsNumber: true,
          })}
          error={errors?.amountToWithdraw?.message}
        />
        {/* <FlutterWaveSelect /> */}
        <Button loading={isPending} type="submit" className="w-full">
          Withdraw Now
        </Button>
      </form>
    </div>
  );
};

import { Button, Input } from "@src/components/ui";
import { useAddAccountDetails } from "@src/services/mutations";
import { useGetBanks, useVerifyBank } from "@src/services/queries";
import { AccountDetails as AcctTypes, Banks } from "@src/types";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export const AccountDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<AcctTypes>({
    mode: "onChange",
  });

  const { mutate, isPending } = useAddAccountDetails();
  const { data: banks } = useGetBanks();
  const { mutate: verifyBankMutation } = useVerifyBank();
  const [selectedBank, setSelectedBank] = useState<Banks | null>(null);

  const handleVerify = async (data: AcctTypes) => {
    mutate(data);
  };

  const handleBankChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const bankCode = event.target.value;
    const bank = banks?.find((bank) => bank.code === bankCode) || null;
    setSelectedBank(bank);
    setValue("bankCode", bankCode);
  };

  const handleVerifyBank = (accountNumber: string) => {
    if (selectedBank && selectedBank.code) {
      verifyBankMutation(
        { bank_code: selectedBank.code, account_number: accountNumber },
        {
          onSuccess: (data) => {
            setValue("accountName", data.account_name);
          },
        }
      );
    }
  };

  const handleAccountNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const accountNumber = event.target.value;
    setValue("accountNumber", accountNumber);
    if (accountNumber.length === 10) {
      handleVerifyBank(accountNumber);
    }
  };

  const { accountName } = getValues();

  return (
    <div className="flex flex-col px-4 mt-10 items-center justify-center">
      <h2 className="font-medium text-2xl">Add Bank Account</h2>

      <form
        className="mt-6 w-full max-w-sm"
        onSubmit={handleSubmit(handleVerify)}
      >
        <div className="mb-4">
          <label className="block tracking-wide text-sm mb-2">Bank Name</label>
          <select
            id="bankCode"
            {...register("bankCode", { required: "Bank name is required" })}
            onChange={handleBankChange}
            className="appearance-none block w-full rounded-lg text-sm  text-black border border-borderColor py-3 px-4 leading-tight focus:outline-none focus:bg-white "
          >
            <option value="">Select a bank</option>
            {banks?.map((bank) => (
              <option key={bank.code} value={bank.code}>
                {bank.name}
              </option>
            ))}
          </select>
          {errors?.bankCode?.message && <span>{errors.bankCode.message}</span>}
        </div>
        <Input
          placeholder="Enter account number"
          label="Account Number"
          {...register("accountNumber", {
            required: "Account Number is required is required",
            maxLength: 10,
          })}
          error={errors?.accountNumber?.message}
          onChange={handleAccountNumberChange}
        />
        <Input
          placeholder="Account name"
          label="Account Name"
          {...register("accountName")}
          disabled
        />
        <Button
          className="w-full"
          disabled={!accountName}
          type="submit"
          loading={isPending}
        >
          Add Payment Method
        </Button>
      </form>
    </div>
  );
};

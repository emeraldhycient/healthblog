import { Button, Input } from "@src/components/ui";
import { useAuthStore } from "@src/lib/state";
import { useSubmitLicense } from "@src/services";
import { LicenseSubmissionDTO } from "@src/types";
import React from "react";
import { useForm } from "react-hook-form";
import { VerifyPending } from "./VerifyPending";

export const VerifyAccount = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LicenseSubmissionDTO>({
    mode: "onChange",
    defaultValues: {
      isOwner: false,
    },
  });
  const { mutate, isPending } = useSubmitLicense();
  const { verification_status } = useAuthStore();

  const handleVerify = async (data: LicenseSubmissionDTO) => {
    // Convert dates to ISOString format
    data.durationStart = new Date(data.durationStart).toISOString();
    data.durationEnd = new Date(data.durationEnd).toISOString();

    mutate(data);
  };

  const startDate = watch("durationStart");

  return (
    <>
      {verification_status === "PENDING" ? (
        <VerifyPending />
      ) : (
        <div className="flex flex-col px-4 items-center justify-center">
          <div className="text-center max-w-sm">
            <h3 className="font-medium text-xl">Verify Account</h3>
            <p className="text-sm">
              Kindly enter your medical license information to allow you to post
              articles on PHRED.
            </p>
          </div>
          <form
            className="mt-6 w-full max-w-sm"
            onSubmit={handleSubmit(handleVerify)}
          >
            <div className="flex gap-10">
              <Input
                placeholder="Start Date"
                label="Start Date"
                type="date"
                {...register("durationStart", {
                  required: "Start date is required",
                })}
                error={errors?.durationStart?.message}
              />
              <Input
                placeholder="End Date"
                label="End Date"
                type="date"
                {...register("durationEnd", {
                  required: "End date is required",
                  min: {
                    value: startDate,
                    message: "End date cannot be before the start date",
                  },
                })}
                error={errors?.durationEnd?.message}
              />
            </div>
            <Input
              placeholder="What's your specialty"
              label="Specialty"
              {...register("specialty", { required: "Specialty is required" })}
              error={errors?.specialty?.message}
            />
            <Input
              placeholder="Select your license type"
              label="License Type"
              {...register("licenseType", {
                required: "License Type is required",
              })}
              error={errors?.licenseType?.message}
            />
            <Input
              placeholder="License Number"
              label="License Number"
              {...register("licenseNumber", {
                required: "License Number is required",
              })}
              error={errors?.licenseNumber?.message}
            />
            <div className="mb-5">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  {...register("isOwner")}
                />
                <span className="text-sm">
                  Do you actually own the document?
                </span>
              </label>
            </div>
            <p className="text-xs text-gray mb-4">
              This verification allows us verify your identity as a medical
              practitioner and allow us verify your posts to the platform.
            </p>
            <Button className="w-full" type="submit" loading={isPending}>
              Verify Now
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

import { Button, Input } from "@src/components/ui";
import { useCreateJob } from "@src/services/mutations";
import { Job } from "@src/types";
import React from "react";
import { useForm } from "react-hook-form";

export const CreateJob = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Job>({
    mode: "onChange",
  });
  const { mutate, isPending } = useCreateJob();

  const onSubmit = async (data: Job) => {
    mutate(data);
  };

  return (
    <div className="flex flex-col px-4 items-center justify-center mt-10">
      <div className="text-center max-w-sm">
        <h3 className="font-medium text-xl">Job Information</h3>
        <p className="text-sm">Kindly enter the job information to continue.</p>
      </div>
      <form className="mt-6 w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="e.g Product Designer"
          label="Job Name"
          {...register("name", { required: "Job name is required" })}
          error={errors?.name?.message}
        />

        <Input
          placeholder="What's the job description"
          label="Job Description"
          {...register("description", {
            required: "Description is required",
          })}
          error={errors?.description?.message}
        />

        <Input
          placeholder="Enter action link"
          label="Action Link"
          {...register("actionLink", {
            required: "Action Link is required",
          })}
          error={errors?.actionLink?.message}
        />

        <Button className="w-full" type="submit" loading={isPending}>
          Add Job Now
        </Button>
      </form>
    </div>
  );
};

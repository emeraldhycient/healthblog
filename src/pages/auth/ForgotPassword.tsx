import { Button, Input } from "@src/components/ui";
import { useForgotPassword } from "@src/services/queries";
import React from "react";
import { useForm } from "react-hook-form";

interface DTO {
  email: string;
}

export const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DTO>({ mode: "onChange" });

  const { mutate, isPending } = useForgotPassword();

  const onSubmit = (formData: DTO) => {
    mutate(formData.email);
  };
  return (
    <div className="w-full max-w-md px-8">
      <h3 className="text-1xl font-medium mb-4">Forgot your password?</h3>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="What's your email address?"
          label="Email Address"
          {...register("email", { required: "Email is required" })}
          error={errors?.email?.message}
        />
        <Button className="w-full" type="submit" loading={isPending}>
          Reset Password
        </Button>
      </form>
    </div>
  );
};

import { Button, Input } from "@src/components/ui";
import { useResetPassword } from "@src/services";
import { ResetPasswordDTO } from "@src/types";
import React from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

export const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ResetPasswordDTO>({ mode: "onChange" });
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@!#$%^&*()_+{}|:"<>?`~\-=[\]\\';,.\/]{6,}$/;

  const { mutate, isPending } = useResetPassword(token);

  const onSubmit = (data: ResetPasswordDTO) => {
    if (!passwordRegex.test(data.password1 || data.password2)) {
      setError("password1", {
        message:
          "Password must contain at least 1 lowercase letter, 1 uppercase letter, and 1 numeric character",
      });
      return;
    }
    mutate(data);
  };
  return (
    <div className="w-full max-w-md px-8">
      <h3 className="text-1xl font-medium mb-4">Update your password?</h3>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="6+ Characters"
          {...register("password1", { required: "New Password is required" })}
          error={errors?.password1?.message}
          label="Password"
          type="password"
        />
        <Input
          placeholder="Confirm Password"
          label="Confirm your new password"
          type="password"
          {...register("password2", {
            required: "Password confirmation is required",
          })}
          error={errors?.password2?.message}
        />
        <Button className="w-full" type="submit" loading={isPending}>
          Update Password
        </Button>
      </form>
    </div>
  );
};

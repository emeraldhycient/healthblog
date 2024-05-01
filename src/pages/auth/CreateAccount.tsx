import { Button, Input } from "@src/components/ui";
import { useCreateUser } from "@src/services";
import { CreateAccountData } from "@src/types";
import React from "react";
import { useForm } from "react-hook-form";

export const CreateAccount = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CreateAccountData>({ mode: "all" });
  const { mutate, isPending } = useCreateUser();

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@!#$%^&*()_+{}|:"<>?`~\-=[\]\\';,.\/]{6,}$/;

  const handleRegister = async (data: CreateAccountData) => {
    if (!passwordRegex.test(data.password)) {
      setError("password", {
        message:
          "Password must contain at least 1 lowercase letter, 1 uppercase letter, and 1 numeric character",
      });
      return;
    }

    mutate(data);
  };

  return (
    <div className="w-full max-w-md px-6 mt-14 md:mt-0">
      <h3 className="text-1xl font-medium mb-4">Get started absolutely free</h3>

      <form className="space-y-4" onSubmit={handleSubmit(handleRegister)}>
        <Input
          placeholder="What's your full name?"
          label="Your Name"
          {...register("fullname", { required: "Fullname is required" })}
          error={errors?.fullname?.message}
        />
        <Input
          placeholder="Choose a username"
          label="Username"
          {...register("username", { required: "Username is required" })}
          error={errors?.username?.message}
        />
        <Input
          placeholder="What's your email address?"
          label="Email Address"
          {...register("email", { required: "Email is required" })}
          error={errors?.email?.message}
        />
        <Input
          placeholder="6+ Characters"
          label="Password"
          type="password"
          {...register("password", {
            required: "Password is required",
            min: 6,
          })}
          error={errors?.password?.message}
        />

        <Button
          disabled={isPending}
          loading={isPending}
          type="submit"
          className="w-full"
        >
          Create Account
        </Button>
      </form>
    </div>
  );
};

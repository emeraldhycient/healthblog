import { Header } from "@src/components";
import { Button, Input } from "@src/components/ui";
import { useLoginUser } from "@src/services";
import { LoginDTO } from "@src/types";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDTO>({ mode: "onChange" });

  const { mutate, isPending } = useLoginUser();

  const handleLogin = async (data: LoginDTO) => {
    mutate(data);
  };

  return (
    <div>
      <Header
        isAuthPage
        authHeaderTitle="Don't have an account?"
        authBtnTitle="Get Started"
        targetUrl="/signup"
      />

      <div className="flex mt-[10rem] px-6 items-center justify-center ">
        <div className="w-full max-w-md">
          <h3 className="text-2xl md:text-center font-medium mb-4">
            Welcome Back 👋🏽
          </h3>

          <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>
            <Input
              placeholder="What's your email address?"
              label="Email Address"
              {...register("email", { required: "Email is required" })}
              error={errors?.email?.message}
            />
            <Input
              placeholder="What's your password?"
              label="Password"
              type="password"
              {...register("password", {
                required: "Password is required",
              })}
              error={errors?.password?.message}
            />

            <div className="flex flex-1 justify-between w-full">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" />
                <span className="text-sm">Remember me</span>
              </label>

              <Link to="/forgot-password" className="text-sm">
                Forgot Password?
              </Link>
            </div>

            <Button
              disabled={isPending}
              loading={isPending}
              type="submit"
              className="w-full"
            >
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

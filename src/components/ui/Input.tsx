import React, { useState, InputHTMLAttributes, forwardRef } from "react";
import { Eye } from "../icons/Icon";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: string;
  placeholder?: string;
  error?: any;
}

export const InputComponent = (
  { label, type = "text", placeholder, error, ...props }: Omit<InputProps, "">,
  ref: React.ForwardedRef<HTMLInputElement>
) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm text-black mb-2">{label}</label>
      )}
      <div className="relative">
        <input
          ref={ref}
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          className="border border-borderColor rounded-lg w-full py-4 px-3 text-sm leading-tight focus:outline-none focus:shadow-outline"
          {...props}
        />
        {type === "password" && (
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <Eye /> : <Eye />}
          </div>
        )}
      </div>
      {error && (
        <p style={{ color: "red", fontSize: 14, marginTop: 5 }}>{error}</p>
      )}
    </div>
  );
};

export const Input = forwardRef(
  InputComponent
) as React.ForwardRefExoticComponent<
  Omit<InputProps, "className"> & React.RefAttributes<HTMLInputElement>
>;

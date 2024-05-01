import { Slot } from "@radix-ui/react-slot";
import { RightArrow, Spinner } from "@src/components/icons";
import { cn } from "@src/lib/utils";
import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "pale" | "blue" | "outline" | "transparent" | "black" | "white";
  size?: "sm" | "md" | "lg" | "default" | "icon";
  loading?: boolean;
  isPaleBgMobile?: boolean;
  isRightArrow?: boolean;
  arrowColor?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      asChild,
      variant = "blue",
      size = "default",
      type = "button",
      children,
      loading,
      disabled,
      isPaleBgMobile,
      isRightArrow,
      arrowColor,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot : "button";

    return (
      <Component
        type={type}
        className={cn(
          "relative inline-flex items-center justify-center rounded-lg overflow-hidden",
          `${
            isPaleBgMobile ? "bg-pale text-blue" : "bg-blue text-white"
          }   rounded-full`,
          "focus:outline-none focus:shadow-outline",
          {
            "md:bg-blue md:text-white hover:bg-blue hover:text-white":
              variant === "blue",
            "bg-pale text-blue": variant === "pale",
            "border border-blue bg-transparent text-blue hover:bg-accent/10":
              variant === "outline",
            "bg-transparent text-blue shadow-none": variant === "transparent",
            "bg-white text-blue shadow-none": variant === "white",
          },
          {
            "h-10 px-3": size === "sm",
            " py-3 px-5": size === "default",
            "h-11 px-8 rounded-xl": size === "lg",
            "h-6 w-6": size === "icon",
          },
          {
            "opacity-50 pointer-events-none": disabled,
          },
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {isRightArrow && !asChild ? (
          <div className="flex items-center">
            <span>{children}</span>
            <RightArrow stroke={arrowColor} className="ml-1" />
          </div>
        ) : (
          <>
            {asChild ? (
              children
            ) : (
              <>
                {children}{" "}
                {loading && (
                  <div className="absolute inset-0 bg-[#000000]/70 grid place-items-center">
                    <Spinner className="text-[#FFFFFF]" />
                  </div>
                )}
              </>
            )}
          </>
        )}
      </Component>
    );
  }
);

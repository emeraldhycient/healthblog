import React from "react";

interface CategoryBadgeProps {
  color: string;
  name: string;
  transparent?: boolean;
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({
  color,
  name,
  transparent = true,
}) => (
  <p
    className={`bg-${color}${transparent ? "/20" : ""} text-${color}${
      transparent ? "" : "/40"
    }   self-center px-3 text-[10px] md:text-base py-2  rounded-full`}
  >
    {name}
  </p>
);

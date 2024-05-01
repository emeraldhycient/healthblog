import React from "react";

export type SvgProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
};

export const Svg = ({ size = 24, ...rest }: SvgProps) => {
  return (
    <svg
      {...rest}
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
    />
  );
};

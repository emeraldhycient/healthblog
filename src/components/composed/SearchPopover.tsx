import React, { ReactNode } from "react";
import { Popover } from "flowbite-react";

interface SearchPopoverProps {
  children: ReactNode;
}

export const SearchPopover: React.FC<SearchPopoverProps> = ({ children }) => {
  return (
    <Popover
      aria-labelledby="profile-popover"
      content={
        <div>
          <h4>Explore Topics</h4>
        </div>
      }
    >
      {children}
    </Popover>
  );
};

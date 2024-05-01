import { useAuthStore } from "@src/lib/state";
import React from "react";

interface UserPostCardProps {
  name?: string;
  handle?: string;
  avatarUrl?: string;
}

export const UserPostCard: React.FC<UserPostCardProps> = ({
  name,
  handle,
  avatarUrl,
}) => {
  const { username, fullname } = useAuthStore();

  const getInitial = (str: string) => str.charAt(0).toUpperCase();

  return (
    <div className="flex whitespace-nowrap items-center md:mb-4">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="user"
          className="w-8 h-8 md:w-10 md:h-10 mr-3 rounded-md"
        />
      ) : (
        <div className="w-8 h-8 md:w-10 md:h-10 mr-3 rounded-md flex items-center justify-center bg-blue text-white font-medium">
          {getInitial(name ? name : fullname)}
        </div>
      )}
      <div>
        <p className="text-[12px] md:text-sm font-medium">
          {name ? name : fullname}
        </p>
        <p className="text-[12px] md:text-sm text-gray">
          @{handle ? handle : username}
        </p>
      </div>
    </div>
  );
};

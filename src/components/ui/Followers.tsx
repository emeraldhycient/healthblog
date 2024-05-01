import React from "react";
import * as Icons from "@src/components/icons";

interface FollowerProps {
  follower: {
    id: string | number;
    profile: {
      avatar: {
        secure_url: string;
      };
    };
    fullname: string;
    username: string;
  };
}

export const Follower: React.FC<FollowerProps> = ({ follower }) => (
  <div key={follower.id} className="flex flex-row mt-3 justify-between">
    <div className="flex whitespace-nowrap items-center md:mb-4">
      <img
        src={follower?.profile?.avatar?.secure_url}
        alt="user"
        className="w-8 h-8 md:w-10 md:h-10 mr-3 rounded-full"
      />
      <div>
        <p className="text-[12px] md:text-sm font-medium">
          {follower.fullname}
        </p>
        <p className="text-[12px] md:text-sm text-gray">@{follower.username}</p>
      </div>
    </div>
    <Icons.DotIcon size={18} />
  </div>
);

import React from "react";
import { Link } from "react-router-dom";

interface FollowersHeaderProps {
  title: string;
}

export const FollowersHeader: React.FC<FollowersHeaderProps> = ({ title }) => {
  return (
    <div
      id="followers-header"
      className="flex-row justify-between flex mb-5 mt-3"
    >
      <h3 className="font-medium">{title}</h3>
      <Link className="text-gray" to={"/all"}>
        View All
      </Link>
    </div>
  );
};

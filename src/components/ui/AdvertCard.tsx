import React from "react";
import { Link } from "react-router-dom";
import { UserPostCard } from "./UserPostCard";

interface CardProps {
  imageUrl: string;
  authorName: any;
  authorUsername: any;
  title: string;
  isMyProfile: boolean;
  publishedAt?: string;
  peopleReached?: number | string;
  location: string;
}

export const AdvertCard: React.FC<CardProps> = ({
  imageUrl,
  title,
  isMyProfile,
  publishedAt,
  peopleReached,
  location,
}) => {
  const date = publishedAt ? new Date(publishedAt) : null;

  return (
    <Link
      to="/article-details"
      className={`bg-white shadow-md rounded-lg w-[100%] mb-5 h-[72vh]`}
    >
      <a href="#">
        <img className="rounded-t-lg  object-cover" src={imageUrl} alt="" />
      </a>
      <div className="flex px-3 justify-between">
        <Link to="/profile" className="mt-8">
          <UserPostCard
            avatarUrl={
              "https://images.unsplash.com/profile-fb-1526640523-72455d00636e.jpg?bg=fff&crop=faces&dpr=2&h=150&w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
            }
          />
        </Link>
        <div className="mt-8 flex  flex-row ">
          <p> {date?.toLocaleDateString()}</p>
        </div>
      </div>

      <div className="mt-2">
        <h5
          className={`text-black font-medium text-2xl tracking-tight mb-2 px-3 `}
        >
          {title}
        </h5>
      </div>
      {isMyProfile && (
        <div className="p-3">
          <p className="text-gray text-sm mb-1">
            {`${peopleReached} People Reached`} &middot; {location}
          </p>
        </div>
      )}
    </Link>
  );
};

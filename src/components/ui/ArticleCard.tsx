import React from "react";
import { Link } from "react-router-dom";
import { DotIcon, SaveIcon } from "../icons";
import { Button } from "./Button/Button";
import { CategoryBadge } from "./CategoryBadge";
import { UserPostCard } from "./UserPostCard";

interface Category {
  name: string;
  color: string;
}

interface CardProps {
  imageUrl: string;
  id?: string;
  authorName: any;
  authorUsername: any;
  title: string;
  category?: Category[];
  isBig?: boolean;
  isSmall?: boolean;
  isDescription?: boolean;
  description?: string;
  readingTime?: string;
  publishedAt?: string;
  url: string;
  avatarUrl?: string;
}

export const ArticleCard: React.FC<CardProps> = ({
  imageUrl,
  authorName,
  authorUsername,
  title,
  category,
  isBig,
  isSmall,
  isDescription,
  description = "",
  readingTime,
  publishedAt,
  id,
  url,
  avatarUrl,
}) => {
  const date = publishedAt ? new Date(publishedAt) : null;

  const displayTitle =
    title?.length > 80 ? title.substring(0, 80) + "..." : title;

  return (
    <Link
      to={`/${url}/${id}`}
      className={`bg-white shadow-sm rounded-lg w-[100%] ${
        isBig ? "md:max-w-[90%] shadow-none" : "h-[72vh]"
      } mb-5`}
    >
      <a href="#">
        <img
          className={`rounded-t-lg w-[100%] object-cover ${
            isBig ? "h-[20%]" : " h-[50%]"
          }`}
          src={imageUrl}
          alt=""
        />
      </a>
      <div className="flex px-3 justify-between">
        <Link to={`/account-profile/${authorUsername}`} className="mt-8">
          <UserPostCard
            avatarUrl={avatarUrl}
            name={authorName}
            handle={authorUsername}
          />
        </Link>
        {isSmall && (
          <div className="mt-8 flex  flex-row ">
            <SaveIcon />
            <DotIcon className="ml-2" size={20} />
          </div>
        )}
        {category && (
          <div className="flex mt-8 md:mt-0 flex-row md:mr-10">
            {category.map((cat, index) => (
              <CategoryBadge key={index} color={cat.color} name={cat.name} />
            ))}
          </div>
        )}
      </div>
      <div className="mt-2">
        <h5
          className={`text-black font-medium text-xl tracking-tight mb-2 ${
            isBig ? "" : "px-3"
          }`}
        >
          {displayTitle}
        </h5>
        {isDescription ? (
          <>
            <p
              className={`text-sm ${isBig ? "" : "ml-4"} text-gray`}
              dangerouslySetInnerHTML={{ __html: description }}
            ></p>
          </>
        ) : null}
        {isBig ? (
          <Link to={`/${url}/${id}`} className="block">
            <Button isRightArrow arrowColor="#fff" className="text-sm mt-5">
              Read More
            </Button>
          </Link>
        ) : (
          <div className="p-3">
            <p className="text-gray mb-1">
              {readingTime} &middot; {date?.toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </Link>
  );
};

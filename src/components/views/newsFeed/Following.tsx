import { NewsFeedArticleCard, UserPostCard } from "@src/components/ui";
import { formatDate } from "@src/lib/utils";
import { Bookmark, NewsFeed } from "@src/types";
import React from "react";
import { Link } from "react-router-dom";

interface ForYouProps {
  bookmarks: Bookmark[];
  newsFeed: NewsFeed[];
}

export const Following: React.FC<ForYouProps> = ({ bookmarks, newsFeed }) => {
  const displayedBookmarks = bookmarks?.slice(0, 3);
  return (
    <div className="flex flex-row gap-10">
      <div className="flex flex-col">
        {newsFeed.map((article, index) => (
          <NewsFeedArticleCard key={index} article={article} />
        ))}
      </div>
      <div className=" lg:flex flex-col hidden gap-7 w-[30%]">
        <h1 className=" font-medium">Recently Bookmarked</h1>
        {displayedBookmarks?.map((bookmark, index) => (
          <Link
            to={`/article-details/${bookmark?.article?.id}`}
            key={index}
            className="flex flex-col"
          >
            <UserPostCard
              name={bookmark?.article?.author?.fullname}
              handle={bookmark?.article?.author?.username}
              avatarUrl={bookmark?.article?.author?.profile?.avatar?.secure_url}
            />
            <h1 className="font-medium mb-3">{bookmark?.article?.title}</h1>
            <p className="text-xs text-gray">
              {formatDate(bookmark?.article?.publishedAt)} |{" "}
              {bookmark?.article?.readingTime}
            </p>
          </Link>
        ))}
        <p className="text-base text-blue">See all ({bookmarks?.length})</p>
      </div>
    </div>
  );
};

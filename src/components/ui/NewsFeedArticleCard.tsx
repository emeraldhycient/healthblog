import { Badge, Card } from "flowbite-react";
import React from "react";
import { UserPostCard } from "./UserPostCard";
import { HiClock } from "react-icons/hi";
import { DotIcon, SaveIcon, Spinner } from "../icons";
import { formatDate } from "@src/lib/utils";
import { NewsFeed } from "@src/types";
import { Link } from "react-router-dom";
import { useToggleBookMark } from "@src/services/queries";

interface NewsFeedArticleCardProps {
  article: NewsFeed;
}

export const NewsFeedArticleCard: React.FC<NewsFeedArticleCardProps> = ({
  article,
}) => {
  const displayTitle =
    article?.title?.length > 80
      ? article.title.substring(0, 80) + "..."
      : article?.title;

  const { mutate: toggleBookMark, isPending: bookMarkPending } =
    useToggleBookMark();

  const handleToggleBookMark = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    toggleBookMark(article?.id);
  };
  return (
    <Link to={`/article-details/${article.id}`}>
      <Card className="max-w-[100%] shadow-sm lg:max-w-[80%] p-4 md:px-16 md:py-4 border-0">
        <div className="flex flex-row gap-6">
          <UserPostCard
            name={article?.author?.fullname}
            handle={article?.author?.username}
            avatarUrl={article?.author?.profile?.avatar?.secure_url}
          />
          <p className="text-xs">{formatDate(article?.publishedAt)}</p>
        </div>
        <h2 className="font-medium text-lg">{displayTitle}</h2>
        <p
          className="text-sm text-gray"
          dangerouslySetInnerHTML={{ __html: article.content }}
        ></p>
        <div className="flex flex-row justify-between">
          <div className="max-w-[8.6rem]">
            <Badge
              className="font-medium bg-pale p-2 justify-center"
              icon={HiClock}
            >
              {article?.readingTime}
            </Badge>
          </div>
          <div>
            <div className=" flex gap-5 items-center">
              <button
                className="flex gap-2 flex-row"
                onClick={handleToggleBookMark}
              >
                {bookMarkPending ? <Spinner /> : <SaveIcon />}
              </button>
              <button>
                <DotIcon />
              </button>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

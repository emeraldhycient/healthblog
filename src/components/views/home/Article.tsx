import React from "react";
import { ArticleCard, Button, CategoryBadge } from "@src/components/ui";
import { Spinner, TimesIcon } from "@src/components/icons";
import penFolder from "@src/assets/images/pen-folder.svg";
import userFile from "@src/assets/images/user-file.svg";
import { Link } from "react-router-dom";
import { useGetCategories, useGetDiscovery } from "@src/services/queries";
import { Article as ArticleProp } from "@src/types";

interface ArticleProps {}

export const Article: React.FC<ArticleProps> = () => {
  const url = "article-details";
  const { data, isLoading } = useGetDiscovery();
  const { data: categories } = useGetCategories();
  console.log(data, "DATA");

  return (
    <div className="grid grid-cols-3 md:px-16 px-4 pb-20 md:pb-0 mt-5">
      <div className="col-span-3 md:col-span-2">
        {/* Display loader if data is loading */}
        {isLoading && <Spinner />}

        {/* Big Card */}
        {data && data.length > 0 && (
          <ArticleCard
            url={url}
            id={data[0]?.id}
            imageUrl={data[0]?.coverPhoto?.public_url}
            authorName={data[0]?.author?.fullname}
            authorUsername={data[0]?.author?.username}
            avatarUrl={data[0]?.author?.profile?.avatar?.secure_url}
            title={data[0]?.title}
            category={data[0]?.categories?.map((cat: string) => ({
              name: cat,
              color: "purple",
            }))}
            isBig
            isDescription
            description={data[0]?.content}
          />
        )}
        {/* Two Smaller Cards */}
        <div className="flex mt-[5rem] md:pr-8 flex-col md:flex-row md:w-30 space-y-6 md:space-y-0 md:space-x-6">
          {data?.slice(0, 2).map((article: ArticleProp) => (
            <ArticleCard
              id={article.id}
              url={url}
              imageUrl={article?.coverPhoto?.public_url}
              authorName={article?.author?.fullname}
              authorUsername={article?.author?.username}
              title={article?.title}
              avatarUrl={article?.author?.profile?.avatar?.secure_url}
              isSmall
              isDescription
              description={article.content}
            />
          ))}
        </div>
      </div>

      <div className="col-span-3 mt-10  md:mt-4 md:col-span-1">
        {/* Donate Now */}
        <div className="p-4 bg-gray-200">
          <div className="flex flex-row justify-between">
            <h2 className="text-xl font-medium mb-2">Donate Now</h2>
            <TimesIcon />
          </div>
          <p className="mt-4 text-gray">
            Fuel your health writing success with Phred. Write and read
            top-notch health articles, connect with expert health mentors, and
            take your medical profession to the next level.
          </p>
          <div className="flex mt-4 flex-row justify-between whitespace-nowrap">
            <div className="self-end">
              <Button className="text-sm ">
                <Link to="/donation-plan">Donate Now</Link>
              </Button>
            </div>
            <div className="-mb-4">
              <img src={penFolder} />
            </div>
          </div>
        </div>

        {/* Connect with Specialist */}
        <div className="p-4 mt-5 md:mt-8 bg-gray-200">
          <div className="flex flex-row justify-between">
            <h2 className="text-xl font-medium mb-2">
              Connect with Specialist
            </h2>
            <TimesIcon />
          </div>
          <p className="mt-4 text-gray">
            Connect with expert health mentors, and take your medical profession
            to the next level.
          </p>
          <div className="flex flex-row md:mt-14 justify-between whitespace-nowrap">
            <div className="self-end">
              <Button className="text-sm ">Connect Now</Button>
            </div>
            <div className="-mb-4">
              <img src={userFile} />
            </div>
          </div>
        </div>

        {/* List of Categories */}
        <div className="mt-10">
          <h2 className="font-medium text-2xl">Category</h2>
          <div className="flex flex-wrap mt-4 -mx-1 space-x-3">
            {categories?.slice(0, 10)?.map((item, index) => (
              <div key={index + 1} className="px-1 mb-2">
                <CategoryBadge color={"purple"} name={item.text} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

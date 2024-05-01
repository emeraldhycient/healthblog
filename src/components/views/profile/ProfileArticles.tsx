import { ArticleCard } from "@src/components/ui";
import { useInfiniteScroll } from "@src/lib/hooks";
import { useGetArticles } from "@src/services/queries";
import React from "react";

interface ProfileArticlesProps {
  username: string;
}

export const ProfileArticles: React.FC<ProfileArticlesProps> = ({
  username,
}) => {
  const { data, isLoading, isError, hasNextPage, fetchNextPage } =
    useGetArticles(username);

  const observerRef = useInfiniteScroll({ hasNextPage, fetchNextPage });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching articles</div>;
  }

  if (!data?.pages[0]?.data.length) {
    return <div>No articles yet</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {data?.pages.map((page: any, index) => (
        <React.Fragment key={index}>
          {page.data.map((article: any) => (
            <ArticleCard
              url="user-single-article"
              key={article.id}
              id={article.id}
              imageUrl={article.coverPhoto?.secure_url}
              authorName={article.author.fullname}
              authorUsername={article.author.username}
              title={article.title}
              isSmall
              readingTime={article.readingTime}
              publishedAt={article.publishedAt}
              isDescription
              description={article.content}
              avatarUrl={article.author.profile.avatar?.secure_url}
            />
          ))}
        </React.Fragment>
      ))}
      <div ref={observerRef} />
    </div>
  );
};

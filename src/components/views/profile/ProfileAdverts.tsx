import { AdvertCard } from "@src/components/ui";
import { useInfiniteScroll } from "@src/lib/hooks";
import { useGetAdverts } from "@src/services/queries";
import React from "react";

interface ProfileAdvertsProps {
  username: string;
}

export const ProfileAdverts: React.FC<ProfileAdvertsProps> = ({ username }) => {
  const { data, isLoading, isError, hasNextPage, fetchNextPage } =
    useGetAdverts(username);

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
          {page.data.map((advert: any) => (
            <AdvertCard
              imageUrl={
                "https://plus.unsplash.com/premium_photo-1706430115968-e4524fc70835?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              authorName={advert?.name}
              authorUsername={username}
              title="Sweat & Condition Conducive Sugery latex gloves"
              publishedAt="2024-03-25T16:20:39.843Z"
              isMyProfile={true}
              location={"Lagos, Niger, Kaduna"}
              peopleReached={53}
            />
          ))}
        </React.Fragment>
      ))}
      <div ref={observerRef} />
    </div>
  );
};

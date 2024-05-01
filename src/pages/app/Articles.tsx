import { Spinner } from "@src/components/icons";
import { Tabs } from "@src/components/ui";
import { Following, ForYou } from "@src/components/views";
import {
  useGetBookmarks,
  useGetNewsFeedFollowing,
  useGetNewsFeedForYou,
} from "@src/services/queries";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type TabValues = "for_you" | "following";

export const Articles = () => {
  const [tabValue, setTabValue] = useState<TabValues>("for_you");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { data: bookmarks } = useGetBookmarks();
  const {
    data: newsFeedForYou,
    refetch: refetchForYou,
    isFetching: newsFeedForYouLoading,
  } = useGetNewsFeedForYou(tabValue);
  const {
    data: newsFeedFollowing,
    refetch: refetchFollowing,
    isFetching: newsFeedFollowLoading,
  } = useGetNewsFeedFollowing(tabValue);

  const handleValueChange = (value: string) => {
    setTabValue(value as TabValues);
    navigate(`${value}`);
  };

  useEffect(() => {
    const tab = pathname.split("/")[2];
    if (["for_you", "following"].includes(tab)) {
      setTabValue(tab as TabValues);
    }
  }, [pathname]);

  useEffect(() => {
    if (tabValue === "for_you") {
      refetchForYou();
    } else if (tabValue === "following") {
      refetchFollowing();
    }
  }, [tabValue, refetchForYou, refetchFollowing]);

  return (
    <div className="p-4 md:px-16 md:mt-7">
      <Tabs.Root
        className="flex flex-col gap-8"
        value={tabValue}
        defaultValue="articles"
        onValueChange={handleValueChange}
      >
        <Tabs.List className="shrink-0 flex" aria-label="Manage your account">
          <Tabs.Trigger
            className="px-5 h-[45px] flex items-center justify-center text-base text-gray leading-none border-b-2 border-transparent  data-[state=active]:text-foreground data-[state=active]:border-blue outline-none cursor-pointer"
            value="for_you"
          >
            For You
          </Tabs.Trigger>
          <Tabs.Trigger
            className="px-5 h-[45px] flex items-center justify-center text-base  text-gray leading-none border-b-2 border-transparent  data-[state=active]:text-foreground data-[state=active]:border-blue outline-none cursor-pointer"
            value="following"
          >
            Following
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="for_you">
          {newsFeedForYouLoading ? (
            <Spinner />
          ) : (
            <ForYou
              bookmarks={bookmarks ?? []}
              newsFeed={newsFeedForYou ?? []}
            />
          )}
        </Tabs.Content>
        <Tabs.Content value="following">
          {newsFeedFollowLoading ? (
            <Spinner />
          ) : (
            <Following
              bookmarks={bookmarks ?? []}
              newsFeed={newsFeedFollowing ?? []}
            />
          )}
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};

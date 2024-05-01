import { endpoints } from "@src/constants/endpoints";
import { Forum, ForumMsg, ForumRequesters } from "@src/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getResource } from "../api";
import { querykeys } from "../querykeys";

export const getForumMessages = async (
  forumId: string | undefined,
  page: number,
  limit: number
): Promise<ForumMsg[]> => {
  const search = " ";
  const data = await getResource({
    pathUrl: `${endpoints.fetch_forum_messages}/${forumId}?search=${search}&page=${page}&limit=${limit}`,
  });
  return data.data;
};

export const getForums = async (username: string): Promise<Forum[]> => {
  const query = " ";
  const data = await getResource({
    pathUrl: `${endpoints.fetch_forums}/${username}?q=${query}`,
  });
  return data.data;
};

export const getForumRequesters = async (): Promise<ForumRequesters[]> => {
  const data = await getResource({
    pathUrl: endpoints.fetch_forum_requesters,
  });
  return data.data;
};

export const useGetForumMessages = (username: string, forumId: string | undefined) => {
  const limit = 10;
  const query = useInfiniteQuery({
    queryKey: [querykeys.GET_FORUM_MESSAGES, username],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await getForumMessages(forumId,  pageParam, limit);
      return { data, nextPage: data.length === limit ? pageParam + 1 : undefined };
    },
    getNextPageParam: (lastPage: any) => lastPage.nextPage,
    staleTime: 0,
    initialPageParam: 1,
  });
  const isLoadingMore = query.isLoading && !query.isFetchingNextPage;
  const loadMore = () => {
    query.fetchNextPage();
  };
  return { ...query, isLoadingMore, loadMore };
};

export const useGetForumRequesters = () => {
  const query = useQuery({
    queryKey: [querykeys.GET_FORUM_REQUESTERS],
    queryFn: () => getForumRequesters(),
  });
  return query;
};

export const useGetForums = (username: string) => {
  const query = useQuery({
    queryKey: [querykeys.GET_FORUM],
    queryFn: () => getForums(username),
  });
  return query;
};
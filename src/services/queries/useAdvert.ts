import { endpoints } from "@src/constants/endpoints";
import { Article } from "@src/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getResource } from "../api";
import { querykeys } from "../querykeys";

export const getAdverts = async (
  username: string,
  page: number,
  limit: number
): Promise<Article[]> => {
  const data = await getResource({
    pathUrl: `${endpoints.fetch_adverts}/${username}?search=${username}&page=${page}&limit=${limit}`,
  });
  return data.data;
};

export const useGetAdverts = (username: string) => {
  const limit = 10;
  const query = useInfiniteQuery({
    queryKey: [querykeys.GET_ADVERTS, username],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await getAdverts(username, pageParam, limit);
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

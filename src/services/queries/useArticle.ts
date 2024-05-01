import { endpoints } from "@src/constants/endpoints";
import { Article, NewsFeed } from "@src/types";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getResource, patchResource } from "../api";
import { querykeys } from "../querykeys";

interface CategoryProps {
  id: string;
  text: string;
}

export const getCategories = async (): Promise<CategoryProps[]> => {
  const data = await getResource({
    pathUrl: endpoints.categories,
  });
  return data.data;
};

export const getArticles = async (
  username: string,
  page: number,
  limit: number
): Promise<Article[]> => {
  const data = await getResource({
    pathUrl: `${endpoints.get_articles}/${username}?page=${page}&limit=${limit}`,
  });
  return data.data;
};

export const getNewsFeed = async (
  page: number,
  limit: number,
  tab: string
): Promise<NewsFeed[]> => {
  const data = await getResource({
    pathUrl: `${endpoints.news_feed}/?page=${page}&limit=${limit}&tab=${tab}`,
  });
  return data.data;
};

export const getDiscoveries = async (): Promise<Article[]> => {
  const data = await getResource({
    pathUrl: endpoints.discoveries,
  });
  return data.data;
};

export const getSingleArticle = async (articleId: string | undefined): Promise<Article> => {
  const data = await getResource({
    pathUrl: `${endpoints.get_single_article}/${articleId}`,
  });
  return data;
};

export const toggleLike = async (articleId: string | undefined) => {
  return patchResource({
    pathUrl: `${endpoints.toggle_like}/${articleId}`,
  });
};

export const toggleBookMark = async (articleId: string | undefined) => {
  return patchResource({
    pathUrl: `${endpoints.toggle_bookmark}/${articleId}`,
  });
};

export const useGetCategories = () => {
  const query = useQuery({
    queryKey: [querykeys.GET_CATEGORIES],
    queryFn: () => getCategories(),
  });
  return query;
};

export const useGetArticles = (username: string) => {
  const limit = 10;
  const query = useInfiniteQuery({
    queryKey: [querykeys.GET_ARTICLES, username],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await getArticles(username, pageParam, limit);
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

export const useGetDiscovery = () => {
  const query = useQuery({
    queryKey: [querykeys.GET_DISCOVERIES],
    queryFn: () => getDiscoveries(),
  });
  return query;
};


export const useGetSingleArticle = (articleId: string | undefined) => {
  const query = useQuery({
    queryKey: [querykeys.GET_SINGLE_ARTICLE, articleId],
    queryFn: () => getSingleArticle(articleId),
  });
  return query;
};

export const useToggleLike = (articleId: string | undefined) => {
  const { refetch } = useGetSingleArticle(articleId);

  return useMutation({
    mutationFn: (articleId: string | undefined) => toggleLike(articleId),
    onSuccess: (data) => {
      refetch()
      toast.success(data.message);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "An error occurred");
    },
  });
};

export const useToggleBookMark = () => {
  return useMutation({
    mutationFn: (articleId: string | undefined) => toggleBookMark(articleId),
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "An error occurred");
    },
  });
};

export const useGetNewsFeedForYou = (tab: string) => {
  const limit = 10;
  const page = 1
  const query = useQuery({
    queryKey: [querykeys.GET_NEWS_FEED],
    queryFn: () => getNewsFeed(page, limit, tab),
  });
  return query;
};

export const useGetNewsFeedFollowing= (tab: string) => {
  const limit = 10;
  const page = 1
  const query = useQuery({
    queryKey: [querykeys.GET_NEWS_FEED],
    queryFn: () => getNewsFeed(page, limit, tab),
  });
  return query;
};
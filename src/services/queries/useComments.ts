import { endpoints } from "@src/constants/endpoints";
import { ArticleId, Comment } from "@src/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getResource, patchResource } from "../api";
import { querykeys } from "../querykeys";

export const getComments = async (
    articleId: ArticleId,
    page: number,
    limit: number
  ): Promise<Comment[]> => {
    const data = await getResource({
      pathUrl: `${endpoints.fetch_comment}/${articleId}?page=${page}&limit=${limit}`,
    });
    return data.data;
};

export const toggleCommentLike = async (articleId: string | undefined, commentId: string | null) => {
  return patchResource({
    pathUrl: `${endpoints.toggle_comment_like}/${articleId}/${commentId}`,
  });
};

export const getCommentsReply = async (
  articleId: ArticleId,
  commentId: string | null,
  page: number,
  limit: number
): Promise<Comment[]> => {
  const data = await getResource({
    pathUrl: `${endpoints.fetch_comment_reply}/${articleId}/${commentId}?page=${page}&limit=${limit}`,
  });
  return data.data;
};

export const useGetComments = (articleId: ArticleId) => {
    const page = 1
    const limit = 5
    return useQuery({
      queryKey: [querykeys.GET_COMMENTS],
      queryFn: () => getComments(articleId, page, limit),
    });
};

export const useToggleCommentLike = (articleId: string | undefined) => {
  const { refetch } = useGetComments(articleId);
  return useMutation({
    mutationFn: (commentId: string | null) => toggleCommentLike(articleId, commentId),
    onSuccess: (data) => {
      refetch()
      toast.success(data.message);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "An error occurred");
    },
  });
};

export const useGetCommentReplies = (articleId: ArticleId, commentId: string | null) => {
  const page = 1;
  const limit = 5;

  return useQuery({
    queryKey: [querykeys.GET_COMMENT_REPLIES],
    queryFn: () => commentId ? getCommentsReply(articleId, commentId, page, limit) : Promise.resolve([]),
    enabled: !!commentId,
  });
};

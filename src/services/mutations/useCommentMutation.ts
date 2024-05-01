import { endpoints } from "@src/constants/endpoints";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { postResource } from "../api";
import { ArticleId, Comment } from "@src/types";
import { useGetComments } from "../queries";

const addComment = (payload: Comment, articleId: ArticleId) => {
    return postResource({ pathUrl: `${endpoints.add_comment}/${articleId}`, payload });
};

const replyComment = (payload: Comment, articleId: ArticleId, commentId: string | null) => {
  return postResource({ pathUrl: `${endpoints.reply_comment}/${articleId}/${commentId}`, payload });
};

export const useAddComment = (articleId: ArticleId) => {
    const { refetch } = useGetComments(articleId);

    return useMutation({
      mutationFn: (payload: Comment) => addComment(payload,  articleId),
      onSuccess: () => {
        refetch()
        toast.success("Comment posted successfully")   
      },
      onError: (error: any) => {
        console.log("Error", error.response.data.message);
        toast.error(error.response.data.message)
      },
    });
};

export const useReplyComment = (articleId: ArticleId, commentId: string | null) => {
  const { refetch } = useGetComments(articleId);

  return useMutation({
    mutationFn: (payload: Comment) => replyComment(payload,  articleId, commentId),
    onSuccess: (data) => {
      console.log(data, "REPLY SUCCESS DATA")
      refetch()
      toast.success("Reply posted successfully")   
    },
    onError: (error: any) => {
      console.log("Error", error.response.data.message);
      toast.error(error.response.data.message)
    },
  });
};

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, UserPostCard } from "@src/components/ui";
import { useAddComment, useReplyComment } from "@src/services/mutations";
import {
  useGetComments,
  useToggleCommentLike,
  useGetCommentReplies,
} from "@src/services/queries";
import { ArticleId, Comment } from "@src/types";
import { Card, Modal } from "flowbite-react";
import { LikeIcon, Spinner } from "@src/components/icons";

interface CommentModalProps {
  openModal: boolean;
  onClose: () => void;
  articleId: ArticleId;
}

export const CommentModal: React.FC<CommentModalProps> = ({
  openModal,
  onClose,
  articleId,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Comment>({ mode: "onChange" });

  const { mutate: addComment, isPending: isAddCommentPending } =
    useAddComment(articleId);

  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const { data: comments, isLoading } = useGetComments(articleId);

  const { mutate: toggleCommentLike, isPending: likeCommentPending } =
    useToggleCommentLike(articleId);

  const { mutate: replyMutation, isPending: isReplyPending } = useReplyComment(
    articleId,
    replyingTo
  );

  const { data: replies, isLoading: repliesLoading } = useGetCommentReplies(
    articleId,
    replyingTo
  );

  const onSubmit = (data: Comment) => {
    if (replyingTo) {
      replyMutation(data);
    } else {
      addComment(data);
    }
    reset();
  };

  const handleLikeClick = (commentId: string | any) => {
    toggleCommentLike(commentId);
  };

  const handleReply = (commentId: string | any) => {
    setReplyingTo(commentId);
  };

  return (
    <Modal size="md" show={openModal} position="top-right" onClose={onClose}>
      <Modal.Header className="border-b-0">Write a comment</Modal.Header>
      <Modal.Body className="p-2">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 p-2">
          <Card className=" border-borderColor shadow-none p-3">
            <UserPostCard />
            <textarea
              placeholder="What do you want to say??"
              className="border-0 text-sm focus:outline-none"
              {...register("content", {
                required: "Comment content is required",
              })}
            />
            {errors && (
              <p style={{ color: "red", fontSize: 14, marginTop: 5 }}>
                {errors.content?.message}
              </p>
            )}
            <div className="flex flex-row">
              <Button
                variant="pale"
                type="submit"
                loading={isAddCommentPending || isReplyPending}
              >
                Comment
              </Button>
              <Button variant="transparent" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </Card>
        </form>
        <div className="p-3">
          <h3>Comments ({comments ? comments.length : 0})</h3>
          {isLoading ? (
            <p>Loading comments...</p>
          ) : (
            comments && (
              <div>
                {comments.map((comment) => (
                  <div key={comment.id} className="mt-2">
                    <UserPostCard
                      avatarUrl={comment?.user?.profile?.avatar?.secure_url}
                      handle={comment.user.username}
                      name={comment.user.fullname}
                    />
                    <p className="text-gray mt-3 text-sm">{comment.content}</p>
                    <div className="flex flex-row mt-4">
                      <button
                        className="mr-12 gap-2 flex flex-row"
                        onClick={() => handleLikeClick(comment.id)}
                      >
                        {likeCommentPending ? (
                          <Spinner />
                        ) : (
                          <LikeIcon size={20} />
                        )}
                        <span className="text-md">{comment.totalLikes}</span>
                      </button>
                      <button onClick={() => handleReply(comment?.id)}>
                        <span>
                          {comment.replies.length > 1
                            ? `${comment.replies.length} Replies`
                            : `${comment.replies.length} Reply`}
                        </span>
                      </button>
                    </div>
                    {replyingTo === comment.id && (
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-2 p-2 ml-8"
                      >
                        <Card className=" border-borderColor shadow-none p-3">
                          <textarea
                            placeholder="Reply to this comment"
                            className="border-0 text-sm focus:outline-none"
                            {...register("content", {
                              required: "Reply content is required",
                            })}
                          />
                          {errors && (
                            <p
                              style={{
                                color: "red",
                                fontSize: 14,
                                marginTop: 5,
                              }}
                            >
                              {errors.content?.message}
                            </p>
                          )}
                          <div className="flex flex-row">
                            <Button
                              variant="pale"
                              type="submit"
                              loading={isAddCommentPending || isReplyPending}
                            >
                              Reply
                            </Button>
                            <Button
                              variant="transparent"
                              onClick={() => setReplyingTo(null)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </Card>
                      </form>
                    )}
                    {repliesLoading && <p>Loading replies...</p>}
                    {replies && (
                      <div>
                        {replies.map((reply) => (
                          <div key={reply.id} className="mt-2 ml-8">
                            <p className="text-gray mt-3 text-sm">
                              {reply.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

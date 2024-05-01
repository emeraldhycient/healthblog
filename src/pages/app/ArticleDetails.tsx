import React, { useState } from "react";
import {
  CommentIcon,
  LikeIcon,
  LinkedinIcon,
  MailIcon,
  SaveIcon,
  Spinner,
  TwitterIcon,
} from "@src/components/icons";
import { CategoryBadge, UserPostCard } from "@src/components/ui";
import { Link, useParams } from "react-router-dom";
import {
  useGetComments,
  useGetSingleArticle,
  useToggleBookMark,
  useToggleLike,
} from "@src/services/queries";
import { formatDate } from "@src/lib/utils";
import { CommentModal } from "@src/components/views";

export const ArticleDetails: React.FC = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const { data, isLoading } = useGetSingleArticle(id);
  const article = data?.data;

  const { data: comments } = useGetComments(id);

  const { mutate: toggleLike, isPending: likePending } = useToggleLike(id);

  const { mutate: toggleBookMark, isPending: bookMarkPending } =
    useToggleBookMark();

  const handleLikeClick = async () => {
    toggleLike(article?.id);
  };

  const handleToggleBookMark = async () => {
    toggleBookMark(article?.id);
  };

  const handleCommentClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Article not found</div>;
  }
  return (
    <>
      {/* <img
        src={article?.coverPhoto.secure_url}
        alt="Blog Hero"
        className="block md:hidden w-[100vw] h-[55vh] md:h-[75vh] object-contain mb-4 "
      /> */}
      <div className="container px-4 md:px-16 mt-8 flex-col-reverse md:flex-row flex">
        <div className="md:w-1/3 pr-8">
          <Link to="/profile">
            <UserPostCard
              avatarUrl={article?.author?.profile?.avatar?.secure_url}
              handle={article?.author.username}
              name={article?.author.fullname}
            />
          </Link>

          {/* Category and Share Icons */}
          <div className="mb-4">
            <div className="mt-10 mb-10">
              <p className="text-base md:text-xl font-medium">Category</p>
              <div className="flex flex-wrap mt-4 -mx-1 space-x-2">
                {article?.categories?.map((category, idx) => (
                  <div key={idx} className=" mb-2">
                    <CategoryBadge color={"purple"} name={category} />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-base md:text-xl font-medium">
                Share this article
              </h3>
              <div className="flex mt-4 gap-3">
                <span className="mr-2">
                  <TwitterIcon size={30} />
                </span>
                <span className="mr-2">
                  <LinkedinIcon size={30} />
                </span>
                <span>
                  <MailIcon size={30} />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="md:w-2/3">
          {/* Blog Content */}
          <img alt={article?.title} src={article?.coverPhoto.secure_url} decoding="async" data-nimg="responsive" className="block w-full h-[200px] object-fill"></img>
          {/* <div className="">
            <img src={article?.coverPhoto.secure_url}
              alt="" className="object-contain" />
          </div> */}
          <div className="mb-8">
            <p className="text-gray mb-1">
              {article?.readingTime} &middot; {formatDate(article?.publishedAt)}
            </p>
            <h1 className="text-3xl font-medium mb-4">{article?.title}</h1>
            <div
              dangerouslySetInnerHTML={{ __html: article?.content || "" }}
              className="leading-[1.8em]"
            ></div>
          </div>

          {/* Like, Comment, Save Section */}
          <div className="border-t border-gray py-4 flex items-center">
            <button
              className="mr-12 gap-2 flex flex-row"
              onClick={handleLikeClick}
            >
              {likePending ? <Spinner /> : <LikeIcon />} {data.totalLikes}
            </button>

            <button
              className="mr-12 gap-2 flex flex-row"
              onClick={handleCommentClick}
            >
              <CommentIcon /> {comments?.length}
            </button>
            <button
              className="flex gap-2 flex-row"
              onClick={handleToggleBookMark}
            >
              {bookMarkPending ? <Spinner /> : <SaveIcon />}{" "}
              {data.totalBookmarks}
            </button>
          </div>

          {/* User Comments Section */}
          <div className="mt-8">
            {/* Single Comment */}
            {comments && comments.length > 0 && (
              <div className="flex items-start mb-4">
                <UserPostCard
                  name={comments[0]?.user?.fullname}
                  handle={comments[0]?.user?.username}
                  avatarUrl={comments[0]?.user?.profile?.avatar?.secure_url}
                />

                <div className="ml-auto text-sm text-gray">
                  {formatDate(comments[0]?.commentedAt)}
                </div>
              </div>
            )}

            {comments && comments.length > 0 && (
              <div>
                <p className="text-gray leading-7">{comments[0]?.content}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <CommentModal
        articleId={id}
        openModal={showModal}
        onClose={handleCloseModal}
      />
    </>
  );
};

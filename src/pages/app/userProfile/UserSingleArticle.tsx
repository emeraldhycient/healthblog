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
import { Button, CategoryBadge, UserPostCard } from "@src/components/ui";
import { Link, useParams } from "react-router-dom";
import {
  useGetComments,
  useGetSingleArticle,
  useToggleBookMark,
  useToggleLike,
} from "@src/services/queries";
import { useAuthStore } from "@src/lib/state";
import { CommentModal } from "@src/components/views";
import { formatDate } from "@src/lib/utils";

export const UserSingleArticle: React.FC = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const { data, isLoading } = useGetSingleArticle(id);
  const { earnings } = useAuthStore();
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
      <img
        src={article?.coverPhoto.secure_url}
        alt="Blog Hero"
        className="w-[100vw] h-[55vh] lg:h-[75vh] object-cover mb-4 "
      />
      <div className="container px-4 lg:px-16 mt-8 flex-col-reverse lg:flex-row flex">
        <div className="lg:w-1/3 pr-8 mt-10">
          <UserPostCard
            avatarUrl={article?.author?.profile?.avatar?.secure_url}
            handle={article?.author.username}
            name={article?.author.fullname}
          />

          {/* Category and Share Icons */}
          <div>
            <div className="mt-5">
              <p className="text-base lg:text-lg font-medium">Category</p>
              <div className="flex flex-wrap mt-4 -mx-1 space-x-3">
                {article?.categories?.map((category, idx) => (
                  <div key={idx} className="px-1 mb-2">
                    <CategoryBadge color={"purple"} name={category} />
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-5  hidden md:inline">
              <p className="text-base lg:text-lg font-medium">Post Reports</p>
              <div className="flex flex-wrap mt-4 -mx-1 space-x-3">
                <div className="px-1 mb-2">
                  <CategoryBadge color={"purple"} name="139K Views" />
                </div>
                <div className="px-1 mb-2">
                  <CategoryBadge color={"purple"} name="₦360,000.00" />
                </div>
              </div>
            </div>
            <div className="mt-5 hidden md:inline">
              <p className="text-base lg:text-lg border- mb-3 font-medium">
                Earnings Report
              </p>

              <p className="bg-purple/20 max-w-[15rem] flex flex-row whitespace-nowrap gap-5  text-purple self-center px-5 text-[14px] md:text-base lg:text-base py-2  lg:mr-3 rounded-full">
                {earnings}
                <hr className=" border self-center w-2"></hr>
                <Link to="/withdraw" className="underline  text-blue/80">
                  Withdraw
                </Link>
              </p>
            </div>
            <div className="mt-10">
              <h3 className="text-base lg:text-lg font-medium">
                Share this article
              </h3>
              <div className="flex mt-4 gap-3">
                <span className="mr-2">
                  <TwitterIcon size={44} />
                </span>
                <span className="mr-2">
                  <LinkedinIcon size={44} />
                </span>
                <span>
                  <MailIcon size={44} />
                </span>
              </div>
            </div>
            <div className="mt-10">
              <h4 className="font-medium">Boost Post</h4>
              <p className="mt-3 mb-5">
                Fuel your health writing success with Phred. Allow your post
                reach more audience once you pay.
              </p>
              <Button>
                <Link to="/boost-article">Boost Now</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:w-2/3">
          {/* Blog Content */}
          <div className="mb-8">
            <div>
              <p className="text-gray mb-1">
                {article?.readingTime} &middot;{" "}
                {formatDate(article?.publishedAt)}
              </p>
            </div>
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

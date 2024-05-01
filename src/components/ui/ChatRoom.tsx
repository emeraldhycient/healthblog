// @ts-nocheck
import React from "react";
import { Button } from "./Button/Button";

import { useParams } from "react-router-dom";
import { useGetForumMessages } from "@src/services/queries";
import { useInfiniteScroll } from "@src/lib/hooks";
import { useAuthStore } from "@src/lib/state";
import { useSendForumMessage } from "@src/services/mutations";
import { ForumMsg } from "@src/types";
import { useForm } from "react-hook-form";
import { UserPostCard } from "./UserPostCard";

export const ChatRoom = () => {
  const { id } = useParams();
  const { username } = useAuthStore();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ForumMsg>({
    mode: "onChange",
  });

  const { data, isLoading, isError, hasNextPage, fetchNextPage } =
    useGetForumMessages(username, id);

  const observerRef = useInfiniteScroll({ hasNextPage, fetchNextPage });

  const { mutate, isPending } = useSendForumMessage(id);

  const handleSendMessage = async (data: ForumMsg) => {
    mutate(data);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching messages, please try again</div>;
  }

  const forumName = data?.pages[0].data.forum.title;
  const forumDescription = data?.pages[0].data.forum.description;
  const forumImage = data?.pages[0].data.forum.profile_img.secure_url;
  const messages = data?.pages[0]?.data?.messages;

  console.log(messages[0]);

  return (
    <div className="flex-1 p-2 sm:p-6 justify-between flex flex-col">
      <div className="flex sm:items-center px-5 py-6 justify-between rounded-t-3xl bg-pale">
        <div className="relative flex items-center space-x-4">
          <img
            src={forumImage}
            alt=""
            className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
          />

          <div className="flex flex-col leading-tight">
            <div className="text-base md:text-lg font-medium mt-1 flex items-center">
              <span className="text-black mr-3">{forumName}</span>
            </div>
            <span className="text-xs md:text-sm text-gray">
              {forumDescription}
            </span>
          </div>
          {/* <SettingsIcon size={50} /> */}
        </div>
      </div>
      {messages?.length === 0 ? (
        <div className="mb-5">No messages yet</div>
      ) : (
        <>
          <div
            id="messages"
            className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
          >
            <>
              {messages?.map((message: ForumMsg, index: string | number) => (
                <div
                  key={index}
                  className={`chat-message ${message.alignment === "right" ? "justify-end" : ""
                    }`}
                >
                  <div className="flex items-end">
                    {message.alignment === "left" && (
                      <div className="flex flex-col px-4 py-2 rounded-lg rounded-bl-none bg-pale space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                        <div className="hidden md:flex">
                          <UserPostCard
                            name={message.sender.fullname}
                            handle={message.sender.username}
                          />
                        </div>
                        <div>
                          <span className="text-sm text-gray">
                            {message.content}
                          </span>
                        </div>
                        <span className="text-xs font-medium text-black self-end">
                          {new Date(message.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    )}
                    {message.alignment === "right" && (
                      <div className="flex flex-col bg-blue px-4 py-2 rounded-lg rounded-tr-none space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                        <div className="">
                          <span className="text-white text-sm">
                            {message.content}
                          </span>
                        </div>
                        <span className="text-xs font-medium text-white">
                          {new Date(message.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </>
          </div>
          <div ref={observerRef} />
        </>
      )}
      <div>
        <form
          onSubmit={handleSubmit(handleSendMessage)}
          className="relative flex"
        >
          <span className="absolute inset-y-0 flex items-center"></span>
          <input
            type="text"
            placeholder="Write your message!"
            {...register("content", {
              required: "Message is required",
            })}
            className="w-full focus:outline-none py-5 focus:placeholder-gray text-gray placeholder-gray pl-5 border border-borderColor rounded-md"
          />

          <div className="absolute right-0 items-center pr-5 inset-y-0 hidden sm:flex">
            <Button loading={isPending} type="submit">
              Send Message
            </Button>
          </div>
        </form>
        {errors && (
          <p style={{ color: "red", fontSize: 14, marginTop: 5 }}>
            {errors.content?.message}
          </p>
        )}
      </div>
    </div>
  );
};
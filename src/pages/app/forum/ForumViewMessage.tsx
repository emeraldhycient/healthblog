import React from "react";
import { SearchBgIcon, Spinner } from "@src/components/icons";
import { ChatRoom } from "@src/components/ui";
import { useGetForumRequesters } from "@src/services/queries";
import { ForumChatCard } from "@src/components/views";
import { useManageForumJoin } from "@src/services/mutations";

export const ForumViewMessage = () => {
  const { data, isLoading } = useGetForumRequesters();
  const { mutate } = useManageForumJoin();

  const onSubmit = (action: string, forumId: string, requestId: string) => {
    mutate({ action, forumId, requestId });
  };
  return (
    <div className="md:px-16 px-4 mt-5 grid lg:grid-cols-3">
      <div className="col-span-2 md:col-span-3 lg:col-span-2 md:pr-10 lg:border-r  border-borderColor h-[100%]">
        <div className="flex flex-row justify-between" id="header">
          <h2 className="text-2xl font-medium">Forums</h2>
          <SearchBgIcon size={50} />
        </div>
        <ChatRoom />
      </div>
      <div
        className="hidden flex-col md:flex gap-4 md:px-5 order-first md:order-2"
        id="user-profile"
      >
        {isLoading ? (
          <Spinner />
        ) : data && data.length > 0 ? (
          data.map((requester) => (
            <ForumChatCard
              key={requester.id}
              isConnectionRequest
              onAccept={() =>
                onSubmit("accept", requester.forum.id, requester.id)
              }
              onDecline={() =>
                onSubmit("decline", requester.forum.id, requester.id)
              }
              requesterName={requester.requester.fullname}
              forumName={requester.forum.title}
              image={requester.forum?.avatar?.secure_url}
            />
          ))
        ) : (
          <p>No forum requesters available.</p>
        )}
      </div>
    </div>
  );
};

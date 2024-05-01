import React from "react";
import { useNavigate } from "react-router-dom";
import { ForumChatCard, UserProfile } from "@src/components/views";
import { Button, Follower, FollowersHeader } from "@src/components/ui";
import { useGlobalStore } from "@src/lib/state/global";
import { CreateForum } from "./CreateForum";
import { useGetFollowers, useGetForums } from "@src/services/queries";
import { useAuthStore } from "@src/lib/state";
import { SearchBgIcon, Spinner } from "@src/components/icons";

export const Forum = () => {
  const { isModalOpen, openModal } = useGlobalStore();
  const navigate = useNavigate();
  const { username } = useAuthStore();

  const { data, isFetching } = useGetForums(username);
  const userFollowersQuery = useGetFollowers();
  const followers = userFollowersQuery.data;

  // const { data: following } = useGetFollowing(username);

  const handleCreateForum = () => {
    if (window.innerWidth < 650) {
      navigate("/create-forum");
    } else {
      openModal();
    }
  };

  return (
    <>
      <div className="md:px-16 px-4 mt-5">
        <div className="flex justify-between lg:gap-10 flex-row">
          <div className="lg:border-r border-borderColor lg:pr-10 h-[100%]">
            <div
              className="md:flex flex-row hidden justify-between"
              id="header"
            >
              <h2 className="text-2xl font-medium">Forums</h2>
              <div className="flex flex-row gap-4">
                <Button onClick={handleCreateForum}>+ Create a Forum</Button>
                <SearchBgIcon size={50} />
              </div>
            </div>
            <div className="mt-10 w-[100%] md:w-[80vw] lg:w-[60vw] flex flex-col gap-10">
              {/* Check if data is fetching */}
              {isFetching ? (
                <Spinner />
              ) : data && data.length > 0 ? (
                data.map((forum) => (
                  <ForumChatCard
                    key={forum.id}
                    id={forum.id}
                    isConnectionRequest={false}
                    title={forum.title}
                    unReadCount={forum.unreadCount}
                    description={forum.description}
                    image={forum.profile_img.secure_url}
                  />
                ))
              ) : (
                <p>No forums available yet.</p>
              )}
            </div>
          </div>
          <div className="lg:w-[30vw] flex flex-col gap-5">
            <UserProfile isMobile={false} />
            <div className="hidden lg:block">
              <FollowersHeader title="Followers list" />
              {followers?.data?.map((follower) => {
                return (
                  // @ts-ignore
                  <Follower key={follower.id} follower={follower.follower} />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <CreateForum />}
    </>
  );
};

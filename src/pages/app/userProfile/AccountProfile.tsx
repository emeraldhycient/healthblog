import React, { useEffect, useState } from "react";
import { Follower, FollowersHeader } from "@src/components/ui";
import { Eye } from "@src/components/icons";
import {
  ProfileAdverts,
  ProfileArticles,
  UserProfile,
} from "@src/components/views";
import { useAuthStore } from "@src/lib/state";
import {
  useGetFollowers,
  useGetFollowing,
  useGetProfile,
  useGetUserProfile,
} from "@src/services/queries";
import { formatPrice } from "@src/lib/utils";
import { Tabs } from "@src/components/ui";
import { useLocation, useNavigate } from "react-router-dom";

type TabValues = "articles" | "adverts";

export const AccountProfile = () => {
  const [tabValue, setTabValue] = useState<TabValues>("articles");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const username = pathname.split("/")[2];
  const [userProfileData, setUserProfileData] = useState() as any;

  const [showBalance, setShowBalance] = useState(true);
  const userProfileQuery = useGetUserProfile();
  const userProfile = useGetProfile(username);

  const userFollowersQuery = useGetFollowers();

  const handleValueChange = (value: string) => {
    setTabValue(value as TabValues);
    navigate(`/account-profile/${username}/${value}`);
  };

  const { data: following } = useGetFollowing(username);

  useEffect(() => {
    setUserProfileData(userProfile.data?.data);
  }, [userProfile.data]);

  useEffect(() => {
    const tab = pathname.split("/")[2];
    if (["articles", "adverts"].includes(tab)) {
      setTabValue(tab as TabValues);
    }
  }, [pathname]);

  const followers = userFollowersQuery.data;
  const profileData = userProfileQuery?.data;

  const isLoggedInUser = profileData?.data?.id === userProfile?.data?.data?.id;

  const formattedProfile = {
    fullname: profileData?.data?.fullname,
    username: profileData?.data?.username,
    bio: profileData?.data?.profile?.bio,
    isVerified: profileData?.data?.verification?.verified,
    earnings: profileData?.data?.wallet?.balance,
    totalArticles: profileData?.totalArticles,
  };

  const {
    setProfile,
    earnings,
    fullname,
    setFollowersLength,
    bio,
    totalArticles,
  } = useAuthStore();

  useEffect(() => {
    if (profileData) {
      setProfile(formattedProfile);
    }
    if (followers) {
      setFollowersLength(followers.followersLength);
    }
  }, [profileData]);

  const toggleBalanceVisibility = () => {
    setShowBalance((prev) => !prev);
  };
  return (
    <div className="grid grid-cols-12 lg:px-16 px-4 pb-20 mt-5">
      <div className="col-span-11 lg:col-span-8 lg:pr-10 lg:border-r lg:-mt-5 border-borderColor h-[100%]">
        <div className="md:mt-5">
          <UserProfile
            isUserProfile
            showUserStat
            isLoggedInUser={isLoggedInUser}
            isMobile
            toggleBalanceVisibility={toggleBalanceVisibility}
            showBalance={showBalance}
            userId={userProfileData?.id}
            hasFollowed={userProfile?.data?.hasFollowed}
            totalArticles={
              isLoggedInUser ? totalArticles : userProfile?.data?.totalArticles
            }
            bio={isLoggedInUser ? bio : userProfileData?.profile?.bio}
          />
          <div className="flex flex-row justify-between">
            <h1 className="text-3xl md:visible invisible font-medium">
              {isLoggedInUser ? fullname : userProfileData?.fullname}
            </h1>
            {isLoggedInUser && (
              <div className="hidden md:inline">
                <div className="flex flex-row  justify-between gap-2">
                  <h4>Earning Balance</h4>
                  <Eye
                    stroke="#0A66C2"
                    onClick={toggleBalanceVisibility}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <h3 className="text-2xl font-medium mt-2">
                  {showBalance ? formatPrice(earnings) : "**********"}
                </h3>
              </div>
            )}
          </div>
        </div>

        <Tabs.Root
          className="flex flex-col gap-8"
          value={tabValue}
          defaultValue="articles"
          onValueChange={handleValueChange}
        >
          <Tabs.List className="shrink-0 flex" aria-label="Manage your account">
            <Tabs.Trigger
              className="px-5 h-[45px] flex items-center justify-center text-base text-gray leading-none border-b-2 border-transparent  data-[state=active]:text-foreground data-[state=active]:border-blue outline-none cursor-pointer"
              value="articles"
            >
              {`${
                isLoggedInUser ? fullname : userProfileData?.fullname
              }'s Articles`}
            </Tabs.Trigger>
            <Tabs.Trigger
              className="px-5 h-[45px] flex items-center justify-center text-base  text-gray leading-none border-b-2 border-transparent  data-[state=active]:text-foreground data-[state=active]:border-blue outline-none cursor-pointer"
              value="adverts"
            >
              Adverts
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="articles">
            <ProfileArticles username={username} />
          </Tabs.Content>
          <Tabs.Content value="adverts">
            <ProfileAdverts username={username} />
          </Tabs.Content>
        </Tabs.Root>
      </div>

      <div className="col-span-11 lg:col-span-4">
        <div className="md:px-5">
          <UserProfile
            showUserStat
            isUserProfile
            isMobile={false}
            isLoggedInUser={isLoggedInUser}
            toggleBalanceVisibility={toggleBalanceVisibility}
            showBalance={showBalance}
            userId={userProfileData?.id}
            hasFollowed={userProfile?.data?.hasFollowed}
            totalArticles={
              isLoggedInUser ? totalArticles : userProfile?.data?.totalArticles
            }
            bio={isLoggedInUser ? bio : userProfileData?.profile?.bio}
          />
        </div>

        <div id="followers" className=" md:px-5 mt-5 ">
          <FollowersHeader title="Following list" />
          {/* TODO */}
          {isLoggedInUser ? (
            <>
              {following?.data?.map((follower: any) => (
                <Follower key={follower.id} follower={follower} />
              ))}
              <p className="text-base text-gray mt-3">
                See all ({following?.data?.length})
              </p>
            </>
          ) : (
            <>
              {following?.data?.map((following: any) => (
                <Follower key={following.id} follower={following} />
              ))}
              <p className="text-base text-gray mt-3">
                See all ({following?.data?.length})
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

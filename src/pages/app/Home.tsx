import { Article, CTA, Hero } from "@src/components/views";
import { useAuthStore } from "@src/lib/state";
import { useGetUserProfile } from "@src/services/queries";
import React, { useEffect } from "react";

export const Home = () => {
  const userProfileQuery = useGetUserProfile();

  const profileData = userProfileQuery?.data;

  const formattedProfile = {
    fullname: profileData?.data?.fullname,
    username: profileData?.data?.username,
    bio: profileData?.data?.profile?.bio,
    isVerified: profileData?.data?.verification?.verified,
    earnings: profileData?.data?.wallet?.balance,
    totalArticles: profileData?.totalArticles,
  };

  const { setProfile } = useAuthStore();

  useEffect(() => {
    if (profileData) {
      setProfile(formattedProfile);
    }
  }, [profileData]);
  return (
    <div>
      <Hero />
      <Article />
      <CTA />
    </div>
  );
};

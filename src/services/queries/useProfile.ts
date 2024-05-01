import { endpoints } from "@src/constants/endpoints";
import { useAuthStore } from "@src/lib/state";
import {  Bookmark, Followers, Following, Profile, UserProfileDTO } from "@src/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getResource, patchResource, updateResource } from "../api";
import { querykeys } from "../querykeys";

export const getUser = async (): Promise<Profile> => {
  const data = await getResource({
    pathUrl: endpoints.get_profile,
  });
  return data;
};

export const getProfile = async (username: string): Promise<Profile> => {
  const data = await getResource({
    pathUrl: `${endpoints.profile}/${username}`,
  });
  return data;
};

// TODO
export const getFollowers = async ( page: number,
  limit: number): Promise<Followers> => {
  const data = await getResource({
    pathUrl: `${endpoints.get_followers}?page=${page}&limit=${limit}`,
  });
  return data;
};

export const toggleFollow = async (targetId: string | undefined) => {
  return patchResource({
    pathUrl: `${endpoints.toggle_follow}/${targetId}`,
  });
};

export const getBookMarks = async (): Promise<Bookmark[]> => {
  const data = await getResource({
    pathUrl: endpoints.get_bookmarks,
  });
  return data.data;
};

export const getFollowing = async ( page: number,
  limit: number, username: string): Promise<Following> => {
  const data = await getResource({
    pathUrl: `${endpoints.following}/${username}?page=${page}&limit=${limit}`,
  });
  return data;
};


export const updateUser = async (payload: UserProfileDTO) => {
  return updateResource({
    pathUrl: endpoints.update_profile,
    payload,
  });
};

export const useGetUserProfile = () => {
  return useQuery({
    queryKey: [querykeys.GET_PROFILE],
    queryFn: () => getUser(),
  });
};

export const useGetProfile = (username: string) => {
  return useQuery({
    queryKey: [querykeys.GET_USER],
    queryFn: () => getProfile(username),
  });
};

export const useGetBookmarks = () => {
  return useQuery({
    queryKey: [querykeys.GET_BOOKAMRKS],
    queryFn: () => getBookMarks(),
  });
};

export const useUpdateUser = () => {
  const { setProfile } = useAuthStore();

  return useMutation({
    mutationFn: (payload: UserProfileDTO) => updateUser(payload),
    onSuccess: (data) => {
      const { fullname, username, bio } = data.data;
      setProfile({ fullname, username, bio });
      toast.success(data.message);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "An error occurred");
    },
  });
};

export const useGetFollowers = () => {
  const page = 1
  const limit = 10
  return useQuery({
    queryKey: [querykeys.GET_FOLLOWERS],
    queryFn: () => getFollowers(page, limit),
  });
};


export const useGetFollowing = (username: string) => {
  const page = 1
  const limit = 10
  return useQuery({
    queryKey: [querykeys.GET_FOLLOWING],
    queryFn: () => getFollowing(page, limit, username),
  });
};

export const useToggleFollow = () => {
  return useMutation({
    mutationFn: (targetId: string | undefined) => toggleFollow(targetId),
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "An error occurred");
    },
  });
};
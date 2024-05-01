import { endpoints } from "@src/constants/endpoints";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { patchResource, postResource } from "../api";
import { useNavigate } from 'react-router-dom';
import {  ForumMsg } from "@src/types";
import { useGetForumMessages, useGetForums } from "../queries";
import { useAuthStore } from "@src/lib/state";

const createForum = (payload: FormData) => {
    return postResource({ pathUrl: endpoints.create_forum, payload });
};

const requestJoinForum = (forumId: string) => {
  return postResource({ pathUrl: `${endpoints.request_join_forum}/${forumId}`, });
};

const manageForumJoin = (action: string, forumId: string, requestId: string) => {
  return postResource({ pathUrl: `${endpoints.manage_join}/${forumId}/${requestId}?action=${action}`, });
};

const sendForumMessage = (payload: ForumMsg, forumId: string | undefined) => {
  return patchResource({ pathUrl: `${endpoints.send_forum_message}/${forumId}`, payload });
};

export const useCreateForum = (username: string) => {
  const { refetch } = useGetForums(username);

  const navigate = useNavigate();
    return useMutation({
      mutationFn: (payload: FormData) => createForum(payload),
      onSuccess: (data) => {
        toast.success(data.message)   
        refetch()
        navigate('/forum');
      },
      onError: (error: any) => {
        console.log("Error", error.response.data.message);
        toast.error(error.response.data.message)
      },
    });
};

export const useSendForumMessage = (forumId: string) => {
  const { username } = useAuthStore();

  const { refetch } = useGetForumMessages(forumId, username);
    return useMutation({
      mutationFn: (payload: ForumMsg) => sendForumMessage(payload, forumId),
      onSuccess: (data) => {
        toast.success(data.message) 
        refetch()
      },
      onError: (error: any) => {
        console.log("Error", error.response.data.message);
        toast.error(error.response.data.message)
      },
    });
};

export const useManageForumJoin = () => {
  return useMutation({
    mutationFn: ({ action, forumId, requestId }: { action: string; forumId: string; requestId: string }) =>
      manageForumJoin(action, forumId, requestId),
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error: any) => {
      console.log("Error", error.response.data.message);
      toast.error(error.response.data.message);
    },
  });
};

export const  useRequestJoinForum = () => {
  return useMutation({
    mutationFn: (payload: string) => requestJoinForum(payload),
    onSuccess: (data) => {
      toast.success(data.message)   
    },
    onError: (error: any) => {
      console.log("Error", error.response.data.message);
      toast.error(error.response.data.message)
    },
  });
};
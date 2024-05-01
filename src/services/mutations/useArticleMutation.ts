import { endpoints } from "@src/constants/endpoints";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { postResource } from "../api";
import { useNavigate } from 'react-router-dom';

const createArticle = (payload: FormData) => {
    return postResource({ pathUrl: endpoints.article_publish, payload });
};


export const useCreateArticle = (username: string) => {
  const navigate = useNavigate();
    return useMutation({
      mutationFn: (payload: FormData) => createArticle(payload),
      onSuccess: (data) => {
        toast.success(data.message)   
        navigate(`/account-profile/${username}`);
      },
      onError: (error: any) => {
        console.log("Error", error.response.data.message);
        toast.error(error.response.data.message)
      },
    });
};

import { endpoints } from "@src/constants/endpoints";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { postResource } from "../api";
import { useNavigate } from 'react-router-dom';

const submitAdvert = (payload: FormData) => {
    return postResource({ pathUrl: endpoints.advert_post, payload });
};

export const useSubmitAdvert = () => {
  const navigate = useNavigate();
    return useMutation({
      mutationFn: (payload: FormData) => submitAdvert(payload),
      onSuccess: (data) => {
        toast.success(data.message)   
        navigate('/');
      },
      onError: (error: any) => {
        console.log("Error", error.response.data.message);
        toast.error(error.response.data.message)
      },
    });
};

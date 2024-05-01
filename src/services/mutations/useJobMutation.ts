import { endpoints } from "@src/constants/endpoints";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { postResource } from "../api";
import { useNavigate } from 'react-router-dom';
import { Job } from "@src/types";

const createJob = (payload: Job) => {
    return postResource({ pathUrl: endpoints.create_job, payload });
};

export const useCreateJob = () => {
  const navigate = useNavigate();
    return useMutation({
      mutationFn: (payload: Job) => createJob(payload),
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

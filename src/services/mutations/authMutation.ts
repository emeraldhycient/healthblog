import { endpoints } from "@src/constants/endpoints";
import { CreateAccountData, LoginDTO, ResetPasswordDTO } from "@src/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { patchResource, postResource } from "../api";
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from "@src/lib/state";

const createUser = (payload: CreateAccountData) => {
    return postResource({ pathUrl: endpoints.register, payload });
};

const login = (payload: LoginDTO) => {
  return postResource({ pathUrl: endpoints.login, payload });
};

const resetPassword = (payload: ResetPasswordDTO ,token: string | null) => {
  return patchResource({ pathUrl: `${endpoints.reset_password}?token=${token}&token_type=password`,  payload});
};

export const useCreateUser = () => {
  const navigate = useNavigate();
    return useMutation({
      mutationFn: (payload: CreateAccountData) => createUser(payload),
      onSuccess: (data) => {
        toast.success(data.message)   
        navigate('/account-creation-success');
      },
      onError: (error: any) => {
        console.log("Error", error.response.data.message);
        toast.error(error.response.data.message)
      },
    });
};

export const useLoginUser = () => {
  const navigate = useNavigate();
  const { setToken, setIsLoggedIn, setEmail, setIsVerified}  = useAuthStore();

  return useMutation({
    mutationFn: (payload: LoginDTO) => login(payload),
    onSuccess: (data) => {
      setIsVerified(data.data.verified)
      setIsLoggedIn(true)
      setToken(data.access_token)
      setEmail(data.data.email)
      toast.success(data.message);
      navigate('/');
    },
    onError: (error: any) => {
      console.log("Error", error.response.data.message);
      toast.error(error.response.data.message);
    },
  });
};

export const useResetPassword = (token: string | null) => {
  const navigate = useNavigate();
    return useMutation({
      mutationFn: (payload: ResetPasswordDTO) => resetPassword(payload, token),
      onSuccess: (data) => {
        toast.success(data.message)   
        navigate('/login');
      },
      onError: (error: any) => {
        console.log("Error", error.response.data.message);
        toast.error(error.response.data.message)
      },
    });
};
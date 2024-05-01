import { endpoints } from "@src/constants/endpoints";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { getResource } from "../api";
import { querykeys } from "../querykeys";

const fetchEmailToken = async (token: string | null) => {
    const url = `${endpoints.verify_email}?token=${token}`;
    return getResource({ pathUrl: url });
};

const fetchEmailResendToken = async (email: string | null) => {
    const url = `${endpoints.request_token}?token_type=email&email=${email}`;
    return getResource({ pathUrl: url });
};

const forgotPassword = async (email: string | null) => {
    const url = `${endpoints.request_token}?token_type=password&email=${email}`;
    return getResource({ pathUrl: url });
};


export const useGetEmailToken = () => {
    const location = useLocation();
    const token = new URLSearchParams(location.search).get("token");
    const query = useQuery({
        queryKey: [querykeys.VERIFY_EMAIL, token],
        queryFn: () => fetchEmailToken(token), 
        enabled: !!token,
        refetchInterval: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    });
    return query;
};

export const useResendEmailToken = () => {
    return useMutation({
        mutationFn: (email: string) => fetchEmailResendToken(email),
        onSuccess: (data) => {
            toast.success(data.message)
        },
        onError: (error: any) => {
            console.log("Error", error.response.data.message);
            toast.error(error.response.data.message)
         },
    })
};



export const useForgotPassword = () => {
    return useMutation({
        mutationFn: (email: string) => forgotPassword(email),
        onSuccess: (data) => {
            toast.success(data.message)
        },
        onError: (error: any) => {
            console.log("Error", error.response.data.message);
            toast.error(error.response.data.message)
         },
    })
};
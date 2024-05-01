import { endpoints } from "@src/constants/endpoints";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { patchResource, postResource } from "../api";
import { useNavigate } from 'react-router-dom';
import { AccountDetails, becomeMember as registerForMembership, Withdraw } from "@src/types";

const makeWithdrawal = (payload: Withdraw) => {
    return postResource({ pathUrl: endpoints.withdraw, payload });
};

const addAcctDetails = (payload: AccountDetails) => {
  return patchResource({ pathUrl: endpoints.acct_details, payload });
};

const becomeMember = (payload: registerForMembership) => {
  return postResource({ pathUrl: endpoints.become_member, payload });
};

export const useMakeWithdrawal = () => {
  const navigate = useNavigate();
    return useMutation({
      mutationFn: (payload: Withdraw) => makeWithdrawal(payload),
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

export const useAddAccountDetails = () => {
  const navigate = useNavigate();
    return useMutation({
      mutationFn: (payload: AccountDetails) => addAcctDetails(payload),
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


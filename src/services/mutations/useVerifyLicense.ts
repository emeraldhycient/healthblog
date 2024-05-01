import { endpoints } from "@src/constants/endpoints";
import { LicenseSubmissionDTO, } from "@src/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { postResource } from "../api";
import { useNavigate } from 'react-router-dom';

const verifyLicense = (payload: LicenseSubmissionDTO) => {
    return postResource({ pathUrl: endpoints.verify_license, payload });
};


export const useSubmitLicense = () => {
    // TODO
  const navigate = useNavigate();
    return useMutation({
      mutationFn: (payload: LicenseSubmissionDTO) => verifyLicense(payload),
      onSuccess: (data) => {
        toast.success(data.message)   
        navigate('/verify-pending');
      },
      onError: (error: any) => {
        console.log("Error", error.response.data.message);
        toast.error(error.response.data.message)
      },
    });
};

import { endpoints } from "@src/constants/endpoints";
import { Banks } from "@src/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getResource } from "../api";
import { querykeys } from "../querykeys";

export const getBanks = async (): Promise<Banks[]> => {
  const data = await getResource({
    pathUrl: endpoints.banks,
  });
  return data.data;
};

export const verifyBank = async (bank_code: string, account_number: string) => {
  const data = await getResource({
    pathUrl: `${endpoints.verify_bank}?bank_code=${bank_code}&account_number=${account_number}`,
  });
  return data.data;
};

export const useGetBanks = () => {
  const query = useQuery({
    queryKey: [querykeys.GET_BANKS],
    queryFn: () => getBanks(),
  });
  return query;
};

export const useVerifyBank = () => {
  return useMutation({
    mutationFn: ({
      bank_code,
      account_number,
    }: {
      bank_code: string;
      account_number: string;
    }) => verifyBank(bank_code, account_number),
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error: any) => {
      console.log("Error", error.response.data.message);
      toast.error(error.response.data.message);
    },
  });
};

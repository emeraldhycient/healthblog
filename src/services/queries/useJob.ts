import {endpoints} from "@src/constants/endpoints";
import {Job} from "@src/types";
import {useQuery} from "@tanstack/react-query";
import {getResource} from "../api";
import {querykeys} from "../querykeys";

export const getJobs = async () : Promise < Job[] > => {
    const data = await getResource({pathUrl: endpoints.fetch_jobs});
    return data.data;
};

export const useGetJob = () => {
    const query = useQuery({
        queryKey: [querykeys.GET_JOB],
        queryFn: () => getJobs()
    });
    return query;
};

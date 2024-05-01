import { useAuthStore } from "@src/lib/state";
import axios from "axios";

type Props = {
  pathUrl: string;
  payload?: Object;
};

const BASE_URL = import.meta.env.VITE_BASE_URL

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = useAuthStore.getState().token;
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
        if (config.data instanceof FormData) {
          config.headers["Content-Type"] = "multipart/form-data";
        } else {
          config.headers["Content-Type"] = "application/json";
        }
        config.headers["Accept"] = "*/*";
      }
      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);


export const getResource = async ({ pathUrl }: Props) => {
  const { data } = await axiosInstance.get(pathUrl);
  return data;
};

export const postResource = async ({ pathUrl, payload }: Props) => {
  const { data } = await axiosInstance.post(pathUrl, payload);
  return data;
};

export const updateResource = async ({ pathUrl, payload }: Props) => {
  const { data } = await axiosInstance.put(pathUrl, payload);
  return data;
};

export const patchResource = async ({ pathUrl, payload }: Props) => {
  const { data } = await axiosInstance.patch(pathUrl, payload);
  return data;
};

export const deleteResource = async ({ pathUrl, payload }: Props) => {
  const { data } = await axiosInstance.delete(pathUrl, payload);
  return data;
};

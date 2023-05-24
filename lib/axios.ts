import axios, { AxiosError } from "axios";
import { storageLocal } from "./StorageHandler";

let accessToken = storageLocal.get("accessToken", "");
const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

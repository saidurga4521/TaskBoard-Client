import axios from "axios";
import { getAuthToken } from "../helpers/localstorage.js";
const base_url = import.meta.env.VITE_API_URL || "http://localhost:5001/api";
export const axiosInstance = axios.create({
  baseURL: base_url,
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

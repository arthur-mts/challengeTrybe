import axios from "axios";
import { API_URL } from "config/api";

const api = axios.create({ baseURL: API_URL });

export const setAuthorization = (token: string | null) => {
  if (!token) return;
  api.interceptors.request.use((config) => {
    const newConfig = { ...config, headers: config.headers || {} };
    newConfig.headers.Authorization = token;
    return newConfig;
  });
};

export default api;

import axios from "axios";
import useAuthStore from "../store/authStore";

const baseURL = import.meta.env.VITE_BACKEND_API;

// Create axios instance
export const api = axios.create({
  baseURL,
});

// Add an interceptor to include the token in the Authorization header
api.interceptors.request.use(
  (config) => {
    const authToken = useAuthStore.getState().authToken;

    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

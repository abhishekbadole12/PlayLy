import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_API;

export const api = axios.create({ baseURL, withCredentials: true });
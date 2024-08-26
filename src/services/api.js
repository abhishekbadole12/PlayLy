import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_API_DEV;

export const api = axios.create({ baseURL });
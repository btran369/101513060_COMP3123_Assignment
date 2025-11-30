import axios from "axios";

const isProd = process.env.NODE_ENV === "production";

const baseURL =
  process.env.REACT_APP_API_BASE_URL ||
  (isProd ? "/api/v1" : "http://localhost:3000/api/v1");

const api = axios.create({ baseURL });

// attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

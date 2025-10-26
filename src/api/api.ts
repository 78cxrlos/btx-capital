// src/api/api.ts
import axios from "axios";

// Ensure the base URL is always a string
const BASE = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:5000/api";

const api = axios.create({
  baseURL: BASE,
  // Remove default Content-Type to allow FormData
});

// Attach token automatically to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default api;

import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";


const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("profile");
  window.location.href = "/";
};

export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};

export const getProfile = () => {
  const profileStr = localStorage.getItem("profile");
  if (!profileStr) return null;
  try {
    return JSON.parse(profileStr);
  } catch {
    return null;
  }
};
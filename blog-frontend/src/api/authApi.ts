import api from "../core/axiosConfig";

export const login = async (email: string, password: string) => {
  const response = await api.post("/Auth/login", { email, password });
  return response.data;
};

export const register = async (email: string, password: string) => {
  const response = await api.post("/User/CreateUser", { email, password });
  return response.data;
};
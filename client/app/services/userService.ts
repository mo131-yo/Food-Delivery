import api from "@/app/utils/axios";

export const signIn = async (userData: any) => {
  const response = await api.post("/users/sign-in", userData);
  return response.data;
};

export const updateUser = async (userId: string, data: any) => {
  const response = await api.put(`/users/update-role/${userId}`, data);
  return response.data;
};
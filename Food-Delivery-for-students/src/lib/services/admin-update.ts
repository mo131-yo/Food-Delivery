import { api } from "@/lib/axios-instance";

interface UpdateUserData {
  name?: string;
  email?: string;
}

export const updateAdminProfile = async (data: UpdateUserData) => {
  const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
  const endPoint = `/users/update-user`; 

  try {
    const response = await api.patch(endPoint, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Update Admin Profile Error:", error.response?.data || error.message);
    throw error;
  }
};
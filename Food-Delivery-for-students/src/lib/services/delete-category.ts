import { api } from "@/lib/axios-instance";

export const deleteCategoryService = async (categoryId: string) => {
  const token = localStorage.getItem("token");
  try {
    const response = await api.delete(`/foods-category/delete-category/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};
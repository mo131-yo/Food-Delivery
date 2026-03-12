import { toast } from "sonner";
import {api} from "@/lib/axios-instance"

export const createCategory = async (payload: { categoryName: string }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("ta ehleed nevtreh ystoi");
    return undefined;
  }

  try {
    const response = await api.post("/foods-category/create-food-category", payload, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    toast.success("Амжилттай!");
    return response.data;
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Алдаа гарлаа");
    return undefined;
  }
};
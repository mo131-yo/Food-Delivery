import { api } from "@/lib/axios-instance";

export type FoodOrderItem = {
  food: string;
  quantity: number;
};

export type FoodOrderPayload = {
  foods: FoodOrderItem[];
  address: string;
};

export const createOrder = async (payload: FoodOrderPayload) => {
  const token = localStorage.getItem("token") || localStorage.getItem("accessToken");

  if (!token) {
    throw new Error("Ta nevtreegui bn");
  }

  try {
    const response = await api.post("/foods-order/create-order", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Aldaa garlaa");
  }
};
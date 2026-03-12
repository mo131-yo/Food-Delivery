import {api} from "@/lib/axios-instance";

export type OrderItem = {
  _id: string;
  totalPrice: number;
  status: string;
  address: string;
  foods: {
    food: {
      foodName: string;
      image: string;
      foodPrice: number;
    };
    quantity: number;
  }[];
  createdAt: string;
};

export const getMyOrders = async (currentPage?: number, limit?: number): Promise<OrderItem[]> => {
  const token = localStorage.getItem("token") || localStorage.getItem("accessToken");

  try {
    const response = await api.get("/foods-order/my-orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error: any) {
    console.error("Orders татахад алдаа гарлаа:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Tuuh tataj chadsangui");
  }
};
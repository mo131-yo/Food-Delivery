import { AllFoodOrders } from "@/types";
import { api} from "@/lib/axios-instance"

export const updateOrder = async (
  id: string,
  status: string
): Promise<AllFoodOrders | undefined> => {
  const endPoint = `/foods-order/one-order-update/${id}`;
  
  const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
  console.log("Sending Token:", token);

  try {
    const response = await api.patch(endPoint, 
      { newStatus: status },
      { 
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );


    return response.data.order;
  } catch (error: any ) {
    console.error("Update Order Error:", error);
    return undefined;
  }
};
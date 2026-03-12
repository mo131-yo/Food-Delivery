import {api} from "@/lib/axios-instance"

export const updateMultipleOrder = async (
  ids: string[],
  newStatus: string 
): Promise<{ message: string; updatedCount: number } | undefined> => {
  const endPoint = `/foods-order/many-order-update`;
  const token = localStorage.getItem("token");

 try {
    const response = await api.patch(endPoint, 
      { 
        orderIds: ids,
        newStatus: newStatus 
      }, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error("Update Multiple Order Error:", error);
    return undefined;
  }
};
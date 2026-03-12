import {api} from "../axios-instance"

export const updateFoodService = async (foodId: string, payload: any) => {
  const token = localStorage.getItem("token"); 

  try {
    const response = await api.patch(`/foods/update-food/${foodId}`, payload,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
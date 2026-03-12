  import {api} from "@/lib/axios-instance"

  export const deleteFood = async (foodId: string) => {
     const token = localStorage.getItem("token"); 

    try {
    const response = await api.delete(`/foods/delete-food/${foodId}`,{
     headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};


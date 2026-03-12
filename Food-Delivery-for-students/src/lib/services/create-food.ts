  import {api} from "@/lib/axios-instance"
  import axios from "axios";

  type Food = {
    foodName: string;
    foodPrice: number;
    foodImage: string;
    ingredients: string[];
    category: string;
  };


  export const createFood = async (payload: Food) => {
    
    try {
    const response = await api.post("/foods/create-food-item", payload);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};


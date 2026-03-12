import {api} from "@/lib/axios-instance"
import { ReactNode } from 'react';

export type Category = {
  count: ReactNode;
  categoryName: string;
  _id: string;
};

export const fetchCategories = async (): Promise<{
  data: Category[];
  error: boolean;
}> => {
  try {
    const response = await api.get("/foods-category/get-all-foods"); 

    return { 
      data: response.data.data,
      error: false 
    };
  } catch (error) {
    console.error("Axios Fetch Categories Error:", error);
    return { 
      data: [], 
      error: true 
    };
  }
};
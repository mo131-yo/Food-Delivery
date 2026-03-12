import {api} from "@/lib/axios-instance";
import { FoodCategory } from "@/types/category";


export const fetchFoodsWithCategories = async () => {
  try {
    const response = await api.get("/foods/get-all-food");
    const allFoods = response.data.data;

    const grouped = allFoods.reduce((acc: any, food: any) => {
      const catName = food.category?.categoryName || "Other";
      const catId = food.category?._id || catName; 
      
      if (!acc[catName]) {
        acc[catName] = { 
          _id: catId,
          categoryName: catName, 
          foods: [] 
        };
      }
      acc[catName].foods.push(food);
      return acc;
    }, {});

    return {
      data: Object.values(grouped) as FoodCategory[],
      error: false,
    };
  } catch (error) {
    return { data: [], error: true };
  }
};
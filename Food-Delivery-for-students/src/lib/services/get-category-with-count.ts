import { api } from "../axios-instance";

export const fetchCategoriesWithCount = async () => {
  try {
    const response = await api.get("/foods-category/with-count");

    const data = response.data.map((cat: any) => ({
      _id: cat._id,
      categoryName: cat.categoryName,
      count: Number(cat.count) || 0,
    }));
    return { data, error: false };  
  } catch (error) {
    return { data: [], error: true };
  }
};
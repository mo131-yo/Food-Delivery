  import { FoodCategory } from "./category";

  export type Food = {
  id?: string;
  _id: string;
  foodName: string;
  foodPrice: number;
  foodImage: string | null;
  ingredients: string[];
  category: string | any; 
  quantity?: number;
};
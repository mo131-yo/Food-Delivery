"use client";

import { fetchFoodsWithCategories } from "@/lib/services/get-foods-with-categories";
import { useEffect, useState } from "react";
import { AdminFoodCard } from "./AdminFoodCard";
import { AdminFoodSkeleton } from "./AdminFoodSkeleton";
import { AddFoodModal } from "./AddFoodModal";

interface AdminFoodsSectionProps {
  selectedCategoryId: string | null;
}

export type FoodCategory = {
  _id: string;
  categoryName: string;
  count: number;
  foods: {
    category: any;
    foodPrice: number;
    foodImage: string;
    image?: string;
    price?: number;
    ingredients?: string;
    foodName: string;
    _id: string;
  }[];
};

export const AdminFoodsSection = ({ selectedCategoryId }: AdminFoodsSectionProps) => {
  const [foodsWithCategories, setFoodsWithCategories] = useState<FoodCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchFoodsWithCategories();
        if (response && response.data) {
          setFoodsWithCategories(response.data);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <AdminFoodSkeleton />;

  const filteredData = selectedCategoryId
    ? foodsWithCategories.filter((cat) => cat._id === selectedCategoryId)
    : foodsWithCategories;

  if (!filteredData || filteredData.length === 0) {
    return <div className="p-6 text-center text-gray-500">Category dotor khool bhq bn ...</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      {filteredData.map((category, index) => {
        const categoryId = category._id || (category.foods[0]?.category?._id);
        
        return (
          <div key={category._id || index} className="flex flex-col gap-4 p-6 bg-background rounded-xl">
            <div className="flex items-center gap-2 text-xl font-semibold">
              <p>{category.categoryName}</p>
              <span className="text-sm bg-gray-100 px-2 py-1 rounded-full">
                {category.count}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <AddFoodModal
                categoryName={category.categoryName}
                categoryId={categoryId} 
              />
              
              {category.foods.map((food) => (
                <div key={food._id} className="flex gap-2">
                  <AdminFoodCard
                    foodImage={food.foodImage || food.image || ""}
                    foodPrice={food.foodPrice || food.price || 0}
                    ingredients={food.ingredients || ""}
                    foodName={food.foodName} 
                    food={food}                  
                  />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
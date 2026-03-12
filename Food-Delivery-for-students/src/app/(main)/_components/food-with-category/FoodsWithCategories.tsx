"use client";

import { FoodCategory } from "@/components/admin/food-menu/AdminFoodsSection";
import { FoodCard } from "@/components/food";
import { fetchFoodsWithCategories } from "@/lib/services/get-foods-with-categories";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

export const  FoodsWithCategories = ({ selectedCategoryId }: { selectedCategoryId: string | null }) => {
  const [foodsWithCategories, setFoodsWithCategories] = useState<FoodCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("Server asaj bn tur huleene uu...");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingText("Asaagui bol tur huleej baigaad refresh hiij uzne uu.");
    }, 4000);
      const fetchData = async () => {
        try {
          const { data, error } = await fetchFoodsWithCategories();
          if (!error) setFoodsWithCategories(data);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
  }, []);

  const filteredCategories = foodsWithCategories
    .filter((category) => category?.foods?.length > 0)
    .filter((category) => {
      if (!selectedCategoryId) return true;
      return category._id === selectedCategoryId;
    });

  if (!filteredCategories.length) return null;

  if (loading) return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="pan-loader">
          <div className="loader-inside"></div>
          <div className="pan-container">
            <div className="pan"></div>
            <div className="handle"></div>
          </div>
          <div className="pan-shadow"></div>
        </div>
       <p className="mt-4 text-white font-medium animate-pulse">
        {loadingText}
      </p>
      </div>
    );

  if (!foodsWithCategories?.length) return null;

  return (
    <div className="flex flex-col gap-12 p-6">
      {filteredCategories.map((category, index) => (
        <div key={category._id || index} className="space-y-8">
          <h2 className="text-3xl font-bold text-white">
            {category?.categoryName}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {category?.foods.map((food) => (
              <motion.div
                key={food?._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <FoodCard
                  foodName={food?.foodName}
                  foodPrice={food?.foodPrice}
                  foodImage={food?.foodImage || ""}
                  ingredients={Array.isArray(food?.ingredients) ? food.ingredients : []}
                  _id={food?._id}
                  category={category}
                />
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

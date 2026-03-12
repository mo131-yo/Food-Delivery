"use client";

import { useEffect, useState } from "react";
import { Category, fetchCategories } from "@/lib/services/get-categories";
import { FoodsWithCategories } from "./FoodsWithCategories";

interface DishesCategoryProps {
  onCategorySelect: (categoryId: string | null) => void;
  selectedCategoryId: string | null;
}

export const FoodCategories = ({ onCategorySelect, selectedCategoryId }: DishesCategoryProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingText] = useState("Server asaj bn tur huleene uu...");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await fetchCategories();
        if (!error && data) {
          setCategories(data);
        }
      } catch (err) {
        console.error("Aldaa garlaa", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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

  return (
    <div>
      <div className="flex flex-col my-8 gap-9">
        <div className="text-3xl font-semibold text-white pl-5">Categories</div>
      <div className="flex gap-3 overflow-x-auto pb-2 pl-5"> 
          <div 
            onClick={() => onCategorySelect(null)}
            className={`flex gap-2 px-6 py-2 border rounded-full cursor-pointer transition-all items-center whitespace-nowrap ${
              selectedCategoryId === null 
                ? "bg-red-500 text-white border-red-500 shadow-lg scale-105" 
                : "bg-white text-black border-gray-200 hover:border-red-300"
            }`}>
            <p className="text-sm font-medium">All dishes</p>
          </div>

          {categories.map((category) => (
            <div 
              key={category._id} 
              onClick={() => onCategorySelect(category._id)}
              className={`flex gap-2 px-6 py-2 border rounded-full cursor-pointer transition-all items-center whitespace-nowrap ${
                selectedCategoryId === category._id 
                  ? "bg-red-500 text-white border-red-500 shadow-lg scale-105" 
                  : "bg-white text-black border-gray-200 hover:border-red-300"
              }`}
            >
              <p className="text-sm font-medium">{category.categoryName}</p>
            </div>
          ))}
        </div>
      </div>

      <FoodsWithCategories selectedCategoryId={selectedCategoryId} />
    </div>
  );
};
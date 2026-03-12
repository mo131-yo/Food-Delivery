"use client";

import { useEffect, useState } from "react";
import { fetchCategoriesWithCount } from "@/lib";
import { DishesCategorySkeleton } from "./DishesCategorySkeleton";
import { AddCategoryModal } from "./AddCategoryModal";
import { deleteCategoryService } from "@/lib/services/delete-category";
import { toast } from "sonner";
import { X } from "lucide-react";

export type CategoryWithCount = {
  _id: string;
  categoryName: string;
  count: number;
};

interface DishesCategoryProps {
  onCategorySelect: (categoryId: string | null) => void;
  selectedCategoryId: string | null;
}

export const DishesCategory = ({ onCategorySelect, selectedCategoryId }: DishesCategoryProps) => {
  const [categories, setCategories] = useState<CategoryWithCount[]>([]);

  const fetchData = async () => {
    try {
      const { data } = await fetchCategoriesWithCount();
      setCategories(data || []);
    } catch (err) {
      console.error("Fetch categories error:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!categories.length) return <DishesCategorySkeleton />;

  const allDishesCount = categories.reduce((acc, cat) => acc + (cat.count || 0), 0);

  const handleDeleteCategory = (id: string, name: string) => {
    toast.warning(`${name} angilal ustagah uu`, {
      duration: Infinity,
      action: {
        label: "Delete",
        onClick: async () => {
          toast.dismiss();
          toast.promise(deleteCategoryService(id), {
            loading: 'Loading...',
            success: () => {
              setTimeout(() => window.location.reload(), 800);
              return `${name} amjilttai delete hiilee.`;
            },
            error: (err: any) => `Aldaa: ${err.response?.data?.message || "Aldaa garlaa"}`,
          });
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => toast.dismiss(),
      },
    });
  };

  return (
    <div className="flex flex-col gap-4 p-6 bg-background rounded-xl">
      <p className="text-xl font-semibold">Dishes category</p>
      <div className="flex flex-wrap gap-3">
        <div 
          onClick={() => onCategorySelect(null)}
          className={`flex gap-2 px-4 py-2 border rounded-full cursor-pointer transition-all items-center ${
            selectedCategoryId === null ? "bg-red-500 text-white border-red-500" : "bg-white text-black border-gray-200"
          }`}
        >
          <p className="text-sm font-medium">All dishes</p>
          <p className={`text-[10px] rounded-full px-2 py-[2px] font-semibold ${
            selectedCategoryId === null ? "bg-white text-red-500" : "bg-black text-white"
          }`}>
            {allDishesCount}
          </p>
        </div>

        {categories.map((category) => (
          <div 
            key={category._id} 
            onClick={() => onCategorySelect(category._id)}
            className={`group relative flex gap-2 px-4 py-2 border rounded-full cursor-pointer transition-all items-center ${
              selectedCategoryId === category._id ? "bg-red-500 text-white border-red-500" : "bg-white text-black border-gray-200"
            }`}
          >
            <p className="text-sm font-medium">{category.categoryName}</p>
            <p className={`text-[10px] rounded-full px-2 py-[2px] font-semibold ${
              selectedCategoryId === category._id ? "bg-white text-red-500" : "bg-black text-white"
            }`}>
              {category.count}
            </p>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteCategory(category._id, category.categoryName);
              }}
              className="hover:text-red-600 hover:border-red-600">
               <X size={14} className="w-4 h-4 rounded-xl border border-black" />
            </button> 
          </div>
        ))}

        <AddCategoryModal />
      </div>
    </div>
  );
};
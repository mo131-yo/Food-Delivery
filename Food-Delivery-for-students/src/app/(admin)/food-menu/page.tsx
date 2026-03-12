"use client";

import { useState } from "react";
import { AdminFoodsSection } from "@/components/admin/food-menu/AdminFoodsSection";
import { DishesCategory } from "@/components/admin/food-menu/DishesCategory";

export default function AdminFoodMenu() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  return (
    <div className="w-full bg-secondary flex flex-col gap-5 h-full p-6">
      <DishesCategory 
        onCategorySelect={setSelectedCategoryId} 
        selectedCategoryId={selectedCategoryId} 
      />
      <AdminFoodsSection selectedCategoryId={selectedCategoryId} />
    </div>
  );
}
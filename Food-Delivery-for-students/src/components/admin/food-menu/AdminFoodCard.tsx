"use client"; // State ашиглаж байгаа тул

import { useState } from "react";
import { FoodDetailModal } from "@/components/food";
import { EditFoodModal } from "./EditFoodModal";

type AdminFoodCardProps = {
  foodImage: string;
  foodName: string;
  ingredients: any; // Backend-ээс массив эсвэл string ирж болох тул
  foodPrice: number;
  food: any;
};

export const AdminFoodCard = ({
  foodImage,
  foodName,
  ingredients,
  foodPrice,
  food
}: AdminFoodCardProps) => {
  // Модалын төлөвийг удирдах state
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="border rounded-[20px] p-4 border-border bg-background flex flex-col gap-5 min-w-full relative">
      <div
        onClick={onToggleModal}
        className="bg-cover bg-center w-full h-[129px] rounded-xl flex justify-end items-end p-2 cursor-pointer transition-opacity hover:opacity-90"
        style={{
          backgroundImage: `url(${foodImage || "/cake.png"})`,
        }}
      >
        <div onClick={(e) => e.stopPropagation()}> 
          <EditFoodModal food={food} />
        </div>
      </div>

      <div className="flex flex-col gap-2 cursor-pointer" onClick={onToggleModal}>
        <div className="flex justify-between items-center">
          <p className="text-[#EF4444] text-sm font-medium">{foodName}</p>
          <p className="text-xs font-bold">₮{foodPrice.toLocaleString()}</p>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {Array.isArray(ingredients) ? ingredients.join(', ') : ingredients}
        </p>
      </div>
        <FoodDetailModal
          food={food}
          isModalOpen={isModalOpen}
          onToggleModal={onToggleModal}
        />
    </div>
  );
};
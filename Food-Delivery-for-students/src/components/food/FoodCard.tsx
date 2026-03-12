"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { FoodDetailModal } from "./FoodDetailModal";
import { MouseEventHandler, useContext, useState } from "react";
import { Plus, Heart, Clock } from "lucide-react";
import { Button } from "../ui/button";
import { CartContext } from "@/app/(main)/context";
import { AddToCartAlert } from "./AddToCartAlert";
import { formatMoney } from "@/lib";

type FoodCardProps = {
  foodName: string;
  foodPrice: number;
  ingredients: string[];
  foodImage: string;
  _id: string;
  category: any;
};

export const FoodCard = ({
  foodName,
  foodPrice,
  ingredients,
  foodImage,
  _id,
  category,
}: FoodCardProps) => {
  const { addItem } = useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const food = { _id, foodName, foodPrice, ingredients, foodImage, category };
  const formattedPrice = formatMoney(foodPrice);

  const onToggleModal = () => setIsModalOpen(!isModalOpen);

  const handleAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    addItem({ food, quantity: 1 });
    setShowAlert(true);
  };

  const getFullImageUrl = (src: string) => {
    if (!src) return "/cake.png";
    if (src.startsWith("http")) return src;
    return `https://res.cloudinary.com/dzljgphud/image/upload/${src}`;
  };

  return (
    <div className="w-full">
      <article 
        onClick={onToggleModal}
        className="group relative w-full bg-white rounded-[32px] overflow-hidden shadow-sm transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0,1)] hover:scale-105 hover:shadow-2xl cursor-pointer"
      > 
        <div className="absolute top-5 left-5 right-5 flex justify-between items-center z-30  transition-all duration-300 translate-y-[-10px] group-hover:translate-y-0">
          {/* <button className="p-2 bg-black/50 backdrop-blur-md rounded-full hover:bg-white transition-colors ">
            <Heart className="w-5 h-5 text-white hover:text-red-500 transition-colors" />
          </button> */}
          <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full">
            <Clock className="w-4 h-4 text-white" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">45 min</span>
          </div>
        </div>

        <div className="relative h-64 w-full overflow-hidden">
          <Image
            src={getFullImageUrl(foodImage)}
            alt={foodName}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:opacity-90"
          />
          
          <Button
            className="absolute bottom-5 right-5 bg-white hover:bg-red-500 text-red-500 hover:text-white rounded-full w-12 h-12 shadow-xl"
            onClick={handleAddToCart}>
            <Plus className="w-6 h-6" />
          </Button>
        </div>

        <div className="p-6 bg-white transition-colors duration-300 group-hover:bg-slate-50">
          <div className="flex justify-between items-start gap-2 mb-2">
            <h3 className="text-xl font-bold text-gray-900 leading-tight">
              {foodName}
            </h3>
            <p className="text-lg font-bold text-red-500 whitespace-nowrap">
              {formattedPrice} ₮
            </p>
          </div>
          
          <p className="text-sm text-gray-500 line-clamp-2 font-light">
            {Array.isArray(ingredients) ? ingredients.join(", ") : ingredients}
          </p>
          
          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
             <span className="text-xs text-gray-400">
               by <span className="font-bold text-gray-700">YamYam</span>
             </span>
          </div>
        </div>
      </article>

      <FoodDetailModal
        food={food}
        isModalOpen={isModalOpen}
        onToggleModal={onToggleModal}
      />
      <AddToCartAlert isVisible={showAlert} onHide={() => setShowAlert(false)} />
    </div>
  );
};
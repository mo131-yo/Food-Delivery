import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FoodOrderItem } from "@/types";
import { ChevronDown, UtensilsCrossed } from "lucide-react";
import Image from "next/image";
import React from "react";

type FoodDetailPopoverProps = {
  foodOrderItems: FoodOrderItem[];
};

const isSingleFood = (count: number) => {
  if (count === 1) return `${count} food`;
  return `${count} foods`;
};

  const FoodDetailPopover = ({ foodOrderItems }: FoodDetailPopoverProps) => {
    
  const count = foodOrderItems?.length || 0;


  const getFoodLabel = (count: number) => {
  return count === 1 ? "1 food" : `${count} foods`;
};
  
 return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center justify-between w-40 h-10 px-4 border-none shadow-none bg-inherit hover:bg-gray-100"
        >
          <span className="font-medium text-sm">{getFoodLabel(count)}</span>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </Button>
      </PopoverTrigger>

      {count > 0 && (
        <PopoverContent
          align="start"
          className="flex flex-col gap-3 p-4 w-64 shadow-xl border border-gray-100 rounded-xl"
          alignOffset={-16}
        >
          {foodOrderItems.map(({ food, quantity }, index) => (
            <div key={index} className="flex gap-3 items-center text-sm group">
              <div className="relative w-10 h-10 overflow-hidden rounded-md bg-gray-50 border border-gray-100 flex-shrink-0">
                {food.foodImage ? (
                  <Image
                    src={food.foodImage}
                    alt={food.foodName || "Food item"}
                    fill // layout="fill" нь хуучирсан тул fill ашиглахыг зөвлөе
                    className="object-cover transition-transform group-hover:scale-110"
                    sizes="40px" // Гүйцэтгэлд сайн
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <UtensilsCrossed className="w-5 h-5 text-gray-300" />
                  </div>
                )}
              </div>
              
              <div className="flex flex-1 flex-col min-w-0">
                <span className="font-semibold text-gray-800 truncate">
                  {food.foodName}
                </span>
                <span className="text-xs text-gray-400">
                  Нэгж үнэ: {food.foodPrice?.toLocaleString()}₮
                </span>
              </div>
              
              <div className="font-bold text-red-500 bg-red-50 px-2 py-1 rounded">
                x{quantity}
              </div>
            </div>
          ))}
        </PopoverContent>
      )}
    </Popover>
  );
};

export default FoodDetailPopover;

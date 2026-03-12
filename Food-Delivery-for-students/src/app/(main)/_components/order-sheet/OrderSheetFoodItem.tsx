import { SidebarDashLine } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Food } from "@/types";
import { CircleX, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";
import { CartContext } from "../../context";
import { formatMoney } from "@/lib";

export const OrderSheetFoodItem = ({
  food,
  quantity,
}: {
  food: Food;
  quantity: number;
}) => {
  const { addQuantity, subtractQuantity, removeItem } = useContext(CartContext);

  const imageUrl = food?.foodImage?.startsWith("http")
    ? food.foodImage
    : food?.foodImage 
      ? `https://res.cloudinary.com/dzljgphud/image/upload/${food.foodImage}`
      : "/cake.png";

  const handleAddQuantity = () => {
    addQuantity(food._id);
  };

  const handleSubtractQuantity = () => {
    subtractQuantity(food._id);
  };

  const handleRemoveItem = () => {
    removeItem(food._id);
  };
  const formattedPrice = formatMoney(food?.foodPrice * quantity);

  return (
    <>
      <div className="flex gap-3">
        <div className="w-[124px] h-[120px] relative rounded-lg overflow-hidden">
          <Image
            className="fill"
            src={imageUrl}
            objectFit="cover"
            layout="fill"
            alt={food?.foodName}
          />
        </div>

        <div className="w-[300px] flex flex-col justify-between">
          <div className="flex">
            <div className="w-full">
              <h3 className="font-bold text-red-500">{food?.foodName}</h3>
              <div className="flex flex-wrap">
                <p className="text-xs font-light">{food.ingredients}</p>
              </div>
            </div>
            <CircleX
              strokeWidth={0.5}
              size={50}
              color="red"
              onClick={handleRemoveItem}
              className="cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button variant="ghost" onClick={handleSubtractQuantity}>
                <Minus />
              </Button>

              <div className="text-lg font-semibold">{quantity}</div>

              <Button variant="ghost" onClick={handleAddQuantity}>
                <Plus />
              </Button>
            </div>

            <h4 className="font-bold">{formattedPrice}₮</h4>
          </div>
        </div>
      </div>
      <SidebarDashLine />
    </>
  );
};

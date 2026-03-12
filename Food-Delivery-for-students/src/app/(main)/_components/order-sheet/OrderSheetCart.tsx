import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderSheetFoodItem } from "./OrderSheetFoodItem";
import { OrderSheetEmptyCard } from "./OrderSheetEmptyCard";
import { useContext } from "react";
import { CartContext } from "../../context";
import { OrderAddress } from "./OrderAddress";

export const OrderSheetCart = () => {
  const { cartData } = useContext(CartContext);

 return (
    <Card className="h-[600px] flex flex-col border-none shadow-none bg-white overflow-hidden"> 
      <CardHeader className="p-4 flex-shrink-0">
        <CardTitle className="text-white">My cart</CardTitle>
      </CardHeader>
      <CardContent className="p-4 flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
        {cartData?.length ? (
          <div className="flex flex-col gap-4 w-full">
            {cartData.map((item) => (
              <OrderSheetFoodItem
                key={item.food._id}
                food={item.food}
                quantity={item.quantity}
              />
            ))}
            <OrderAddress />
          </div>
        ) : (
          <OrderSheetEmptyCard />
        )}
      </CardContent>
    </Card>
  );
};
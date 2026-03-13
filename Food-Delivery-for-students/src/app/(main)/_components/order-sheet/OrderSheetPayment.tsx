"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SidebarDashLine } from "@/components/icons";
import { useContext, useState } from "react";
import { CartContext, UserContext } from "../../context";
import { createOrder, FoodOrderPayload, formatMoney } from "@/lib";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const OrderSheetPayment = ({ openModal }: { openModal: () => void }) => {
  const { totalPrice, cartData, clearCart } = useContext(CartContext);
  const { user, loading } = useContext(UserContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const totalPriceWithFee = Number(totalPrice) + 5000;

const handleCreateOrder = async () => {
    if (loading) return;

    if (!user) {
      toast.error("Ta ehleed logiin esvel burtguulne uu");
      router.push("/sign-up");
      return;
    }

    if (!user.address || user.address === "Address todorhoigui") {
      toast.error("Haygaa oruulna uu, Haragdahgui bol scrolldoj 'Deliver here' tuvchiig darj hadgal");
      return;
    }

    if (!cartData || cartData.length === 0) {
      toast.error("sags hooson bn");
      return;
    }

    setIsSubmitting(true);


const payload = {
  foods: cartData.map((item) => {
    console.log("Item Food ID check:", item.food?._id); 

    return {
      foodId: item.food?._id, 
      quantity: item.quantity,
    };
  }),
  address: user.address,
  totalPrice: totalPriceWithFee,
};

  console.log("backend ruu yvuulsn ugugdul", payload);

    try {
    const result = await createOrder(payload as any);
    if (result) {
      toast.success("Order amjilttai");
      clearCart();
      openModal();
    }
  } catch (error: any) {
    toast.error(error.message);
  } finally {
    setIsSubmitting(false);
  }
};

return (
    <Card className="mt-6 border-slate-100 shadow-sm">
      <CardHeader className="p-4">
        <CardTitle className="text-lg">Payment info</CardTitle>
      </CardHeader>

      <CardContent className="p-4 space-y-3">
        <div className="flex justify-between text-sm">
          <p className="text-[#71717A] font-light">Items</p>
          <p className="font-semibold">{formatMoney(Number(totalPrice))}₮</p>
        </div>

        <div className="flex justify-between text-sm">
          <p className="text-[#71717A] font-light">Shipping</p>
          <p className="font-semibold">{formatMoney(5000)}₮</p>
        </div>

        <div className="py-2">
          <SidebarDashLine />
        </div>

        <div className="flex justify-between items-center">
          <p className="text-[#71717A] font-medium">Total</p>
          <p className="font-bold text-xl text-red-500">
            {formatMoney(totalPriceWithFee)}₮
          </p>
        </div>
      </CardContent>

      <CardFooter className="p-4">
        <Button
          size="lg"
          disabled={loading || isSubmitting || cartData.length === 0}
          className="w-full bg-red-500 hover:bg-red-600 rounded-full transition-all"
          onClick={handleCreateOrder}
        >
          {loading ? "Checking auth..." : isSubmitting ? "Processing..." : "Checkout"}
        </Button>
      </CardFooter>
    </Card>
  );
};
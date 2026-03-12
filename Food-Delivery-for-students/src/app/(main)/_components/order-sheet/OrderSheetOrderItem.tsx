import { Badge } from "@/components/ui/badge";
import { formatMoney } from "@/lib";
import { Map, Soup, Timer } from "lucide-react";

export const OrderSheetOrderItem = ({ order }: { order: any }) => {

  const date = new Date(order.createdAt).toLocaleDateString();

   return (
    <div className="space-y-3 border-b pb-4 mb-4 last:border-0">
      <div className="flex items-center justify-between">
        <h4 className="font-bold">
          {order.totalPrice.toLocaleString()}₮ (#{order._id.slice(-5)})
        </h4>
        <Badge className="bg-red-100 text-red-500 hover:bg-red-100 border-none rounded-full">
          {order.status}
        </Badge>
      </div>

      {order.foods?.map((item: any, index: number) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Soup strokeWidth={1} size={16} />
            <p className="text-muted-foreground text-xs">
              {item.food?.foodName || "Unknown dish"} 
            </p>
          </div>
          <p className="text-muted-foreground text-xs">x {item.quantity}</p>
        </div>
      ))}

      <div className="flex items-center gap-2 text-muted-foreground">
        <Timer size={16} strokeWidth={1} />
        <p className="text-xs">{new Date(order.createdAt).toLocaleDateString()}</p>
      </div>

      <div className="flex items-center gap-2 text-muted-foreground">
        <Map size={16} strokeWidth={1} />
        <p className="text-xs truncate">{order.address}</p>
      </div>
    </div>
  );
};
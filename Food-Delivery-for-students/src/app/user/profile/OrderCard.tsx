import { Card } from "@/components/ui/card";
import { ShoppingBag, ChevronRight } from "lucide-react";

export const OrderCard = ({ order, onClick }: { order: any; onClick: () => void }) => (
  <Card 
    onClick={onClick}
    className="p-5 border-none shadow-sm bg-white hover:shadow-md hover:-translate-y-1 transition-all flex justify-between items-center cursor-pointer group rounded-2xl"
  >
    <div className="flex items-center space-x-4">
      <div className="p-4 bg-orange-50 rounded-2xl text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors">
        <ShoppingBag size={24} />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <p className="font-black text-gray-900 uppercase text-sm">#{order._id.slice(-6)}</p>
          <span className="text-[9px] px-2 py-0.5 bg-gray-100 rounded text-gray-500 font-bold uppercase">
            {order.foodOrderItems?.length || 0} Category
          </span>
        </div>
        <p className="text-xs text-gray-400 font-bold">{new Date(order.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
    <div className="flex items-center space-x-8">
      <div className="text-right">
        <p className="font-black text-gray-900 text-lg">{order.totalPrice?.toLocaleString()}₮</p>
        <span className={`text-[10px] font-black uppercase tracking-tighter ${
          order.status === "Delivered" ? "text-green-500" : "text-orange-500"
        }`}>
          {order.status}
        </span>
      </div>
      <ChevronRight size={20} className="text-gray-300 group-hover:text-red-500 transition-colors" />
    </div>
  </Card>
);
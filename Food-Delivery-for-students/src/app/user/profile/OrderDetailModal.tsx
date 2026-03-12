import { Card } from "@/components/ui/card";
import { updateOrder } from "@/lib";
import { X, Clock, MapPin, UtensilsCrossed, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export const OrderDetailModal = ({ order, onClose , onRefresh}: { order: any; onClose: () => void, onRefresh?: () => void }) => {
  const [loading, setLoading] = useState(false);

  const handleCancelOrder = async () => {
    if (!confirm("Ta zahialgaa tsutslah uu?")) return;
    
    setLoading(true);
    try {
      const updated = await updateOrder(order._id, "Cancelled");
      if (updated) {
        alert("Order amjilttai cancelled");
        if (onRefresh) onRefresh();
        onClose();
      }
    } catch (error) {
      alert("Aldaa garlaa");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md" 
        onClick={onClose}
      ></div>

      <Card className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        <div className="p-8 border-b flex justify-between items-center bg-gray-50/50">
          <div className="min-w-0 flex-1"> 
            <h3 className="font-black text-xl text-gray-900 truncate">Delgerngui Order</h3>
            <p className="text-xs text-gray-400 font-bold uppercase mt-1 truncate">ID: #{order._id}</p>
          </div>
          <button 
            onClick={onClose} 
            className="p-3 hover:bg-gray-200 rounded-2xl transition-colors text-gray-500 ml-4"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto overflow-x-hidden custom-scrollbar">
          
          <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm gap-2">
            <div className="flex items-center text-gray-500 font-bold text-[10px] md:text-xs">
                <Clock size={16} className="mr-2 text-red-500 shrink-0" /> 
                {new Date(order.createdAt).toLocaleString()}
            </div>
            <span className="bg-orange-500 text-white px-3 py-1.5 rounded-xl text-[10px] font-black uppercase shadow-lg shadow-orange-200 shrink-0">
                {order.status}
            </span>
          </div>

          <div className="space-y-4">
            <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">
              Zahialsan hoolnuud
            </p>
            <div className="space-y-3">
              {order.foodOrderItems?.map((item: any, idx: number) => {
                const food = item.food || {}; 
                const name = food.foodName ;
                const price = food.foodPrice;
                const quantity = item.quantity || 1;
                const image = food.foodImage;

                return (
                  <div key={idx} className="flex items-center gap-4 bg-gray-50 p-3 rounded-2xl border border-transparent hover:border-gray-200 transition-all group overflow-hidden">
                    <div className="relative h-16 w-16 rounded-xl overflow-hidden shadow-sm flex-shrink-0 bg-white">
                      {image ? (
                        <Image src={image} alt={name} fill className="object-cover" sizes="64px" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <UtensilsCrossed className="w-6 h-6 text-gray-300" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-800 text-sm truncate">{name}</p>
                      <p className="text-xs text-gray-400 font-semibold">
                        {quantity} ш x {price.toLocaleString()}₮
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="font-black text-gray-900 text-sm">
                        {(price * quantity).toLocaleString()}₮
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 bg-red-50/50 rounded-[1.5rem] border border-red-100 overflow-hidden">
            <MapPin size={24} className="text-red-500 shrink-0 mt-1" />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Delivery Locationг</p>
              <p className="text-sm text-gray-700 font-bold leading-relaxed break-words">
                {order.address || "Хаяг тодорхойгүй байна"}
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-dashed flex justify-between items-center gap-4">
            <span className="font-bold text-gray-400 uppercase text-xs tracking-widest shrink-0">Total price</span>
            <span className="text-2xl md:text-3xl font-black text-red-600 tracking-tight truncate">
                {order.totalPrice?.toLocaleString()}₮
            </span>
          </div>
          <div className="pt-6 border-t border-dashed space-y-4"> 

            {order.status !== "Cancelled" && (
              <button
                onClick={handleCancelOrder}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-red-50 text-gray-500 hover:text-red-600 py-4 rounded-2xl font-bold transition-all duration-200 border border-transparent hover:border-red-100"
              >
                <Trash2 size={18} />
                {loading ? "Түр хүлээнэ үү..." : "Захиалга цуцлах"}
              </button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};
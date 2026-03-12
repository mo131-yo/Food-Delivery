"use client";

import { useContext, useState } from "react";
import { UserContext } from "@/app/(main)/context";
import { Card } from "@/components/ui/card";
import { Mail, ShieldCheck, ShoppingBag, Loader2, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Windmill } from "./Wind";
import { useOrders } from "@/app/hooks/user-order";
import { OrderCard } from "./OrderCard";
import { OrderDetailModal } from "./OrderDetailModal";

export default function ProfilePage() {
  const { user } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState<"info" | "orders">("info");
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const router = useRouter();
  
  const { orders, loading } = useOrders(activeTab);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 relative">
      <button onClick={() => router.push("/")} className="absolute top-6 left-6 z-30 flex items-center gap-2 bg-black text-white px-4 py-2 rounded-2xl text-sm font-semibold">
        <ChevronLeft size={18} /> Return
      </button>

      <div className="pt-10">
        <div className="border rounded-2xl border-black">
          <Windmill />
        </div>
      </div>

      <div className="flex space-x-2 pt-20 border-b border-gray-100">
        {["info", "orders"].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab as any)} 
            className={`pb-4 px-8 text-sm font-bold transition-all ${activeTab === tab ? "border-b-4 border-red-500 text-red-500" : "text-gray-400"}`}
          >
            {tab === "info" ? "Information" : "Order history"}
          </button>
        ))}
      </div>

              {activeTab === "info" ? (
            <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-gray-50/50 p-8 rounded-[2rem]">
              <h3 className="font-bold mb-6 text-gray-800 text-lg">User Information</h3>
              <div className="space-y-6 font-semibold text-gray-600">
                
                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-50">
                  <div className="p-3 bg-red-50 rounded-xl text-red-500 shrink-0">
                    <Mail size={20}/>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">Email</p>
                    <p className="text-gray-800 truncate">
                      {user?.email || "Email burtgegdeegui bn."}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-50">
                  <div className="p-3 bg-green-50 rounded-xl text-green-500 shrink-0">
                    <ShieldCheck size={20}/>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">Status</p>
                    <p className="text-gray-800">
                      {user?.role === "Admin" ? "Admin" : "Idevhtei hereglegch"}
                    </p>
                  </div>
                </div>

              </div>
            </Card>
          ) : (
        <div className="space-y-4">
          {loading ? (
            <div className="flex justify-center p-20"><Loader2 className="animate-spin text-red-500" /></div>
          ) : orders.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
              <ShoppingBag className="mx-auto text-gray-300 mb-4" size={48} />
              <p className="text-gray-500 font-bold">tand odoogoor order bhq bn</p>
            </div>
          ) : (
            orders.map((order) => <OrderCard key={order._id} order={order} onClick={() => setSelectedOrder(order)} />)
          )}
        </div>
      )}

      {selectedOrder && <OrderDetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />}
    </div>
  );
}
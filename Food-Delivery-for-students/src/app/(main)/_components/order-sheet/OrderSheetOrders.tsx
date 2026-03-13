"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderSheetOrderItem } from ".";
import { useState, useEffect } from "react";
import { getMyOrders } from "@/lib/services/get-order"; 
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const OrderSheetOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5; 

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data: any = await getMyOrders(currentPage, limit); 
        console.log("Backend Response:", data);
        if (data && data.orders) {
          setOrders(data.orders);
          setTotalPages(data.totalPages || 1);
        } else if (Array.isArray(data)) {
          setOrders(data);
        }
      } catch (error: any) {
        console.error("Failed to fetch orders:", error);
        toast.error("Order-iin tuuh tataj chadsangui");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [currentPage]);

  return (
    <Card className="h-[87%] flex flex-col">
      <CardHeader className="p-4 shrink-0">
        <CardTitle>Order history</CardTitle>
      </CardHeader>
      
      <CardContent className="p-4 space-y-6 overflow-y-auto flex-1">
        {loading ? (
          <p className="text-center text-muted-foreground italic">Loading ...</p>
        ) : orders.length > 0 ? (
          orders.map((order: any) => (
            <OrderSheetOrderItem key={order._id} order={order} />
          ))
        ) : (
          <p className="text-center text-muted-foreground">Order oldsongui</p>
        )}
      </CardContent>

      {totalPages > 1 && (
        <div className="p-4 border-t flex items-center justify-between bg-white shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1 || loading}
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Prev
          </Button>
          
          <span className="text-sm font-medium">
            {currentPage} / {totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || loading}>
            Next <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      )}
    </Card>
  );
};
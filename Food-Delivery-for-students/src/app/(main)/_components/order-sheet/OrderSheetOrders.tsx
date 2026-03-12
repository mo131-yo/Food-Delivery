"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderSheetOrderItem } from ".";
import { useState, useEffect } from "react";
import { getMyOrders } from "@/lib/services/get-order"; 
import { toast } from "sonner";
import { Button } from "@/components/ui/button"; // Shadcn button
import { ChevronLeft, ChevronRight } from "lucide-react";

export const OrderSheetOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Pagination-д зориулсан state-үүд
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5; 

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        // API-руу одоогийн хуудсыг дамжуулна
        const data: any = await getMyOrders(currentPage, limit); 
        console.log("Backend Response:", data);
        // Backend-ээс { orders: [], totalPages: 5 } ирж байна гэж үзвэл:
        if (data && data.orders) {
          setOrders(data.orders);
          setTotalPages(data.totalPages || 1);
        } else if (Array.isArray(data)) {
          // Хэрэв шууд массив ирдэг бол хуучин хэвээрээ
          setOrders(data);
        }
      } catch (error: any) {
        console.error("Failed to fetch orders:", error);
        toast.error("Захиалгын түүх татаж чадсангүй");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [currentPage]); // currentPage өөрчлөгдөх бүрт fetch хийнэ

  return (
    <Card className="h-[87%] flex flex-col">
      <CardHeader className="p-4 shrink-0">
        <CardTitle>Order history</CardTitle>
      </CardHeader>
      
      <CardContent className="p-4 space-y-6 overflow-y-auto flex-1">
        {loading ? (
          <p className="text-center text-muted-foreground italic">Уншиж байна...</p>
        ) : orders.length > 0 ? (
          orders.map((order: any) => (
            <OrderSheetOrderItem key={order._id} order={order} />
          ))
        ) : (
          <p className="text-center text-muted-foreground">Захиалга олдсонгүй</p>
        )}
      </CardContent>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="p-4 border-t flex items-center justify-between bg-white shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1 || loading}
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Өмнөх
          </Button>
          
          <span className="text-sm font-medium">
            {currentPage} / {totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || loading}
          >
            Дараах <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      )}
    </Card>
  );
};
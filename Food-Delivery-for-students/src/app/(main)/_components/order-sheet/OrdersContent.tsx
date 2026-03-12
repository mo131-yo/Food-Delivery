"use client";
import { SetStateAction, useEffect, useState } from "react";
import { columns } from "@/components/admin/orders/columns";
import { DataTable } from "@/components/admin/orders/data-table";
import TableSkeleton from "@/components/admin/orders/TableSkeleton";
import { fetchAllOrders } from "@/lib/services/get-all-order";
import { AllFoodOrders } from "@/types";
import { DynamicPagination } from "@/components/admin/food-menu/Dynamicpagination";
import { useSearchParams } from "next/navigation";

export default function OrdersContent() {
  const [foodOrders, setFoodOrders] = useState<AllFoodOrders[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  
  const limit = 3; 

  const fetchData = async (page: number) => {
    setLoading(true);
    try {
      const data = await fetchAllOrders(page, limit);
      setFoodOrders(data?.allFoodOrders || []);
      setTotalCount(data?.count || 0);
    } catch (error) {
      console.error("Дата татахад алдаа гарлаа:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil(totalCount / limit);

  if (loading) return <TableSkeleton />;

  return (
    <div className="py-6 pl-6 pr-10 space-y-4">
      <DataTable
        columns={columns}
        data={foodOrders} setFoodOrders={function (value: SetStateAction<AllFoodOrders[] | undefined>): void {
          throw new Error("Function not implemented.");
        } }      />
      
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <DynamicPagination 
            totalPages={totalPages} 
          />
        </div>
      )}
    </div>
  );
}
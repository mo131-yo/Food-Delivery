import OrdersContent from "@/app/(main)/_components/order-sheet/OrdersContent";
import TableSkeleton from "@/components/admin/orders/TableSkeleton";
import { Suspense } from "react";

export default function AdminOrders() {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <OrdersContent />
    </Suspense>
  );
}
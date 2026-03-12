// @/hooks/use-orders.ts
import { useState, useEffect } from "react";
import { api } from "@/lib/axios-instance";

export const useOrders = (activeTab: string) => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMyOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
      const res = await api.get("/foods-order/all-order", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data.data || []);
    } catch (error) {
      console.error("Fetch Orders Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "orders") fetchMyOrders();
  }, [activeTab]);

  return { orders, loading, refreshOrders: fetchMyOrders };
};
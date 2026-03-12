"use client";

import React, { useState, useContext } from 'react'
import { Button } from "@/components/ui/button";
import { updateCurrentUser } from '@/lib/services/update-current-user'; 
import { toast } from 'sonner';
import { UserContext } from "../../context"; 
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const LocationPicker = dynamic(() => import('./LocationPicker'), { 
  ssr: false,
  loading: () => <div className="h-[300px] w-full bg-slate-100 animate-pulse rounded-xl" />
});

export const OrderAddress = () => {
  const { user, setUser } = useContext(UserContext); 
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const router = useRouter();

  const handleLocationSelect = (lat: number, lng: number) => {
    setCoords({ lat, lng });
  };

  const handleUserAddressUpdate = async () => {
    try {
      if (!coords) {
        toast.error("Location oo songono uu.");
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Ta ehleed login hiine uu");
        router.push("/login");
        return;
      }

      const locationData = JSON.stringify({
        lat: coords.lat,
        lng: coords.lng,
        label: "Map deer oruulna uu."
      });
      
      await updateCurrentUser({ 
        address: locationData 
      });

      setUser?.((prev: any) => (prev ? { ...prev, address: locationData } : prev));
      toast.success("Location successfull saved");
      
    } catch (error: any) {
      toast.error(error.message || "Aldaa garlaa");
    }
  };

  return (
    <div className="flex flex-col gap-6 mt-6 border-t pt-6 bg-white p-4 rounded-2xl shadow-sm text-black">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">Delivery Location</h2>
        {coords && (
          <span className="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-500 uppercase font-mono">
            GPS: {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}
          </span>
        )}
      </div>

      <LocationPicker onLocationSelect={handleLocationSelect} />

      <p className="text-sm text-slate-500 italic">
        * Location oo Map deer oruulj "Delivery here" deer darna uu.
      </p>

      <div className="flex justify-end gap-3">
        <Button 
          onClick={handleUserAddressUpdate} 
          disabled={!coords}
          className="bg-red-500 hover:bg-red-600 text-white rounded-full px-10 py-6 text-lg w-full md:w-auto shadow-lg transition-all active:scale-95"
        >
          Delivery here
        </Button>
      </div>
    </div>
  );
};
"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronRight, MapPin, X } from "lucide-react";
import {
  ChangeEventHandler,
  MouseEventHandler,
  useContext,
  useEffect,
  useState,
} from "react";
import { UserContext } from "../../context";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";  
import { toast } from "sonner";
import { updateCurrentUser } from "@/lib/services/update-current-user";
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const LocationPicker = dynamic(() => import("../order-sheet/LocationPicker"), { 
  ssr: false,
  loading: () => <div className="h-[250px] w-full bg-slate-100 animate-pulse rounded-xl" />
});

export const HeaderAddressSelectButton = () => {
  const { user, setUser } = useContext(UserContext);
  const [userLocationText, setUserLocationText] = useState("");
  const [addressDialogOpen, setAddressDialogOpen] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (user?.address) {
      try {
        const parsed = JSON.parse(user.address);
        setUserLocationText(parsed.label || "");
        setCoords({ lat: parsed.lat, lng: parsed.lng });
      } catch (e) {
        setUserLocationText(user.address);
      }
    }
  }, [user?.address]);

  const handleLocationSelect = (lat: number, lng: number) => {
    setCoords({ lat, lng });
  };

  const handleUserAddressUpdate = async () => {
    try {
      if (!coords) {
        toast.error("Map deer Location oo oruulna uu.");
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Ta ehleed Login hiine uu.");
        setAddressDialogOpen(false);
        router.push("/login");
        return;
      }

      const locationData = JSON.stringify({
        lat: coords.lat,
        lng: coords.lng,
        label: userLocationText 
      });
      
      await updateCurrentUser({ address: locationData });

      setUser?.((prev: any) => (prev ? { ...prev, address: locationData } : prev));
      
      toast.success("Address successfull saved");
      setAddressDialogOpen(false);
      
    } catch (error: any) {
      toast.error(error.message || "Aldaa garlaa");
    }
  };

  const handleUserAddressClear: MouseEventHandler<SVGSVGElement> = async (event) => {
    event.stopPropagation();
    try {
      await updateCurrentUser({ address: "" });
      setUserLocationText("");
      setCoords(null);
      setUser?.((prev: any) => (prev ? { ...prev, address: "" } : prev));
      toast.success(`Address cleared.`);
    } catch (err) {
      toast.error("Aldaa garlaa");
    }
  };

  const renderCurrentAddress = () => {
    if (user?.address) {
      let displayValue = "";
      try {
        const parsed = JSON.parse(user.address);
        displayValue = parsed.label || "Location saved";
      } catch {
        displayValue = user.address;
      }

      return (
        <div className="flex items-center justify-between w-full">
          <p className="text-sm text-black truncate w-52 text-start font-medium">
            {displayValue}
          </p>
          <X className="z-50 text-black/40 hover:text-red-500" onClick={handleUserAddressClear} size={16} />
        </div>
      );
    }
    return (
      <div className="flex items-center justify-between w-full text-sm">
        <div className="flex items-center gap-1">
          <p className="text-[#EF4444] font-semibold">Delivery address:</p>
          <p className="text-muted-foreground">Add Location</p>
        </div>
        <ChevronRight color="#71717A" size={16} />
      </div>
    );
  };

  return (
    <Dialog open={addressDialogOpen} onOpenChange={setAddressDialogOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center h-full gap-1 px-4 py-2 transition-all bg-white rounded-full border border-slate-100 shadow-sm w-80 hover:shadow-md outline-none">
          <MapPin className="text-[#EF4444]" size={20} />
          <div className="flex items-center w-full">{renderCurrentAddress()}</div>
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl font-bold">Select Location</DialogTitle>
        </DialogHeader>
        
        <div className="p-6 space-y-4">
          <div className="h-[250px] w-full rounded-xl overflow-hidden border relative">
             <LocationPicker onLocationSelect={handleLocationSelect} />
          </div>

          <div className="space-y-2">
            <p className="text-sm text-slate-700 font-semibold">Delrengui Address</p>
            <Textarea
              placeholder="Байр, орц, тоот гэх мэт..."
              className="min-h-20 resize-none bg-slate-50 border-slate-200 focus:bg-white"    
              value={userLocationText}
              onChange={(e) => setUserLocationText(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="p-6 bg-slate-50 border-t flex flex-row justify-end gap-2">
          <DialogClose asChild>
            <Button variant="ghost" className="rounded-full">Cancel</Button>
          </DialogClose>
          <Button 
            onClick={handleUserAddressUpdate} 
            disabled={!coords}
            className="bg-[#EF4444] hover:bg-[#D93636] text-white rounded-full px-8 font-semibold transition-all active:scale-95"
>
            Хадгалах
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
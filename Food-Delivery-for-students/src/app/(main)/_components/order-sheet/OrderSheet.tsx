import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import { OrderSheetContents } from ".";

type OrderSheetProps = {
  open: boolean;
  closeSidebar: () => void;
  openModal: () => void;
};

export const OrderSheet = ({
  open,
  closeSidebar,
  openModal,
}: OrderSheetProps) => {
 return (
    <Sheet open={open} onOpenChange={closeSidebar}>
      <SheetContent className="sm:max-w-[535px] rounded-s-lg border-none bg-[#404040] flex flex-col h-full p-0">
        
        <div className="p-6 pb-2">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-3 text-white">
              <ShoppingCart size={24} />
              Order detail
            </SheetTitle>
          </SheetHeader>
        </div>

        <div className="flex-1 overflow-y-auto px-6 custom-scrollbar">
          <OrderSheetContents openModal={openModal} />
        </div>

      </SheetContent>
    </Sheet>
  );
};
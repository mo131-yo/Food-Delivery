"use client";
import { useState } from "react";
import { HeaderLogo } from "./header/HeaderLogo";
import { OrderSheet } from "./order-sheet";
import { OrderSheetSuccessDialog } from "./order-sheet/OrderSheetSuccessDialog";
import { UserToolbar } from "./header/UserToolbar";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const openSidebar = () => {
    setOpen(true);
  };
  const closeSidebar = () => {
    setOpen(false);
  };

  const openModal = () => {
    setModalOpen(true);
    setOpen(false);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <header className="w-full h-17 bg-[#18181B] py-3">
      <div className="container flex items-center justify-between mx-auto">
        <HeaderLogo />

        <div className="flex items-center gap-3 text-white">
          <UserToolbar openSidebar={openSidebar} />
        </div>
      </div>

      <OrderSheet
        open={open}
        closeSidebar={closeSidebar}
        openModal={openModal}
      />

      <OrderSheetSuccessDialog open={modalOpen} closeModal={closeModal} />
    </header>
  );
};

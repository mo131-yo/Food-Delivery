"use client";
import React, { useState } from 'react';
import { MdCancel } from "react-icons/md";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  food: any;
  imageUrl: string;
  onAddToCart: (qty: number) => void;
}

const FoodDetailModal = ({ isOpen, onClose, food, imageUrl, onAddToCart }: ModalProps) => {
  const [quantity, setQuantity] = useState(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative flex flex-col md:flex-row w-full max-w-3xl overflow-hidden rounded-4xl bg-white shadow-2xl">

        <button 
          onClick={onClose}
          className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-white text-gray-500 shadow-sm hover:bg-gray-50 transition">
          <MdCancel />
        </button> 

        <div className="w-full md:w-1/2 h-64 md:h-auto">
          <img 
            src={imageUrl} 
            alt={food.name} 
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex w-full md:w-1/2 flex-col justify-between p-8 md:p-10">
          <div>
            <h2 className="mb-4 text-3xl font-bold text-red-500">{food.name}</h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              {food.ingredients?.join(", ") || "Fresh ingredients prepared specially for you."}
            </p>
          </div>

          <div className="mt-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 font-medium">Total price</p>
                <p className="text-2xl font-black text-gray-800">
                  {(food.price * quantity).toLocaleString()} ₮
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-xl font-bold hover:bg-gray-50 transition"
                >
                  –
                </button>
                <span className="text-lg font-bold w-4 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-xl font-bold hover:bg-gray-50 transition"
                >
                  +
                </button>
              </div>
            </div>
            <button 
              onClick={() => {
                onAddToCart(quantity);
                onClose();
              }}
              className="w-full rounded-2xl bg-zinc-900 py-4 font-bold text-white transition hover:bg-zinc-800 active:scale-[0.98]"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetailModal;
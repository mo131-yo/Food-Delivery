"use client";
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useCart } from './CartProvider';
import { FaCheckSquare } from "react-icons/fa";
import FoodDetailModal from './FoodDetailModal';

interface FoodProps {
  id: string;
  foods: {
    name: string;
    price: number;
    image: string; 
    ingredients: string[];
  };
}

const FoodCard = ({ foods, id }: FoodProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useCart();

  const imageUrl = foods.image 
    ? `https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/${foods.image}` 
    : "https://via.placeholder.com/150";

const handleAddToCart = (qty: number) => {
    addToCart({
     id: id,
      _id: id,
      name: foods.name,
      price: foods.price,
      image: foods.image,
      quantity: qty,
      ingredients: foods.ingredients?.join(", "),
    });
    
    toast.success(`${foods.name} сагслагдлаа!`, {
      icon: <FaCheckSquare />,
    });
  };

  return (
    <div>
      <div 
        onClick={() => setIsModalOpen(true)}
        className="group border border-gray-100 rounded-3xl p-4 w-70 shadow-sm hover:shadow-xl bg-white transition-all cursor-pointer dark:bg-gray-200 grid grid-cols-3"
      >
        <div className="overflow-hidden rounded-2xl mb-4">
          <img 
            src={imageUrl} 
            alt={foods.name} 
            className="w-full h-44 object-cover group-hover:scale-105 transition duration-300"
          />
        </div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800">{foods.name}</h3>
          <p className="text-lg font-bold text-red-500">{foods.price.toLocaleString()} ₮</p>
        </div>
        <p className="text-xs text-gray-400 line-clamp-2 mb-4">
          {foods.ingredients?.join(", ") || "Fresh ingredients"}
        </p>
        
        <button className="w-full py-2 bg-gray-50 text-gray-500 rounded-xl font-bold group-hover:bg-red-500 group-hover:text-white transition">
          Add
        </button>
      </div>

      <FoodDetailModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        food={foods}
        imageUrl={imageUrl}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default FoodCard;
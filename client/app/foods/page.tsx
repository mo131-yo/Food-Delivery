"use client";
import React, { useEffect, useState } from 'react';
import FoodCard from '@/app/components/FoodCard';
import {Header} from "@/app/components/Header";
import {Footer} from "@/app/components/Footer"
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function FoodListPage() {
  const [foods, setFoods] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch('https://food-ahv2.onrender.com/foods/get-all-food');
        const result = await response.json();

        if (response.ok) {
          setFoods(result.data); 
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      } 
    };

    fetchFoods();
  }, []);

  if (loading) return <div className="p-10 ">
    <p className='text-center'>Loading ...</p>
    <div className='flex justify-center items-center animate-spin'>
      <AiOutlineLoading3Quarters />
    </div>
    </div>

  return (
    <div className="flex flex-wrap gap-5 p-5 bg-gray-50 min-h-screen dark:bg-black">
        <Header />  
      {foods.map((food) => (
        <FoodCard 
          key={food._id}
          foods={{
            name: food.foodName,
            price: food.foodPrice,
            image: food.foodImage,
            ingredients: food.ingredients,
          }} id={''}        />
      ))}
       <Footer />
    </div>
  );
}
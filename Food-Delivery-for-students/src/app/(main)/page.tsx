"use client";
import { useState } from "react";
import { HeroImage } from "./_components";
import { FoodCategories } from "./_components/food-with-category/FoodCategories";

export default function Home() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div>
      <HeroImage imgSource="/hero.png" />
      <div className="container mx-auto my-9">
        <FoodCategories 
        selectedCategoryId={selectedId} 
        onCategorySelect={(id) => setSelectedId(id)} 
      />
      </div>
    </div>
  );
}

"use client";

import { Pencil, Trash2, X, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { updateFoodService } from "@/lib/services/update-food";
import { uploadImage } from "@/lib/utils/uploadImage";
import { fetchCategories } from "@/lib/services/get-categories";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { deleteFood } from "@/lib/services/delete-food";

export const EditFoodModal = ({ food }: { food: any }) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(food?.foodImage || "");

  const [foodInfo, setFoodInfo] = useState({
    foodName: food?.foodName || "",
    foodPrice: food?.foodPrice || 0,
    category: food?.category?._id || food?.category || "",
    ingredients: Array.isArray(food?.ingredients)
      ? food.ingredients.join(", ")
      : food?.ingredients || "",
    foodImage: food?.foodImage || "",
  });

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetchCategories();
        if (res?.data) {
          setCategories(res.data);
        } else if (Array.isArray(res)) {
          setCategories(res);
        }
      } catch (err) {
        console.error("Categories fetch error:", err);
      }
    };
    loadCategories();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
    try {
      let currentImageUrl = foodInfo.foodImage;
      if (uploadedImage) {
        const responseUrl = await uploadImage(uploadedImage);
        currentImageUrl = responseUrl || foodInfo.foodImage;
      }

      const payload = {
        foodName: foodInfo.foodName,
        foodPrice: Number(foodInfo.foodPrice),
        category: foodInfo.category,
        foodImage: currentImageUrl,
        ingredients: foodInfo.ingredients.split(",").map((i: string) => i.trim()),
      };

      const result = await updateFoodService(food._id, payload);
      if (result) {
        toast.success("Successfully update");
        window.location.reload();
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Aldaa garlaa");
    }
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm(`${food.foodName}-g ustaghdaa itgeltei bn?`);
    if (!isConfirmed) return;
    try {
      const result = await deleteFood(food._id);
      if (result.success) {
        toast.success("Food amjilttai ustlaa");
        window.location.reload();
      }
    } catch (error: any) {
      console.error("Delete failed:", error);
      const errorMsg = error.response?.data?.message || "Ustgahad aldaa garlaa";
      toast.error(errorMsg);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex justify-center items-center rounded-full bg-white h-10 w-10 shadow-sm border border-gray-100 hover:bg-gray-50 transition-all">
          <Pencil color="#EF4444" size={18} />
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-[500px] p-0 overflow-hidden rounded-[24px] border-none shadow-2xl">
        <DialogHeader className="px-6 py-4 border-b border-gray-100 flex flex-row items-center justify-between">
          <DialogTitle className="text-lg font-bold text-gray-900">
            Dishes info
          </DialogTitle>
          <DialogClose asChild>
            <button className="bg-white h-9 w-9 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors">
              <X className="text-black" size={20} />
            </button>
          </DialogClose>
        </DialogHeader>

        <div className="p-6 space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Food name</label>
            <input
              value={foodInfo.foodName}
              onChange={(e) => setFoodInfo({ ...foodInfo, foodName: e.target.value })}
              className="w-full bg-[#F4F4F5] p-3 rounded-xl border-none focus:ring-1 focus:ring-gray-200 outline-none text-sm"
              placeholder="Enter dish name"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Food category</label>
            <select
              value={foodInfo.category}
              onChange={(e) => setFoodInfo({ ...foodInfo, category: e.target.value })}
              className="w-full bg-[#F4F4F5] p-3 rounded-xl border-none focus:ring-1 focus:ring-gray-200 outline-none text-sm appearance-none cursor-pointer"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.categoryName}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Ingredients</label>
            <textarea
              rows={3}
              value={foodInfo.ingredients}
              onChange={(e) => setFoodInfo({ ...foodInfo, ingredients: e.target.value })}
              className="w-full bg-[#F4F4F5] p-3 rounded-xl border-none focus:ring-1 focus:ring-gray-200 outline-none text-sm resize-none"
              placeholder="List ingredients..."
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              value={foodInfo.foodPrice}
              onChange={(e) => setFoodInfo({ ...foodInfo, foodPrice: Number(e.target.value) })}
              className="w-full bg-[#F4F4F5] p-3 rounded-xl border-none focus:ring-1 focus:ring-gray-200 outline-none text-sm"
              placeholder="0.00"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Image</label>
            <div className="grid grid-cols-1 gap-4">
              <div className="relative aspect-video bg-[#F4F4F5] rounded-xl overflow-hidden border border-gray-100 flex items-center justify-center group">
                {imagePreview ? (
                  <>
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => { setUploadedImage(null); setImagePreview(""); }}
                      className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={14} className="text-gray-600" />
                    </button>
                  </>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer hover:bg-gray-100 transition-colors">
                    <Plus size={24} className="text-gray-400" />
                    <span className="text-[12px] text-gray-500 mt-1">Add image</span>
                    <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                  </label>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 flex items-center gap-3">
          <button 
            type="button"
            onClick={handleDelete} 
            className="p-3 bg-white border border-gray-200 rounded-xl hover:bg-red-50 hover:border-red-200 transition-colors group"
          >
            <Trash2 size={20} className="text-gray-500 group-hover:text-red-500" />
          </button>
          <button
            type="button"
            onClick={handleUpdate}
            className="flex-1 bg-[#18181B] text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-black transition-all active:scale-[0.98]"
          >
            Save changes
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
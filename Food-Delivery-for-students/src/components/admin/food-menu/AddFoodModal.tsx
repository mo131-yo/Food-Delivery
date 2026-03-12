import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createFood } from "@/lib/services/create-food";
import { ChangeEvent, useState } from "react";
import { ImageUploader } from "./ImageUploader";
import { uploadImage } from "@/lib/utils/uploadImage";

type AddFoodModalProps = {
  categoryName: string;
  categoryId: string;
};

type FoodInfo = {
  foodName: string;
  foodPrice: string;
  foodImage: string;
  ingredients: string;
  category: string;
};

export const AddFoodModal = ({
  categoryName,
  categoryId,
}: AddFoodModalProps) => {
  const [uploadedImage, setUploadedImage] = useState<File>();

  const [foodInfo, setFoodInfo] = useState<FoodInfo>({
    foodName: "",
    foodPrice: "",
    foodImage: "",
    ingredients: "",
    category: categoryId,
  });

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setFoodInfo((prevFoodInfo) => ({
      ...prevFoodInfo,
      [name]: value,
    }));
  };

const handleCreateFood = async () => {
  console.log("Ilgeesen ID:", categoryId);
  console.log("Irsen id", categoryId);

  if (!categoryId) {
    alert("Category id oldohgui bn");
    return;
  }

  try {
    let imageUrl = "";
    if (uploadedImage) {
      const responseUrl = await uploadImage(uploadedImage);
      imageUrl = responseUrl || "";
    }

    const foodData = {
      foodName: foodInfo.foodName,
      foodPrice: Number(foodInfo.foodPrice),
      foodImage: imageUrl,
      category: categoryId,
      ingredients: foodInfo.ingredients.split(',').map((item: string) => item.trim()),
    };

    console.log("Backend ruu ilgeej bui ugugdul", foodData);

    const result = await createFood(foodData);

    if (result) {
      alert("Food amjilttai nemegdlee");
      window.location.reload();
    }
    
  } catch (error: any) {
    console.error("Food creation failed:", error);
    alert(error.response?.data?.error || "Food nemehed aldaa garlaa");
  }
};

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setUploadedImage(event.target.files[0]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="custom-dashed-border rounded-3xl bg-background h-[227px] flex flex-col gap-6 justify-center items-center m-1">
          <Button className="bg-red-500 rounded-full w-9 h-9">
            <Plus width={16} height={16} strokeWidth={1} />
          </Button>
          <p className="text-sm text-center w-36">
            Add new Dish to {categoryName}
          </p>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] flex flex-col gap-6">
        <div className="flex items-center justify-between mb-4">
          <DialogTitle>Add new Dish to {categoryName}</DialogTitle>
            <DialogDescription className="hidden">
            Fill in the form to add a new dish to the menu.
            </DialogDescription>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="rounded-full w-9 h-9"
            >
              <X strokeWidth={1} />
            </Button>
          </DialogClose>
        </div>
        <div className="flex w-full gap-6">
          <div className="flex flex-col w-1/2 gap-2">
            <Label htmlFor="foodName" className="ml-1 font-semibold">
              Food name
            </Label>
            <Input
              name="foodName"
              placeholder="Type food name..."
              value={foodInfo.foodName}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col w-1/2 gap-2">
            <Label htmlFor="price" className="font-semibold">
              Food price
            </Label>
            <Input
              name="foodPrice"
              type="number"
              placeholder="Enter price..."
              value={foodInfo.foodPrice}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="ingredients" className="font-semibold">
            Ingredients
          </Label>
          <Input
            name="ingredients"
            placeholder="List ingredients..."
            value={foodInfo.ingredients}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="image" className="font-semibold">
            Food image
          </Label>

          <ImageUploader onFileChange={onFileChange} imgFile={uploadedImage} />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" className="mt-4" onClick={handleCreateFood}>
              Add Dish
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
import { Request, Response } from "express";
import { FoodCategoryModel } from "../../schema/Category.schema";

export const getAllFoodCategory = async (req: Request, res: Response) => {
    try {
        const foodCategory = await FoodCategoryModel.find();
        
        console.log("Oldsongui", foodCategory);

        res.status(200).json({
            message: "Buh Category",
            count: foodCategory.length,
            data: foodCategory
        });
    } catch (error) {
        console.error("GetAll Error:", error);
        res.status(500).json({ message: "Aldaa garlaa" });
    }
};
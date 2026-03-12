import { Request, Response } from "express";
import { FoodCategoryModel } from "../../schema/Category.schema";

export const getFoodCategoryById = async (req: Request, res: Response) => {
    try {
        const { categoryId } = req.params; 

        const foodCategory = await FoodCategoryModel.findById(categoryId); 

        if (!foodCategory) {
            return res.status(404).json({ message: "Category oldsongui" });
        }

        res.status(200).json({
            message: "Category олдлоо",
            data: foodCategory
        });
    } catch (error) {
        console.error("Error fetching category:", error);
        res.status(500).json({ message: "Aldaa garlaa" });
    }
}

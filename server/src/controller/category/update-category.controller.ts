import { Request, Response } from "express";
import { FoodCategoryModel } from "../../models/food.category.model";

export const updateCategory = async (req: Request, res: Response) => {
    try {
        const { categoryId } = req.params;
        const { categoryName, description } = req.body;

        const updatedCategory = await FoodCategoryModel.findByIdAndUpdate(
            categoryId,
            { categoryName, description },
            { new: true, runValidators: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: "Category oldsongui" });
        }

        res.status(200).json({
            message: "Update successfull",
            data: updatedCategory
        });

    } catch (error: any) {
        console.error("Update Error:", error.message);
        res.status(500).json({ 
            message: "Aldaa garlaa", 
            error: error.message 
        });
    }
};
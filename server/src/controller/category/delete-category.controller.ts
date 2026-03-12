import { Request, Response } from "express";
import { FoodCategoryModel } from "../../schema/Category.schema";

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const { categoryId } = req.params;
        const deletedCategory = await FoodCategoryModel.findByIdAndDelete({_id:categoryId});

        if (!deletedCategory) {
             res.status(404).json({ 
                message: "Category oldsongui" 
            });
            return
        }

        res.status(200).json({
            message: "Amjilttai ustgagdlaa",
            data: deletedCategory
        });

    } catch (error) {
        console.error("Delete Category Error:", error);
        res.status(500).json({ message: "Aldaa garlaa" });
    }
};
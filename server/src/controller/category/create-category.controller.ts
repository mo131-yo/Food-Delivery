import { Request, Response } from "express";
import { FoodCategoryModel } from "../../models/food.category.model";

export const createFoodCategory = async (req: Request, res: Response) => {
    try {
        const { categoryName, description } = req.body;

        const existingCategory = await FoodCategoryModel.findOne({ categoryName }) ;
        
        if (existingCategory) {
            return res.status(400).json({ message: "Ene Category burtgelttei bna" });
        }

        const newCategory = await FoodCategoryModel.create({ categoryName, description });

        return res.status(201).json({ data: newCategory });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};
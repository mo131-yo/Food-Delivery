import mongoose, { models, model, Schema, Model } from "mongoose";

export interface IFoodCategory {
    categoryName: string;
    description?: string;
}

const FoodCategorySchema = new Schema<IFoodCategory>({
    categoryName: { type: String, required: true },
    description: { type: String },
}, { timestamps: true });

export const FoodCategoryModel:Model<IFoodCategory> = models["FoodCategory"] || model<IFoodCategory>("FoodCategory", FoodCategorySchema);
import mongoose, { Model, model, models, Schema } from "mongoose";

export interface IFoodCategory {
    categoryName: string;
    description?: string;
}

const FoodCategorySchema = new Schema<IFoodCategory>({
    categoryName: { type: String, required: true },
    description: { type: String },
}, { timestamps: true });

// export const FoodCategoryModel = mongoose.models.Category || mongoose.model<IFoodCategory>("FoodCategory", FoodCategorySchema);
export const FoodCategoryModel:Model<IFoodCategory> = models["FoodCategory"] || model<IFoodCategory>("FoodCategory", FoodCategorySchema);
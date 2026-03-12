import mongoose, { model, Model, models, Schema } from "mongoose";

export interface iFood {
  foodName: string;
  foodPrice: number;
  foodImage: string | null;
  quantity: number;
  category: mongoose.Types.ObjectId;
  ingredients: string[];
}

export const FoodSchema = new Schema({
    foodName: { type: String, required: true },
    foodPrice: { type: Number, required: true },
    foodImage: { type: String, default: null },
    quantity: { type: Number, default: 1 },
    ingredients: [{ type: String }],
    category: {
        type: Schema.Types.ObjectId,
        ref: 'FoodCategory', 
        required: true
    }
}, { timestamps: true });

export const    FoodModel: Model<iFood> = models["Food"] || model<iFood>("Food", FoodSchema);
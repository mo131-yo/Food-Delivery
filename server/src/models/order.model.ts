import mongoose, { models, model, Schema } from "mongoose";

const OrderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    foods: [{ 
        food: { type: Schema.Types.ObjectId, ref: "Food", required: true },
        quantity: { type: Number, required: true, default: 1 }
    }],
    totalPrice: { type: Number },
    address: { type: String, required: true },
    status: { 
        type: String, 
        enum: ["Pending", "Processing", "Delivered", "Cancelled"], 
        default: "Pending" 
    },
}, { timestamps: true });

export const OrderModel = models["Order"] || model("Order", OrderSchema);
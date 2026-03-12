import mongoose, {Model, models, Schema} from "mongoose"; 


interface FoodOrderItem{
    foodId:mongoose.Types.ObjectId;
    quantity: number
}

interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  foods: { food: mongoose.Types.ObjectId }[];
  totalPrice: number;
  address: string;
  status: string;   
  foodOrderItems: FoodOrderItem[]
}

export const OrderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    foods: [{ 
        food: { type: Schema.Types.ObjectId, ref: "Food", required: true },
        quantity: { type: Number, required: true, default: 1 }
    }],
    totalPrice: { type: Number, required: true },
    address: { type: String, required: true },
    status: { type: String, 
        enum: ["Pending", "Processing", "Delivered", "Cancelled"], 
        default: "Pending" 
    },
}, { timestamps: true });
// export const OrderModel:Model<IOrder> = models["Order"] || mongoose.model("Order", OrderSchema);
export const OrderModel = (models.Order as Model<IOrder>) || mongoose.model<IOrder>("Order", OrderSchema);


import { Request, Response } from "express";
import { FoodModel } from "../../models/food.model";
import mongoose from "mongoose";

export const deleteFood = async (req: Request, res: Response) => {
  try {
    const { foodId } = req.params;

    if (typeof foodId !== 'string') {
      return res.status(400).json({
        success: false,
        message: "ID bhq",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(foodId)) {
      return res.status(400).json({
        success: false,
        message: "id huchingui",
      });
    }

    const deletedFood = await (FoodModel as any).findByIdAndDelete(foodId);

    if (!deletedFood) {
      return res.status(404).json({
        success: false,
        message: "Khool oldsongui",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Success",
      data: deletedFood,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Aldaa garlaa",
      error: error.message,
    });
  }
};
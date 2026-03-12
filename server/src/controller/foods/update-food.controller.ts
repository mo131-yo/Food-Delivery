import { Request, Response } from "express";
import { FoodModel } from "../../models/food.model";
import mongoose from "mongoose";

export const updateFood = async (req: Request, res: Response) => {
  try {
    const { foodId } = req.params;
    const updateData = req.body; 

    if (typeof foodId !== 'string' || !mongoose.Types.ObjectId.isValid(foodId)) {
      res.status(400).json({
        success: false,
        message: "Id huchingui.",
      });
      return
    }

    const updatedFood = await (FoodModel as any).findByIdAndUpdate(
      foodId, 
      updateData, 
      { new: true, runValidators: true } 
    );

    if (!updatedFood) {
       res.status(404).json({
        success: false,
        message: "Khool olsongui",
      });
      return;
    }

    return res.status(200).json({
      success: true,
      message: "Success.",
      data: updatedFood,
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
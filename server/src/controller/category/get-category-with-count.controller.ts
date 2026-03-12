import { Request, Response } from "express"; 
import { FoodCategoryModel } from "../../models/food.category.model";


export const getCategoryWithCount = async (req: Request, res: Response) => {
  try {
    const categories = await FoodCategoryModel.aggregate([
      {
        $lookup: {
          from: "foods",
          localField: "_id",
          foreignField: "category",
          as: "foods",
        },
      },
      {
        $addFields: {
          categoryId: "$_id" 
        }
      },
      {
        $project: {
          _id: 1, 
          categoryName: 1,
          count: { $size: "$foods" },
          foods: 1,
        },
      },
    ]);

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Алдаа гарлаа" });
  }
};
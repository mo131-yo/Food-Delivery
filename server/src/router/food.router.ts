import { Router } from "express";
import { createFoodItem } from "../controller/foods/create-new-food.controller";
import { deleteFood } from "../controller/foods/delete-food.controller";
import { updateFood } from "../controller/foods/update-food.controller";
import { getFoodByIdGet } from "../controller/foods/get-food-by-id.controller";
import { getAllFood } from "../controller/foods/get-all-food.controller";
import { UserRole } from "../schema/user.schema";
import { authentication,  } from "../middlewares/authentication";
import { authorization } from "../middlewares/authorization";

export const foodRouter = Router();

foodRouter.post("/create-food-item", createFoodItem);

foodRouter.delete("/delete-food/:foodId",authentication, authorization([UserRole.ADMIN]), deleteFood)

foodRouter.patch("/update-food/:foodId", updateFood)

foodRouter.get("/get-food-by-id/:foodId", getFoodByIdGet)

foodRouter.get("/get-all-food", getAllFood)
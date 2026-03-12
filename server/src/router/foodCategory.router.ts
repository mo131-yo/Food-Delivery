import {Router} from "express";
import { createFoodCategory, deleteCategory, getAllFoodCategory, getCategoryWithCount, getFoodCategoryById } from "../controller/category";
import { updateCategory } from "../controller/category/update-category.controller";
import { UserRole } from "../schema/user.schema";
import { authentication } from "../middlewares/authentication";
import { authorization } from "../middlewares/authorization";

export const foodCategoryRouter = Router();

foodCategoryRouter.post("/create-food-category", authentication, authorization([UserRole.ADMIN]) , createFoodCategory);

foodCategoryRouter.get("/get-category/:categoryId", authentication, authorization([UserRole.ADMIN]),  getFoodCategoryById);

foodCategoryRouter.get("/get-all-foods",  getAllFoodCategory);

foodCategoryRouter.patch("/update-category/:categoryId", authentication, authorization([UserRole.ADMIN]),  updateCategory);

foodCategoryRouter.delete("/delete-category/:categoryId",authentication , authorization([UserRole.ADMIN]), deleteCategory)

foodCategoryRouter.get("/with-count", getCategoryWithCount);

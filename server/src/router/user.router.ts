import { getMe, getUserByIdAndGet, lastSignUp, refresh, updateUser, verifyOtp } from "../controller";
import { Router } from "express";
import { firstSignUp } from "../controller/users/Nevterh/first-sign-up-controller";
import { signInController } from "../controller/users/Nevterh/sign-in-controller";
import { verifyEmail } from "../controller/users/verify-email.controller";
import { getAllUsers } from "../controller/users/all-user.controller";
import { resetPassword } from "../controller/users/reset-Password.controller";
import { resetPasswordRequest } from "../controller/users/reset-password-request.controller";
import { authentication, authorization } from "../middlewares";
import { UserRole } from "../schema/user.schema";

export const userRouter = Router();

userRouter.get("/get-user-by-id-get-request/:userId",authentication, authorization([UserRole.ADMIN]),  getUserByIdAndGet);

userRouter.get("/all-users",authentication, authorization([UserRole.ADMIN]), getAllUsers)

userRouter.post("/sign-up", firstSignUp);
userRouter.post("/last-sign-up", lastSignUp);
userRouter.post("/sign-in", signInController);

userRouter.get("/verify-email", verifyEmail);

userRouter.post("/reset-password-request", resetPasswordRequest);
userRouter.post("/verify-otp", verifyOtp);
userRouter.post("/reset-password", resetPassword);

userRouter.post("/refresh", refresh )

userRouter.patch("/update-user", authentication, updateUser)

userRouter.get("/me", authentication, getMe);

userRouter.get("/admin/setting", authentication, authorization([UserRole.ADMIN]),(req, res) => {  
  res.json({ message: "Welcome Admin" });
  });

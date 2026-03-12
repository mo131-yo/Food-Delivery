import { Request, Response } from "express";
import { UserModel } from "../../schema/user.schema";

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find({}).select("-password");
        
        res.status(200).json({
            message: "Buh Users",
            count: users.length,
            data: users
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Alda garlaa" });
    }
};
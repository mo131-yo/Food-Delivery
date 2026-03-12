import { Request, Response } from "express";
import { UserModel } from "../../schema/user.schema";

interface AuthRequest extends Request {
  user?: any; 
}

export const getUserByIdAndGet = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params; 

        if (!userId || userId === "null" || userId === "undefined") {
            return res.status(400).json({ message: "User ID буруу байна" });
        }
        
        const user = await UserModel.findById(userId).select("-password"); 

        if (!user) {
            return res.status(404).json({ message: "User olsongui" });
        }

        res.status(200).json({ user }); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Aldaa garlaa" })
    }
}
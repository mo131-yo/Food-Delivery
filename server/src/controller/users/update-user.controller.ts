import { Request, Response } from "express";
import { UserModel } from "../../schema/user.schema"; 

export const updateUser = async (req: Request, res: Response) => {
    try {
        const loggedInUserId = (req as any).user.id || (req as any).user.userId;

        if (!loggedInUserId) {
            return res.status(401).json({ message: "Нэвтрэх эрхгүй байна." });
        }

        const updateData = req.body;
        
        delete updateData.password;
        delete updateData._id;
        delete updateData.role; 

        const updatedUser = await UserModel.findByIdAndUpdate(
            loggedInUserId,
            updateData,
            { new: true, runValidators: true }
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({ message: "Хэрэглэгч олдсонгүй" });
        }

        res.status(200).json({
            message: "Амжилттай шинэчлэгдлээ",
            user: updatedUser
        });
    } catch (error: any) {
        console.error("Update Error:", error);
        res.status(500).json({ message: "Алдаа гарлаа", error: error.message });
    }
};
import { Request, Response } from "express";
import bcrypt from "bcrypt"
import { UserModel } from "../../schema/user.schema";

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { email, verifyCode, newPassword } = req.body;

        console.log("DEBUG Body:", { email, verifyCode });

        const user = await UserModel.findOne({ 
            email, 
            resetPasswordOtp: verifyCode,
            resetPasswordExpires: { $gt: new Date() }
        });

        if (!user) {
            return res.status(400).json({ message: "Линк хүчингүй эсвэл хугацаа нь дууссан байна" });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(String(newPassword), salt);

        user.set('resetPasswordOtp', undefined);
        user.set('resetPasswordExpires', undefined);
        
        await user.save();
        res.status(200).json({ message: "Нууц үг амжилттай шинэчлэгдлээ" });
    } catch (error) {
        res.status(500).json({ message: "Aldaa garlaa" });
    }
};  

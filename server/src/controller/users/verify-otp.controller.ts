import { Request, Response } from "express";
import { UserModel } from "../../schema/user.schema";

export const verifyOtp = async (req: Request, res: Response) => {
    try {
        const { email, verifyCode } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User oldsongui" });
        }

        if (!user.resetPasswordOtp || user.resetPasswordOtp !== verifyCode) {
            return res.status(400).json({ message: "Verify otp code buruu bn" });
        }

        if (new Date() > (user.resetPasswordExpires as Date)) {
            return res.status(400).json({ message: "Code nii hugatsaa duussan" });
        }

        res.status(200).json({ 
            success: true, 
            message: "Code amjilttai batalgaajlaa, odoo nuuts ugee shinchilne uu" 
        });

    } catch (error) {
        res.status(500).json({ message: "Aldaa garlaa" });
    }
};
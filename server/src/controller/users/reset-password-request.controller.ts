import { Request, Response } from "express";
import crypto from "crypto";
import { UserModel } from "../../models";
import { ResetPasswordVerificationEmail } from "../../utils/reset-password";

export const resetPasswordRequest = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) return res.status(404).json({ message: "User oldsongui" });

        const resetToken = crypto.randomBytes(32).toString("hex");
        
        const resetLink = `${process.env.VERCEL_URL}/reset-password?token=${resetToken}&email=${email}`;

        const result = await ResetPasswordVerificationEmail(email, resetLink);

        if (result.success) {
            user.resetPasswordOtp = resetToken; 
            user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000);
            await user.save();
            return res.status(200).json({ message: "Reset линк и-мэйл рүү илгээгдлээ" });
        }
        
        return res.status(500).json({ message: "Алдаа гарлаа" });
    } catch (error) {
        return res.status(500).json({ message: "Aldaa garlaa" });
    }
};
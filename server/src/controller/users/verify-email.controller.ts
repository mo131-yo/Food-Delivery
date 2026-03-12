import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../../schema/user.schema";

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ message: "Token байхгүй байна" });
    }

    const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string) as { email: string };

    await UserModel.findOneAndUpdate(
      { email: decoded.email },
      { isVerified: true }
    );

    const frontendBaseUrl = process.env.FRONTEND_URL || process.env.VERCEL_URL;
    
    return res.redirect(`${frontendBaseUrl}/login?verified=true`);

  } catch (error: any) {
    console.error("Verification Error:", error.message);
    
    const frontendBaseUrl = process.env.FRONTEND_URL || process.env.VERCEL_URL;
    return res.redirect(`${frontendBaseUrl}/verification-error`);
  }
};
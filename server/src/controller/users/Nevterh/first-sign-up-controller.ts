import { UserModel } from "../../../schema/user.schema";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { verifyUserEmail } from "../../../utils/mail-utils";

export const firstSignUp = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email burtgegdsen bn" });
        }

        const token = jwt.sign(
            { email }, 
            process.env.JWT_SECRET || "hello", 
            { expiresIn: "15m" } 
        );

        const frontendUrl = "http://localhost:3000";
        
        const baseUrl = process.env.BACKEND_API || "http://localhost:8000";
        
        // const publicUrl= frontendUrl || baseUrl

        // const verificationLink = `${publicUrl}/verify-email?token=${token}`;
        const publicUrl = frontendUrl || baseUrl
        
        // const verificationLink = `${publicUrl}/verify-email?token=${token}`
        const verificationLink = `${frontendUrl}/sign-up?token=${token}`;

        await verifyUserEmail(email, verificationLink);
        
        res.status(200).json({
            message: "Batalgaajuulah mail yvuulsan. Mail ee shalgaad nuuts ugee tohiruulna uu", token
        });

    } catch (error: any) {
        res.status(500).json({ message: "Aldaa garlaa", error: error.message });
    }
}
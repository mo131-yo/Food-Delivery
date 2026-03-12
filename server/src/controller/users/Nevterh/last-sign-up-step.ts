import { UserModel } from "../../../schema/user.schema";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const lastSignUp = async (req: Request, res: Response) => {
    try {
        const { token, password } = req.body;

        if (!token || !password) {
            return res.status(400).json({ message: "Medeelel dutuu bn" });
        }


        const decoded = jwt.verify(token, process.env.JWT_SECRET || "hello") as { email: string };

        const email = decoded.email;

        const secret = process.env.ACCESS_TOKEN_SECRET || process.env.JWT_SECRET || "hello";
        // const decoded = jwt.verify(token, secret) as { email: string };
        // const email = decoded.email;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email ali hediin burtgegdsen bn" });
        }   

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await UserModel.create({
            email,
            password: hashedPassword,
            isVerified: true ,
            role:"USER"
        });

        res.status(201).json({
            message: "Burtgel amjilttai duuslaa. Odoo nerterne uu",
            userId: newUser._id
        });

    } catch (error: any) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Linkiin hugatsaa duussan" });
        }
        res.status(500).json({ message: "Aldaa garlaa", error: error.message });
    }
}
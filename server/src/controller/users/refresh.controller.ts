import { Request, Response } from "express";
import jwt, { decode } from "jsonwebtoken";
import { UserModel } from "../../schema/user.schema";

export const refresh = async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(401).json({ message: "Refresh token bhq bn" });
        }

        const secret = process.env.REFRESH_TOKEN_SECRET; 
        const decoded: any = jwt.verify(refreshToken, secret as string);

        const user = await UserModel.findById(decoded.userId || decoded._id);


        if (!user) {
            return res.status(404).json({ message: "User oldsongui" });
        }

        const accessToken = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.ACCESS_TOKEN_SECRET || "access_secret_123",
            { expiresIn: "15m" } 
        );

        res.status(200).json({ accessToken });

    } catch (error: any) {
        console.error("JWT Verify Error:", error.message);
        res.status(403).json({ 
            message: "Refresh token huchingui bn",
            error: error.message 
        });
    }
};
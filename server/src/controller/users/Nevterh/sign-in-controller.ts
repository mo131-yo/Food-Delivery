    import { UserModel, UserRole } from "../../../schema/user.schema";
    import { Request, Response } from "express";
    import bcrypt from "bcrypt";
    import jwt from "jsonwebtoken";

    export const signInController = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            
            const user = await UserModel.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: "User oldsongui" });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Nuuts ug buruu bna" });
            }
            console.log(user.role);

            const accessToken = jwt.sign(
                { userId: user._id, email: user.email, role: user.role },
                   process.env.JWT_SECRET as string,
                { expiresIn: "1d" });

            const refreshToken = jwt.sign(  
            { userId: user._id },
            process.env.REFRESH_TOKEN_SECRET as string,
            { expiresIn: "30d" }
            );
            
            user.refreshToken = refreshToken;
            await user.save();

            return res.status(200).json({
                message: "Success",
                accessToken,
                refreshToken,
                user: { id: user._id, email: user.email , role:user.role}
            });

        } catch (error) {
            console.error("SignIn Error:", error);
            return res.status(500).json({ message: "Aldaa garlaa" });
        }
    };

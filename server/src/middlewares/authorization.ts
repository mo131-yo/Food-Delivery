  import { Request, Response, NextFunction } from "express";
  import { UserModel } from "../models";

  export const authorization = (allowedRoles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      
      const user = (req as any).user; 
      console.log("Token-оос ирсэн user объект:", user);
      
      if (!user) {
        return res.status(401).json({ message: "Nevtreegui bn" });
      }

        const userId = user.userId || user.id || user._id || user.sub

        const userIdFind = await UserModel.findById(userId);
        
        if (!userIdFind) {
          return res.status(404).json({ message: "User oldsongui" });
        }

        if (!allowedRoles.includes(userIdFind.role)) {
          return res.status(403).json({
            message: "Eniig hiih erh alga tand"
          });
        }
      next();
    };
  };
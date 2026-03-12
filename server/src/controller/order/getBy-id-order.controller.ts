// import { Request, Response } from "express";
// import { OrderModel } from "../../schema/order.schema";

// export const getOrderByIdGet = async (req: Request, res: Response) => {
//     try {
//         const { userId } = req.params; 

//         const orders = await OrderModel.find({ user: userId } as any)
//             .populate("foods")
//             .populate("user");

//         if (!orders || orders.length === 0) {
//             return res.status(404).json({ message: "Userd zahialga oldsongui" });
//         }

//         res.status(200).json({
//             message: "Hereglegchiin zahialguud",
//             data: orders
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Zahialga avahad aldaa garlaa" });
//     }
// };

import { Request, Response } from "express";
import { OrderModel } from "../../models";

export const getOrderByIdGet = async (req: any, res: Response) => {
    try {
        const userId = req.user.userId;

        const orders = await OrderModel.find({ user: userId } as any)
            .populate("foods.food")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: orders
        });
    } catch (error: any) {
        console.error("Order Fetch Error:", error.message);
        return res.status(500).json({ 
            success: false, 
            message: "Захиалгын түүх авахад алдаа гарлаа" 
        });
    }
};
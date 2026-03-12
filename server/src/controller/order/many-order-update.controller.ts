import { Request, Response } from "express";
import { OrderModel } from "../../schema/order.schema";

export const manyOrderUpdate = async (req: Request, res: Response) => {
    try {
        const { orderIds, newStatus } = req.body;

        if (!Array.isArray(orderIds) || orderIds.length === 0) {
            return res.status(400).json({ message: "Zahialgiin id jagsaalt hooson bn" });
        }

        const validStatuses = ["Pending", "Processing", "Delivered", "Cancelled"];
        if (!validStatuses.includes(newStatus)) {
            return res.status(400).json({ message: "buruu tuluv" });
        }

        const filter: any = { _id: { $in: orderIds } };
        const result = await OrderModel.updateMany(
            filter, 
            { $set: { status: newStatus } }
        );

        res.status(200).json({
            message: "Zahialgiin tuluv amjilttai shinchillee",
            updatedCount: result.modifiedCount
        });

    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ message: "Aldaa garlaa" });
    }
};
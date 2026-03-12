import { Request, Response } from "express";
import { FoodModel, OrderModel } from "../../models";

export const createOrder = async (req: any, res: Response) => {
  try {
    const { foods, address } = req.body;
    const userId = req.user.userId;

    if (!foods || foods.length === 0) {
      return res.status(400).json({ message: "Сагс хоосон байна" });
    }

    const foodCalculations = await Promise.all(
      foods.map(async (item: any) => {
        const food = await FoodModel.findById(item.foodId);
        if (!food) throw new Error(`Хоол олдсонгүй: ${item.foodId}`);
        
        return {
          foodId: food._id,
          price: food.foodPrice,
          quantity: item.quantity
        };
      })
    );

    const subTotal = foodCalculations.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);

    const deliveryFee = 5000;
    const totalPrice = subTotal + deliveryFee;

    const newOrder = await OrderModel.create({
      user: userId,
      foods: foodCalculations.map(f => ({
        food: f.foodId, 
        quantity: f.quantity
      })),
      totalPrice: totalPrice,
      address: address, 
      status: "Pending"
    });

    res.status(201).json({
      message: "Захиалга амжилттай үүслээ",
      order: newOrder
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};



// export const createOrder = async (req: any, res: Response) => {
//   try {
//     const { foods, address } = req.body;
//     const userId = req.user.userId;

//     if (!foods || foods.length === 0) {
//       return res.status(400).json({ message: "Sags khooson байна" });
//     }

//     const foodCalculations = await Promise.all(
//       foods.map(async (item: any) => {
//         const food = await FoodModel.findById(item.foodId);
//         if (!food) {
//           throw new Error(`Food oldsongui: ${item.foodId}`);
//         }
//         return {
//           foodId: food._id,
//           foodPrice: food.foodPrice, 
//           quantity: item.quantity
//         };
//       })
//     );

//     const subTotal = foodCalculations.reduce((sum, item) => {
//       return sum + (Number(item.price || 0) * item.quantity);
//     }, 0);

//     const deliveryFee = 5000;
//     const totalPrice = subTotal + deliveryFee;

//     const newOrder = await OrderModel.create({
//       user: userId,
//       foods: foodCalculations.map(f => ({
//         food: f.foodId,
//         quantity: f.quantity
//       })),
//       totalPrice: totalPrice,
//       address: address,
//       status: "Pending"
//     });

//     res.status(201).json({
//       message: "Amjilttai zahialga uusgegdlee",
//       order: newOrder
//     });
//   } catch (error: any) {
//     console.error("Order Error:", error.message);
//     res.status(500).json({ message: error.message || "Aldaa garlaa" });
//   }
// };
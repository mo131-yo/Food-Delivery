import { UserModel } from "../../models";

export const getMe = async (req: any, res: any) => {
  try {
    const currentUserId = req.user.userId || req.user.id;

    if (!currentUserId) {
      return res.status(401).json({ message: "Токен дотор хэрэглэгчийн мэдээлэл алга" });
    }

    const user = await UserModel.findById(currentUserId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Хэрэглэгч олдсонгүй" });
    }

    res.status(200).json(user);
  } catch (error: any) {
    console.error("GetMe Error:", error.message);
    res.status(500).json({ message: "Серверийн алдаа гарлаа" });
  }
};
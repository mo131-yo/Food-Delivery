import cors from "cors";
import { configDotenv } from "dotenv";
import express, { Application, Request, Response } from "express";
import connectToMongoDB from "./mongoDb";
import { foodCategoryRouter, foodRouter, userRouter } from "./router";
import { UserModel } from "./schema/user.schema";
import { orderRouter } from "./router/order.router";


configDotenv();

const app: Application = express();

app.use(express.json());

const allowedOrigins = [
  "https://food-delivery-s682.onrender.com",
  "https://food-delivery-iota-five.vercel.app",
  "http://localhost:3000",   
  "http://localhost:8000"  
];


app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));


//   origin: "*",
//   credentials: true
// }));
app.use(express.json());




app.get("/", (req, res) => {
    res.send("Server is running!");
});


app.get("/get-users", async (req: Request, res: Response) => {
    const users = await UserModel.find({});
    res.status(200).send({ message: "users avlaa", data: users });
});

app.use('/users', userRouter);
app.use("/foods", foodRouter);
app.use("/foods-category", foodCategoryRouter);
app.use("/foods-order", orderRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
    try {
        await connectToMongoDB();
        console.log(`Server is running on port ${PORT}`);
    } catch (err) {
        console.error("MongoDB connection failed:", err);
    }
});
// // app.listen(8000, () => console.log("http://localhost:8000"));
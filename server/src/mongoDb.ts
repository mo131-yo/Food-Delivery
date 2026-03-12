import mongoose from "mongoose";

const connectToMongoDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING!)
        console.log("Connect to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDb", error)
    }
}
export default connectToMongoDB;

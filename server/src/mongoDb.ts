// import mongoose from "mongoose";

// const connectToMongoDB = async ()=>{
//     try{
//         await mongoose.connect(process.env.MONGODB_CONNECTION_STRINGz!)
//         console.log("Connect to MongoDB");
//     } catch (error) {
//         console.error("Error connecting to MongoDb", error)
//     }
// }
// export default connectToMongoDB;


import mongoose from "mongoose";

const connectToMongoDB = async () => {
    const mongoUri = process.env.MONGODB_CONNECTION_STRING;

    if (!mongoUri) {
        console.error("Error: MONGODB_CONNECTION_STRING is undefined. Check your .env file.");
        return;
    }

    try {
        await mongoose.connect(mongoUri);
        console.log("Connect to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDb", error);
    }
}

export default connectToMongoDB;
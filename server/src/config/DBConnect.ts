import mongoose from "mongoose";
import CONFIG from "./config";

const dbConnect = async () => {
  try {
    const connection = await mongoose.connect(`${process.env.MONGODB_URI}`, {
      dbName: CONFIG.DB_NAME,
    });
    console.log("connected to database");
   
  } catch (error) {
    console.log("error", error);
  }
};

export default dbConnect;

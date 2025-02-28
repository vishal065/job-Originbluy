import mongoose from "mongoose";
import CONFIG from "./config";

const dbConnect = async () => {
  try {
    const connection = await mongoose.connect(`${process.env.MONGODB_URI}`, {
      dbName: CONFIG.DB_NAME,
    });
    console.info("connected to database");
   
  } catch (error) {
    console.error("error", error);
  }
};

export default dbConnect;

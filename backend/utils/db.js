import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";

import express from "express";

const app = express();

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    app.on("Error: ", (error) => {
      console.log("ERR: ", error);
      throw error;
    })
    console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
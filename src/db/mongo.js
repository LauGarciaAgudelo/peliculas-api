import mongoose from "mongoose";
import { env } from "../config/env.js";

export async function connectDB() {
  if (!env.mongoUri) throw new Error("MONGO_URI is missing in .env");

  await mongoose.connect(env.mongoUri);
  console.log("✅ MongoDB connected");
}
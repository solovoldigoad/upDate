import mongoose from "mongoose";

interface Connection {
  isConnected?: number;
}

const connection: Connection = {}; // Store connection status globally

export default async function connectDB() {
  if (connection.isConnected) {
    console.log("Using existing database connection");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI as string);

    connection.isConnected = db.connections[0].readyState; // 1 means connected
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    throw new Error("Database connection failed");
  }
};

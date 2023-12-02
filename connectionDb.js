import mongoose from "mongoose";

export const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("MongoDB connected!");
  } catch (error) {
    throw error;
  }
};

export const ifDisconnect = async () => {
  try {
    mongoose.connection.on("disconnected", () => {
      console.log("mongoDB disconnected!");
    });
  } catch (error) {
    throw error;
  }
};

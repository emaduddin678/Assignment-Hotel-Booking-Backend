import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("MongoDB connected!");
  } catch (error) {
    throw error;
  }
};

const ifDisconnect = async () => {
  try {
    mongoose.connection.on("disconnected", () => {
      console.log("mongoDB disconnected!");
    });
  } catch (error) {
    throw error;
  }
};

export { connect, ifDisconnect };

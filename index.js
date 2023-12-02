import express from "express";
import dotenv from "dotenv";
// import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connect, ifDisconnect } from "./connectionDb.js";

const app = express();
dotenv.config();

connect();
ifDisconnect();
 
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "https://thriving-pothos-1a3c36.netlify.app",
    ],
    credentials: true, 
  })
);

app.use(express.json());
app.use(cookieParser()); 

app.get("/", (req, res) => {
  // console.log(connect())
  res.send("Server is working!!");
});
app.post("/emad", (req, res) => {
  res.send(req.body.name);
});

app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/users", usersRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8800, () => {
  console.log("Server is running at http://localhost:8800");
});

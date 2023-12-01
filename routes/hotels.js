import express from "express";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";
import { countByCity, countByType, createHotel, deleteHotel, getAllHotel,  getHotelRooms, getSingleHotel, updateHotel } from "../controllers/hotelController.js";
import { verifyAdmin } from "../utils/verifyToken.js";
import upload from "../middleware/Upload.js";

const router = express.Router();

// CREATE
router.post("/", upload.array('photos', 5), createHotel);

// UPDATE
router.put("/:id", verifyAdmin, updateHotel);

// DELETE
router.delete("/:id", verifyAdmin, deleteHotel);


// GET ALL
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/", getAllHotel);
router.get("/room/:id", getHotelRooms);


// GET Single
router.get("/find/:id", getSingleHotel);

router.get("/register", (req, res) => {
  res.send("Hello, this is hotels endpoint!");
});

export default router;

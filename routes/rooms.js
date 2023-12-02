import express from "express";
import { verifyAdmin } from "../utils/verifyToken.js";
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getSingleRoom,
  updateRoom,
  updateRoomAvailability,
} from "../controllers/roomController.js";

const router = express.Router();

// CREATE
router.post("/:hotelid",  createRoom);

// // UPDATE
router.put("/availability/:id", updateRoomAvailability);
router.put("/:id", verifyAdmin, updateRoom);

// // DELETE
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

// // GET Single
router.get("/:id", getSingleRoom);

// // GET ALL
// router.get("/", getAllRooms);

router.get("/", (req, res) => {
  res.send("Hello, this is rooms endpoint!");
});

router.get("/register", (req, res) => {
  res.send("Hello, this is rooms endpoint!");
});

export default router;

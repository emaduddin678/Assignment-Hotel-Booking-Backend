import express from "express";
import { deleteUser, getAllUser, getSingleUser, updateUser } from "../controllers/userController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/", (req, res) => {
//   res.send("Hello, this is users endpoint!"); 
// });



// router.get("/check", verifyToken, (req, res) => {
//   res.send("Hello, this is users endpoint!");
// });

// router.get("/checkuser/:id", verifyUser, (req, res) => {
//   res.send("you are logged in you can delete your account!");
// });

// router.get("/checkAdmin/:id", verifyAdmin, (req, res) => {
//   res.send("you are logged in you can delete your account!");
// });


// UPDATE
router.put("/:id", verifyUser, updateUser);

// DELETE
router.delete("/:id", verifyUser, deleteUser);

// GET Single 
router.get("/:id", verifyUser,  getSingleUser);

// GET ALL
router.get("/",  getAllUser);
// router.get("/", verifyAdmin, getAllUser);



export default router; 

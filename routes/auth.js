import express from "express";
import { login, register } from "../controllers/authController.js";
import upload from "../middleware/Upload.js";

const router = express.Router();


router.post("/register", upload.single("img"), register);
router.post("/login", login);

export default router;

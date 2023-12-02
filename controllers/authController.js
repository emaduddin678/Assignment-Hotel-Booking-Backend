import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
// import upload from "../middleware/Upload.js";

export const register = async (req, res, next) => {
  // res.send({  body: req.body, file:req.file.buffer });
  //  const fileBuffer = req.file.buffer;
  //  const info = req.body;
  //  res.send({ file: fileBuffer, info });

  // try {
  //   const image = {
  //     data: req.file.buffer,
  //     contentType: req.file.mimetype,
  //   };
  //   res.send({ test: true, image });
  // } catch (error) {
  //   res.send({ test: false, error });
  // }
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    // const imageBlob = await response.blob();
    // console.log(imageBlob);
    // imageUrl = URL.createObjectURL(imageBlob);
    // console.log(imageUrl);

    const newUser = new User({
      ...req.body,
      password: hash,
      img: {
        data: req.file.buffer.toString("base64"),
        contentType: req.file.mimetype,
      },
    });
    // const img = {
    //   data: req.file.buffer.toString("base64"),
    //   contentType: req.file.mimetype,
    // };
    // res.send(img);
    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password for username"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );

    const { password, isAdmin, ...otherDetails } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json({
        details: { ...otherDetails },
        isAdmin,
        token: token,
        success: true,
      });
  } catch (error) {
    next(error);
  }
};

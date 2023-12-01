import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(404, "You are not auhtenticated!"));
  }

  // invalid token - synchronous
  try {
    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return next(createError(404, "Token is not valid!"));
  }
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res,next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      next(createError(403, "You are not authorized!"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      next(createError(403, "You are not authorized!"));
    }
  });
};

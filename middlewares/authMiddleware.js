import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if (err) {
          console.log(err.message);
          res.redirect("auth/login");
        } else {
          next();
        }
      });
    } else {
      res.redirect("auth/login");
    }
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: "Not Authenticated",
    });
  }
};

const checkUser = async (req, res, next) => {
  const token = req.cookies?.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        res.locals.user = await User.findById(decoded.userId);
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

export { authenticateToken, checkUser };

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js";
import { CustomError } from "../error/custom.js";

const authUser = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) throw new CustomError("Authentication invalid", 401);
  const token = authorization.split(" ")[1];
  try {
    const { id } = jwt.verify(token, process.env.KEY);
    const user = await User.findById(id);

    user ? (req.user = user) : null;
    next();
  } catch (error) {
    throw new CustomError("Authentication invalid", 401);
  }
};
export default authUser;

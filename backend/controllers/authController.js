import User from "../models/user.js";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  if (!validator.isEmail(email)) return;
  if (!validator.isStrongPassword(password)) return;
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt(password, salt);
  const newBody = { ...req.body, password: hashedPass };
  const user = new User(newBody);
  await user.save();
  res.status(201).json({ data: user });
};

const loginUser = async () => {
  const { email, password } = req.body;
  const preUser = await User.findOne(email);
  if (!preUser) return;
  const match = await bcrypt.compare(password, preUser.password);
  if (!match) return;
  const token = jwt.sign(
    { id: preUser._id, name: preUser.userName },
    process.env.KEY
  );
  delete preUser.password;
  res.status(201).json({ data: { token, user: preUser } });
};
export { loginUser, signupUser };

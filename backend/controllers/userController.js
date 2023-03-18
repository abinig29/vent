import User from "../models/user.js";
import Vent from "../models/vent.js";
import { CustomError } from "../error/custom.js";
const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) throw new CustomError("no user is found", 404);
  res.status(200).json({ data: user });
};

const getUsers = async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword);
  res.status(200).json({ data: users });
};
const editUser = async (req, res) => {
  const { id } = req.params;
  if (!id == req.user._id.toString())
    throw new CustomError("this isnt you ", 401);
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashPass;
  }
  const user = await User.findByIdAndUpdate(id, req.body, { new: true });
  if (!user) return;
  res.status(200).json({ data: user });
};
const saveThought = async (req, res) => {
  const { ventId } = req.body;
  const vent = await Vent.findById(ventId);
  console.log(vent);

  if (req.user._id.toString() === vent.userId) {
    throw new CustomError("you cant save your own vents ", 400);
  }
  let user = await User.findById(req.user._id.toString());

  if (user.savedThoughts.includes(ventId))
    throw new CustomError("vent is already in your list", 400);
  await user.updateOne({ $push: { savedThoughts: ventId } });
  user = await User.findById(req.user._id.toString());
  res.status(200).json({ data: user });
};
const rmSaveThought = async (req, res) => {
  const { ventId } = req.body;
  const vent = await Vent.findById(ventId);
  //   if (req.user._id == vent.userId) return;
  let user = await User.findById(req.user._id.toString());
  if (!user.savedThoughts.includes(ventId))
    throw new CustomError("vent isnt in your saved list ", 400);
  console.log("A");
  await user.updateOne({ $pull: { savedThoughts: ventId } });
  user = await User.findById(req.user._id.toString());
  res.status(200).json({ data: user });
};

const getSavedTohughts = async (req, res) => {
  const user = await User.findById(req.user._id.toString());
  const vents = await Promise.all(
    user.savedThoughts.map((ventId) => {
      return Vent.find({ _id: ventId });
    })
  );
  res.status(200).json({ data: vents });
};

const followUnfollowUser = async (req, res) => {
  const { friendId } = req.body;
  const { _id: id } = req.user;
  const user = await User.findById(id);
  const friend = await User.findById(friendId);

  if (user.lisetning.includes(friendId)) {
    user.lisetning = user.lisetning.filter((id) => id !== friendId);
    friend.listener = friend.listener.filter((id) => id !== id);
  } else {
    user.lisetning.push(friendId);
    friend.listener.push(id);
  }

  await user.save();
  await friend.save();

  res.status(200).json({ data: user });
};
export {
  getUser,
  getUsers,
  editUser,
  saveThought,
  rmSaveThought,
  getSavedTohughts,
  followUnfollowUser,
};

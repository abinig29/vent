import Vent from "../models/vent.js";
import User from "../models/user.js";
import Comment from "../models/comment.js";
import { CustomError } from "../error/custom.js";
import { reactToVent, shuffleArray } from "../helperFunctions.js";
import Notification from "../models/notification.js";

const getVent = async (req, res) => {
  const { id } = req.params;

  const vent = await Vent.findById(id);
  if (!vent) throw new CustomError("no vent is found", 404);
  res.status(200).json({ data: vent });
};

const getAllVent = async (req, res) => {
  let query = {};

  if (req.query.tags) {
    const tags = req.query.tags.spilt(" ");
    query.tags = { $in: tags };
  }
  let limit = req.query.limit || 4;
  let page = req.query.page || 1;
  const skip = (page - 1) * limit;
  let vent = await Vent.find(query).limit(limit).skip(skip).sort("-createdAt");
  vent = shuffleArray(vent);
  res.status(200).json({ data: vent });
};

const editVent = async (req, res) => {
  const { id } = req.params;
  const vent = await Vent.findById(id);
  if (!vent) throw new CustomError("no user is found", 404);
  if (req.user._id !== vent.userId)
    throw new CustomError("this isnt your vent", 401);
  const updatedVent = await Vent.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json({ data: updatedVent });
};

const getVentComment = async (req, res) => {
  const { id } = req.params;
  const comments = await Comment.find({ ventId: id }).sort("-createdAt");
  res.status(200).json({ data: comments });
};

const surprized = async (req, res) => {
  const { id } = req.params;
  const { _id: otherId } = req.user;
  let vent = await Vent.findById(id);
  let curUser = await User.findById(otherId.toString());
  if (!vent) throw new CustomError("no vent is found", 404);
  await reactToVent(req, vent, curUser, ["surprized", "hug", "smile"]);
  vent = await Vent.findById(id);
  curUser = await User.findById(otherId.toString());
  res.status(201).json({ data: { vent, curUser } });
};
const hug = async (req, res) => {
  const { id } = req.params;
  const { _id: otherId } = req.user;
  let curUser = await User.findById(otherId.toString());
  let vent = await Vent.findById(id);
  if (!vent) throw new CustomError("no vent is found", 404);
  await reactToVent(req, vent, curUser, ["hug", "surprized", "smile"]);
  vent = await Vent.findById(id);
  curUser = await User.findById(otherId.toString());
  res.status(201).json({ data: { vent, curUser } });
};

const smile = async (req, res) => {
  const { id } = req.params;
  const { _id: otherId } = req.user;
  let curUser = await User.findById(otherId.toString());
  let vent = await Vent.findById(id);
  if (!vent) throw new CustomError("no vent is found", 404);
  await reactToVent(req, vent, curUser, ["smile", "hug", "surprized"]);
  vent = await Vent.findById(id);
  curUser = await User.findById(otherId.toString());
  res.status(201).json({ data: { vent, curUser } });
};
const saveThought = async (req, res) => {
  const { id } = req.params;
  const vent = await Vent.findById(id);
  if (req.user._id.toString() === vent.userId) {
    throw new CustomError("you cant save your own vents ", 400);
  }
  let user = await User.findById(req.user._id.toString());

  if (user.savedThoughts.includes(id))
    throw new CustomError("vent is already in your list", 400);
  await user.updateOne({ $push: { savedThoughts: id } });
  user = await User.findById(req.user._id.toString());
  res.status(200).json({ data: user });
};
const rmSaveThought = async (req, res) => {
  const { id } = req.params;
  const vent = await Vent.findById(id);
  //   if (req.user._id == vent.userId) return;
  let user = await User.findById(req.user._id.toString());
  if (!user.savedThoughts.includes(id))
    throw new CustomError("vent isnt in your saved list ", 400);

  await user.updateOne({ $pull: { savedThoughts: id } });
  user = await User.findById(req.user._id.toString());
  res.status(200).json({ data: user });
};
const createVent = async (req, res) => {
  const newVent = new Vent(req.body);
  await newVent.save();
  res.status(200).json({ data: newVent });
};

export {
  getVent,
  getAllVent,
  createVent,
  editVent,
  surprized,
  smile,
  hug,
  getVentComment,
  saveThought,
  rmSaveThought,
};

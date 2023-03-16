import Vent from "../models/vent.js";
import User from "../models/user.js";
import Comment from "../models/comment.js";

const getVent = async (req, res) => {
  const { id } = req.params;
  const vent = await Vent.findById(id);
  if (!vent) return;
  res.status(200).json({ data: vent });
};
const getLisetningVent = async (req, res) => {
  const user = User.findById(req.user._id);
  const unorderdVents = await Promise.all(
    user.lisetning.map((single) => {
      return Vent.find({ userId: single });
    })
  );
  const orderdVents = unorderdVents.map((vents) => {
    return vents.map((single) => {
      return single;
    });
  });
  res.status(200).json({ data: orderdVents });
};
const getAllVent = async (req, res) => {
  let query = {};
  if (req.quer.tags) {
    const tags = req.query.tags.spilt(" ");
    query.tags = { $in: tags };
  }
  const vent = await Vent.find(query);
  res.status(200).json({ data: vent });
};
const getUserVent = async (req, res) => {
  const vent = await Vent.find({ userId: req.user._id });
  res.status(200).json({ data: vent });
};
const createVent = async (req, res) => {
  const newVent = new Vent(req.body);
  await newVent.save();
  res.status(200).json({ data: newVent });
};

const editVent = async (req, res) => {
  const { id } = req.params;
  const vent = await Vent.findById(id);
  if (!vent) return;
  if (req.user._id !== vent.userId) return;
  const updatedVent = await Vent.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json({ data: updatedVent });
};

const getVentComment = async (req, res) => {
  const { id } = req.params;
  const comments = await Comment.find({ ventId: id });
  res.status(200).json({ data: comments });
};

const surprized = async (req, res) => {
  const { id } = req.params;
  const { _id: otherId } = req.user;
  const vent = await Vent.findById(id);
  if (!vent) return;
  if (vent.surprized.includes(otherId)) {
    await vent.updateOne({ $pull: { surprized: otherId } });
  } else if (!vent.surprized.includes(otherId)) {
    await vent.updateOne({ $push: { surprized: otherId } });
  }
  res.status(201).json({ data: vent });
};
const hug = async (req, res) => {
  const { id } = req.params;
  const { _id: otherId } = req.user;
  const vent = await Vent.findById(id);
  if (!vent) return;
  if (vent.hug.includes(otherId)) {
    await vent.updateOne({ $pull: { hug: otherId } });
  } else if (!vent.hug.includes(otherId)) {
    await vent.updateOne({ $push: { hug: otherId } });
  }
  res.status(201).json({ data: vent });
};

const feelingSame = async (req, res) => {
  const { id } = req.params;
  const { _id: otherId } = req.user;
  const vent = await Vent.findById(id);
  if (!vent) return;
  if (vent.feelingSame.includes(otherId)) {
    await vent.updateOne({ $pull: { feelingSame: otherId } });
  } else if (!vent.feelingSame.includes(otherId)) {
    await vent.updateOne({ $push: { feelingSame: otherId } });
  }
  res.status(201).json({ data: vent });
};
const smile = async (req, res) => {
  const { id } = req.params;
  const { _id: otherId } = req.user;
  const vent = await Vent.findById(id);
  if (!vent) return;
  if (vent.smile.includes(otherId)) {
    await vent.updateOne({ $pull: { smile: otherId } });
  } else if (!vent.smile.includes(otherId)) {
    await vent.updateOne({ $push: { smile: otherId } });
  }
  res.status(201).json({ data: vent });
};
export {
  getVent,
  getLisetningVent,
  getAllVent,
  createVent,
  editVent,
  surprized,
  smile,
  hug,
  feelingSame,
  getUserVent,
  getVentComment,
};

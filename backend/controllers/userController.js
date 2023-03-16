import User from "../models/user.js";
import Vent from "../models/vent.js";

const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) return;
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

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.status(200).json({ data: users });
};
const editUser = async (req, res) => {
  const { id } = req.params;
  if (!id == req.user_id) return;
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
  if (req.user._id == vent.userId) return;
  const user = await User.findById(id);
  if (user.savedThoughts.includes(ventId)) return;
  await user.updateOne({ $push: { savedThoughts: ventId } });
  res.status(200).json({ data: user });
};
const rmSaveThought = async (req, res) => {
  const { ventId } = req.body;
  const vent = await Vent.findById(ventId);
  //   if (req.user._id == vent.userId) return;
  const user = await User.findById(id);
  if (!user.savedThoughts.includes(ventId)) return;
  await user.updateOne({ $pull: { savedThoughts: ventId } });
  res.status(200).json({ data: user });
};

const getSavedTohughts = async (req, res) => {
  const user = await User.findById(req.user._id);
  const vents = await Promise.all(
    user.savedThoughts.map((ventId) => {
      return Vent.find({ userId: ventId });
    })
  );
  res.status(200).json({ data: vents });
};

const followUnfollowUser = async (req, res) => {
  const { friendId } = req.body;
  const { _id: id } = req.user;
  const user = await User.findById(id);
  const friend = await User.findById(friendId);

  if (user.friends.includes(friendId)) {
    user.friends = user.friends.filter((id) => id !== friendId);
    friend.friends = friend.friends.filter((id) => id !== id);
  } else {
    user.friends.push(friendId);
    friend.friends.push(id);
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

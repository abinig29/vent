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
const getUserVent = async (req, res) => {
  const vent = await Vent.find({ userId: req.params.id });
  res.status(200).json({ data: vent });
};

const getLisetningVent = async (req, res) => {
  const user = await User.findById(req.params.id);

  const unorderdVents = await Promise.all(
    user.lisetning.map((single) => {
      return Vent.find({ userId: single });
    })
  );
  // console.log(unorderdVents);
  let orderdVents = [];
  unorderdVents.forEach((vents) => {
    orderdVents = [...orderdVents, ...vents];
  });
  res.status(200).json({ data: orderdVents });
};
export {
  getUser,
  getUsers,
  editUser,
  getSavedTohughts,
  followUnfollowUser,
  getLisetningVent,
  getUserVent,
};

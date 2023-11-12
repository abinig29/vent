import User from "../models/user.js";
import Vent from "../models/vent.js";
import { CustomError } from "../error/custom.js";
import { shuffleArray } from "../helperFunctions.js";
import Notification from "../models/notification.js";

const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) throw new CustomError("no user is found", 404);
  res.status(200).json({ data: user });
};

const getUsers = async (req, res) => {
  const { _id: userId } = req.user;
  const keyword = req.query.search
    ? {
        $or: [{ userName: { $regex: req.query.search, $options: "i" } }],
        _id: { $ne: userId.toString() },
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
  const savedVents = await Promise.all(
    user.savedThoughts.map((ventId) => {
      return Vent.find({ _id: ventId });
    })
  );
  let orderdVents = [];
  savedVents.forEach((vents) => {
    orderdVents = [...orderdVents, ...vents];
  });
  let limit = req.query.limit || 4;
  let page = req.query.page || 1;
  const skip = (page - 1) * limit;
  orderdVents = orderdVents.slice(skip, skip + limit);
  res.status(200).json({ data: orderdVents });
};
const getReactedVents = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!req.params.id === req.user._id) {
    if (!user.showReactedVents) return new CustomError("hidden by the user");
  }
  let limit = req.query.limit || 4;
  let page = req.query.page || 1;
  const skip = (page - 1) * limit;
  const vents = await Vent.find({
    _id: { $in: user.reacted },
  })
    .limit(limit)
    .skip(skip);
  console.log({ vents });
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
  let limit = req.query.limit || 2;
  let page = req.query.page || 1;
  const skip = (page - 1) * limit;
  const vent = await Vent.find({ userId: req.params.id })
    .skip(skip)
    .limit(limit)
    .sort("-createdAt");
  res.status(200).json({ data: vent });
};

const getLisetningVent = async (req, res) => {
  const user = await User.findById(req.params.id);
  let limit = req.query.limit || 4;
  let page = req.query.page || 1;
  const skip = (page - 1) * limit;
  const vents = await Vent.find({
    userId: { $in: user.lisetning },
  })
    .limit(limit)
    .skip(skip);
  console.log(vents);
  res.status(200).json({ data: vents });
};
const getNotification = async (req, res) => {
  const { _id: id } = req.user;
  const notifications = await Notification.find({ receiverId: id });
  const unseenNotifications = await Notification.find({
    receiverId: id,
    seen: false,
  });

  res
    .status(200)
    .json({ data: { notifications, unseen: unseenNotifications.length } });
};
const seenComment = async (req, res) => {
  const comment = await Notification.updateMany({
    receiverId: req.user._id,
    seen: true,
  });
  const newComment = await Notification.find({
    receiverId: req.user._id,
  });
  res.json({ data: { notifications: newComment, unseen: 0 } });
};

const getLisetningUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  let lisetningUser = await Promise.all(
    user.lisetning.map((single) => {
      return User.find({ _id: single });
    })
  );
  let resData;
  if (lisetningUser.length < 5) {
    resData = lisetningUser;
  } else {
    // lisetningUser = shuffleArray(lisetningUser);
    resData = lisetningUser.slice(0, 5);
  }
  let orderdVents = [];
  resData.forEach((vents) => {
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
  getLisetningUser,
  getReactedVents,
  getNotification,
  seenComment,
};

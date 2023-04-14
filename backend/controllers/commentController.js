import Comment from "../models/comment.js";
import Notification from "../models/notification.js";
import Vent from "../models/vent.js";

const createComment = async (req, res) => {
  const newComment = new Comment(req.body);
  await newComment.save();
  const vent = await Vent.findById(req.body.ventId);
  await vent.updateOne({ $push: { comment: req.body.userId } });
  const notification = await Notification.create({
    notificationType: "commented",
    senderId: req.user._id,
    senderUserName: req.user.userName,
    senderPhoto: req.user.coverPhoto,
    receiverId: vent.userId,
    ventId: vent._id,
    ventText: vent.ventText,
  });
  res.status(200).json({ data: newComment });
};
export { createComment };

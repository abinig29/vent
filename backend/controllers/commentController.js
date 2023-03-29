import Comment from "../models/comment.js";
import Vent from "../models/vent.js";

const createComment = async (req, res) => {
  const newComment = new Comment(req.body);
  await newComment.save();
  const vent = await Vent.findById(req.body.ventId);
  await vent.updateOne({ $push: { comment: req.body.userId } });
  res.status(200).json({ data: newComment });
};
export { createComment };

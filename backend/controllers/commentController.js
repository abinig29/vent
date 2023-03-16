import Comment from "../models/comment.js";

const createComment = async (req, res) => {
  const newComment = new Comment(req.body);
  await newComment.save();
  res.status(200).json({ data: newComment });
};
export { createComment };

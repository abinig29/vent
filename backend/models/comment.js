import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    ventId: {
      type: String,
      required: true,
    },
    userPicturePath: String,
    userName: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);
export default mongoose.model("comment", commentSchema);

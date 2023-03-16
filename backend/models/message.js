import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: String,
      required: true,
    },
    chatUsersId: {
      type: String,
      required: true,
    },
    userPicturePath: String,
    messgae: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Chat", messageSchema);

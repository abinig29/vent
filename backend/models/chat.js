import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    chatName: {
      type: String,
      required: true,
    },
    chatUsersId: {
      type: [String],
    },
    isGroupChat: Boolean,
    groupChatDescription: String,
    groupChatPhoto: String,
    groupChatAdmin: String,
  },
  { timestamps: true }
);
export default mongoose.model("Chat", chatSchema);

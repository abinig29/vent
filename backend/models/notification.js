import mongoose, { model } from "mongoose";
const notificationSchema = new mongoose.Schema({
  notificationType: {
    type: String,
    enum: ["reacted", "posted", "commented"],
    required: true,
  },
  senderId: {
    type: String,
    required: true,
  },
  senderUserName: {
    type: String,
    required: true,
  },
  senderPhoto: {
    type: String,
    required: true,
  },
  receiverId: {
    type: String,
    required: true,
  },
  ventId: {
    type: String,
    required: true,
  },
  ventText: {
    type: String,
    required: false,
  },
  seen: {
    type: Boolean,
    default: false,
  },
});
export default mongoose.model("Notification", notificationSchema);

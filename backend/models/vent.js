import mongoose from "mongoose";

const ventSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    userPicturePath: String,
    userName: {
      type: String,
      required: true,
    },
    ventMood: {
      type: String,
      required: false,
    },
    feelingSame: {
      type: [String],
      default: [],
    },
    hug: {
      type: [String],
      default: [],
    },
    smile: {
      type: [String],
      default: [],
    },
    surprized: {
      type: [String],
      default: [],
    },
    tags: {
      type: [String],
    },
  },
  { timestamps: true }
);
export default mongoose.model("Vent", ventSchema);

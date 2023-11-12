import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "need to enter user name"],
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "need to enter email"],
      unique: [true, "user already exist"],
    },
    password: {
      type: String,
      required: [true, "need to enter password"],
      min: 5,
    },
    bio: {
      type: String,
      required: false,
    },
    coverPhoto: String,
    listener: {
      type: [String],
      default: [],
    },
    lisetning: {
      type: [String],
      default: [],
    },
    reacted: {
      type: [String],
      default: [],
    },
    showReactedVents: {
      type: Boolean,
      default: true,
    },
    savedThoughts: {
      type: [String],
      default: [],
    },
    isAdmin: {
      type: String,
      default: "user",
      enum: {
        values: ["user", "admin"],
        message: "invalid role",
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);

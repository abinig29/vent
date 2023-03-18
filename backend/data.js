import mongoose from "mongoose";
const id = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];
const commentId = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];
const vent = [
  {
    _id: id[0],
    userId: "6415a045d7154777b2bc3121",
    userPicturePath: "abel.png",
    userName: "abel",
    ventMood: "tired",
    ventText: "i am scared buddy",
    tags: ["afraied"],
  },
  {
    _id: id[1],
    userId: "6415a045d7154777b2bc3121",
    userPicturePath: "abel.png",
    userName: "abel",
    ventMood: "tried",
    ventText: "i am funny buddy",
    tags: ["funny"],
  },
  {
    _id: id[2],
    userId: "6415a045d7154777b2bc3121",
    userPicturePath: "abel.png",
    userName: "abel",
    ventMood: "obssed",
    ventText: "i am not cool",
    tags: ["cool"],
  },
  {
    _id: id[3],
    userId: "6415a045d7154777b2bc3121",
    userPicturePath: "abel.png",
    userName: "abel",
    ventMood: "dead",
    ventText: "i am dead buddy",
    tags: ["dead"],
  },
  {
    _id: id[4],
    userId: "6415aa9a67eb7fe5042d4e9c",
    userPicturePath: "abel.png",
    userName: "eden",
    ventMood: "tired",
    ventText: "i am scared buddy",
    tags: ["afraied"],
  },
  {
    _id: id[5],
    userId: "6415aa9a67eb7fe5042d4e9c",
    userPicturePath: "abel.png",
    userName: "eden",
    ventMood: "tired",
    ventText: "i am scared buddy",
    tags: ["afraied"],
  },
];

const comment = [
  {
    _Id: commentId[0],
    userId: "6415a045d7154777b2bc3121",
    ventId: id[0],
    userPicturePath: "abel.png",
    userName: "abel",
    comment: "nice",
  },
  {
    _Id: commentId[1],
    userId: "6415a045d7154777b2bc3121",
    ventId: id[1],
    userPicturePath: "abel.png",
    userName: "abel",
    comment: "cool",
  },
];
export { comment, vent };

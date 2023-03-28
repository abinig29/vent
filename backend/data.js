import mongoose from "mongoose";
const id = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
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
    userPicturePath:
      "https://tse3.mm.bing.net/th?id=OIP.KdBSw8TPL34eU6T7bjhpAAHaLH&pid=Api&P=0",
    userName: "abel",
    ventMood: "tired",
    ventText:
      "I need to vent Friends with benefits is good right like its ohkay i want that like no sex buh making out and acting like nothing happened thats what we guys want please girls be like this too like mutual sexual support",
    tags: ["afraied"],
    comment: [],
  },
  {
    _id: id[1],
    userId: "6415a045d7154777b2bc3121",
    userPicturePath:
      "https://tse3.mm.bing.net/th?id=OIP.KdBSw8TPL34eU6T7bjhpAAHaLH&pid=Api&P=0",
    userName: "abel",
    ventMood: "tried",
    ventText:
      "It’s not a vent. Just wanna say it Today I figured out that expectation is killing us we deserve what we give but can we stop expecting please . Don’t expect anything from anyone otherwise u will lose everything even yourself ",
    tags: ["funny"],
    comment: [],
  },
  {
    _id: id[2],
    userId: "6415a045d7154777b2bc3121",
    userPicturePath:
      "https://tse3.mm.bing.net/th?id=OIP.KdBSw8TPL34eU6T7bjhpAAHaLH&pid=Api&P=0",
    userName: "abel",
    ventMood: "obssed",
    ventText:
      "I'm starting to scare myself a lot. I can't control my anger and my mouth. I am mean for no reason. I don't feel guilty about anything ive done wrong. I don't care if people are mad at me ( my family members ) . I never said it out loud but I love the idea of devilish things . I hate interacting with people. I don't feel sad about anything or anyone. I wasn't like this before I used to be sooo nice and caring.",
    tags: ["cool"],
    comment: [],
  },
  {
    _id: id[3],
    userId: "6415aa9a67eb7fe5042d4e9c",
    userPicturePath:
      "https://tse4.mm.bing.net/th?id=OIP.qNrVXIwxk2LmIrpRLAeEUQHaE8&pid=Api&P=0",
    userName: "abel",
    ventMood: "dead",
    ventText:
      "I need to vent I am 20 M What i wanted to say is i  am addicted wz wanking i wank every day and i know it iz not moral plus i regret it right in the moment after i did it so what do u give me guys need help",
    tags: ["dead"],
    comment: [],
  },
  {
    _id: id[4],
    userId: "6415aa9a67eb7fe5042d4e9c",
    userPicturePath:
      "https://tse4.mm.bing.net/th?id=OIP.qNrVXIwxk2LmIrpRLAeEUQHaE8&pid=Api&P=0",
    userName: "eden",
    ventMood: "tired",
    ventText:
      "Man 30 almost Many of you might say what you doin here don’t you have a job or sth Or that’s what I thought ; Anyway I was wondering what women think of men who only know one woman in their lives. Do you think that is stupid?",
    tags: ["afraied"],
    comment: [],
  },
  {
    _id: id[5],
    userId: "6415aa9a67eb7fe5042d4e9c",
    userPicturePath:
      "https://tse4.mm.bing.net/th?id=OIP.qNrVXIwxk2LmIrpRLAeEUQHaE8&pid=Api&P=0",
    userName: "eden",
    ventMood: "tired",
    ventText:
      "Been a while since I did one of these ... oof I'm nervous ... I'm at a critical stage rn . Im so close but deep down I know how it ends... I been in somewhat similar situations and it ends with me failing... the results should be out by the time this vent is approved,  so I writing this to let out a lil frustration ... if I make it I'll laugh at this vent, if I didn't then to future me, you gave it ur all. ik it's been rough but you can't stop now. You got make it worth all the shit that I, you, and all the past us been thru ... stand firm ma man it's gonna be a long ride",
    tags: ["afraied"],
    comment: [],
  },
  {
    _id: id[6],
    userId: "642138ea5ec38869e77d0ba0",
    userPicturePath:
      "https://tse1.mm.bing.net/th?id=OIP.kak_5rFDZ7LhCi8KkPWd_wHaN6&pid=Api&P=0",
    userName: "abrsh",
    ventMood: "dead",
    ventText:
      "I need to vent I am 20 M What i wanted to say is i  am addicted wz wanking i wank every day and i know it iz not moral plus i regret it right in the moment after i did it so what do u give me guys need help",
    tags: ["dead"],
    comment: [],
  },
  {
    _id: id[7],
    userId: "642138ea5ec38869e77d0ba0",
    userPicturePath:
      "https://tse1.mm.bing.net/th?id=OIP.kak_5rFDZ7LhCi8KkPWd_wHaN6&pid=Api&P=0",
    userName: "abrsh",
    ventMood: "tired",
    ventText:
      "Man 30 almost Many of you might say what you doin here don’t you have a job or sth Or that’s what I thought ; Anyway I was wondering what women think of men who only know one woman in their lives. Do you think that is stupid?",
    tags: ["afraied"],
    comment: [],
  },
  {
    _id: id[8],
    userId: "642138ea5ec38869e77d0ba0",
    userPicturePath:
      "https://tse1.mm.bing.net/th?id=OIP.kak_5rFDZ7LhCi8KkPWd_wHaN6&pid=Api&P=0",
    userName: "abrsh",
    ventMood: "tired",
    ventText:
      "Been a while since I did one of these ... oof I'm nervous ... I'm at a critical stage rn . Im so close but deep down I know how it ends... I been in somewhat similar situations and it ends with me failing... the results should be out by the time this vent is approved,  so I writing this to let out a lil frustration ... if I make it I'll laugh at this vent, if I didn't then to future me, you gave it ur all. ik it's been rough but you can't stop now. You got make it worth all the shit that I, you, and all the past us been thru ... stand firm ma man it's gonna be a long ride",
    tags: ["afraied"],
    comment: [],
  },
];

const comment = [
  {
    _Id: commentId[0],
    userId: "6415a045d7154777b2bc3121",
    ventId: "64215f3fbcbf5a03590344ab",
    userPicturePath:
      "https://tse3.mm.bing.net/th?id=OIP.KdBSw8TPL34eU6T7bjhpAAHaLH&pid=Api&P=0",
    userName: "abel",
    comment: "nice",
  },
  {
    _Id: commentId[1],
    userId: "642138ea5ec38869e77d0ba0",
    ventId: "64215f3fbcbf5a03590344ab",
    userPicturePath: "abel.png",
    userName: "abrsh",
    comment: "cool",
  },
  {
    _Id: commentId[0],
    userId: "6415a045d7154777b2bc3121",
    ventId: "64215f3fbcbf5a03590344ab",
    userPicturePath:
      "https://tse3.mm.bing.net/th?id=OIP.KdBSw8TPL34eU6T7bjhpAAHaLH&pid=Api&P=0",
    userName: "abel",
    comment: "nice",
  },
  {
    _Id: commentId[1],
    userId: "6415aa9a67eb7fe5042d4e9c",
    ventId: "64215f3fbcbf5a03590344ab",
    userPicturePath:
      "https://tse4.mm.bing.net/th?id=OIP.qNrVXIwxk2LmIrpRLAeEUQHaE8&pid=Api&P=0",
    userName: "eden",
    comment: "cool",
  },
  {
    _Id: commentId[0],
    userId: "6415aa9a67eb7fe5042d4e9c",
    ventId: "64215f3fbcbf5a03590344ad",
    userPicturePath:
      "https://tse4.mm.bing.net/th?id=OIP.qNrVXIwxk2LmIrpRLAeEUQHaE8&pid=Api&P=0",
    userName: "eden",
    comment: "it is grate having u back",
  },
  {
    _Id: commentId[1],
    userId: "6415a045d7154777b2bc3121",
    ventId: "64215f3fbcbf5a03590344ad",
    userPicturePath:
      "https://tse3.mm.bing.net/th?id=OIP.KdBSw8TPL34eU6T7bjhpAAHaLH&pid=Api&P=0",
    userName: "abel",
    comment: "u need to stay strong buddy",
  },
];
export { comment, vent };

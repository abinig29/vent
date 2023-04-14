import Notification from "./models/notification.js";
export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
export async function reactToVent(req, vent, curUser, type) {
  if (vent[type[0]].includes(curUser._id.toString())) {
    await vent.updateOne({ $pull: { [type[0]]: curUser._id } });
    if (
      !(
        vent[type[1]].includes(curUser._id) ||
        vent[type[2]].includes(curUser._id)
      )
    ) {
      await Notification.findOneAndRemove({
        notificationType: "reacted",
        ventId: vent._id,
        senderId: curUser._id,
      });
      await curUser.updateOne({ $pull: { reacted: vent._id } });
    }
  } else if (!vent[type[0]].includes(curUser._id)) {
    await vent.updateOne({ $push: { [type[0]]: curUser._id } });
    const preNotification = await Notification.find({
      notificationType: "reacted",
      ventId: vent._id,
      senderId: curUser._id,
    });

    if (vent.userId != curUser._id && !preNotification.length) {
      await Notification.create({
        notificationType: "reacted",
        senderId: curUser._id,
        senderUserName: req.user.userName,
        senderPhoto: req.user.coverPhoto,
        receiverId: vent.userId,
        ventId: vent._id,
        ventText: vent.ventText,
      });
    }
    if (!curUser.reacted.includes(vent._id))
      await curUser.updateOne({ $push: { reacted: vent._id } });
  }
}

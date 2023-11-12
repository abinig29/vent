import express from "express";
import authUser from "../middleware/auth.js";

import {
  getUser,
  getUsers,
  editUser,
  getSavedTohughts,
  followUnfollowUser,
  getUserVent,
  getLisetningVent,
  getLisetningUser,
  getReactedVents,
  getNotification,
  seenComment,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/").get(authUser, getUsers);
router.route("/notification/see").patch(authUser, seenComment);
router.route("/saved").get(authUser, getSavedTohughts);
router.route("/notification").get(authUser, getNotification);
router.route("/:id").get(getUser).patch(authUser, editUser);
router.route("/opration/follow").patch(authUser, followUnfollowUser);
router.route("/:id/userVent").get(authUser, getUserVent);
router.route("/:id/lisetning").get(authUser, getLisetningVent);
router.route("/:id/reactedVent").get(authUser, getReactedVents);
router.route("/:id/lisetnUser").get(authUser, getLisetningUser);

export default router;

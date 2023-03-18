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
} from "../controllers/userController.js";
const router = express.Router();

router.route("/").get(getUsers);
router.route("/saved").get(authUser, getSavedTohughts);
router.route("/:id").get(getUser).patch(authUser, editUser);
router.route("/opration/follow").patch(authUser, followUnfollowUser);
router.route("/:id/userVent").get(authUser, getUserVent);
router.route("/:id/lisetning").get(authUser, getLisetningVent);

export default router;

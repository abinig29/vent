import express from "express";
import authUser from "../middleware/auth.js";

import {
  getUser,
  getUsers,
  editUser,
  saveThought,
  getSavedTohughts,
  followUnfollowUser,
  rmSaveThought,
} from "../controllers/userController.js";
const router = express.Router();

router.route("/").get(getUsers);
router.route("/saved").get(authUser, getSavedTohughts);
router.route("/:id").get(getUser).patch(authUser, editUser);
router.route("/opration/saveThought").patch(authUser, saveThought);
router.route("/opration/rmSaveThought").patch(authUser, rmSaveThought);
router.route("/opration/follow").patch(authUser, followUnfollowUser);

export default router;

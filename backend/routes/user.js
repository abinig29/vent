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

router.route("/:id").get(getUser).patch(authUser, editUser);
router.route("/saveThought").patch(authUser, saveThought);
router.route("/rmSaveThought").patch(authUser, rmSaveThought);
router.route("/follow").patch(authUser, followUnfollowUser);
router.route("/saved").get(authUser, getSavedTohughts);
router.route("/").get(getUsers);
export default router;

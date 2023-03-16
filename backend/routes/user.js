import express from "express";

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

router.route("/:id").get(getUser).patch(editUser);
router.route("/saveThought").patch(saveThought);
router.route("/rmSaveThought").patch(rmSaveThought);
router.route("/follow").patch(followUnfollowUser);
router.route("/saved").get(getSavedTohughts);
router.route("/").get(getUsers);
export default router;

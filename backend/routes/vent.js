import express from "express";
import authUser from "../middleware/auth.js";
import {
  getVent,
  getAllVent,
  createVent,
  editVent,
  surprized,
  smile,
  hug,
  feelingSame,
  getVentComment,
  saveThought,
  rmSaveThought,
} from "../controllers/ventController.js";
const router = express.Router();

router.route("/").get(getAllVent);
router.route("/:id").get(getVent).patch(authUser, editVent);
router.route("/:id/comment").get(getVentComment);
router.patch("/:id/feelingSame", authUser, feelingSame);
router.patch("/:id/huged", authUser, hug);
router.patch("/:id/smiled", authUser, smile);
router.patch("/:id/surprised", authUser, surprized);
router.route("/:id/saveThought").patch(authUser, saveThought);
router.route("/:id/rmSaveThought").patch(authUser, rmSaveThought);

export default router;

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

router.route("/").get(getAllVent).post(authUser, createVent);
router.route("/:id").get(getVent).patch(authUser, editVent);
router.route("/:id/commnet").get(getVentComment);
router.patch("/:id/feelingSame", authUser, feelingSame);
router.patch("/:id/hug", authUser, hug);
router.patch("/:id/smile", authUser, smile);
router.patch("/:id/surprized", authUser, surprized);
router.route("/:id/saveThought").patch(authUser, saveThought);
router.route("/:id/rmSaveThought").patch(authUser, rmSaveThought);

export default router;

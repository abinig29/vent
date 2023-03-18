import express from "express";
import authUser from "../middleware/auth.js";
import {
  getVent,
  getLisetningVent,
  getAllVent,
  createVent,
  editVent,
  surprized,
  smile,
  hug,
  feelingSame,
  getUserVent,
  getVentComment,
} from "../controllers/ventController.js";
const router = express.Router();

router.route("/:id").get(getVent).patch(authUser, editVent);
router.route("/:id/commnet").get(getVentComment);
router.route("/userVent").get(authUser, getUserVent);
router.route("/").get(getAllVent).post(authUser, createVent);
router.route("/lisetning").get(authUser, getLisetningVent);

router.patch("/feelingSame", authUser, feelingSame);
router.patch("/hug", authUser, hug);
router.patch("/smile", authUser, smile);
router.patch("/surprized", authUser, surprized);

export default router;

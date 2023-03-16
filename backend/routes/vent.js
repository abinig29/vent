import express from "express";
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

router.route("/:id").get(getVent).patch(editVent);
router.route("/:id/commnet").get(getVentComment);
router.route("/userVent").get(getUserVent);
router.route("/").get(getAllVent).post(createVent);
router.route("/lisetning").get(getLisetningVent);

router.patch("/feelingSame", feelingSame);
router.patch("/hug", hug);
router.patch("/smile", smile);
router.patch("/surprized", surprized);

export default router;

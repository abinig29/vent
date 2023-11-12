import express from "express";
import authUser from "../middleware/auth.js";

import { createComment } from "../controllers/commentController.js";
const router = express.Router();
router.route("/").post(authUser, createComment);
export default router;

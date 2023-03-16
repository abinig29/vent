import express from "express";

import { createComment } from "../controllers/commentController.js";
const router = express.Router();
router.route("/").post(createComment);
export default router;

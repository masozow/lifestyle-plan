import express from "express";
import { OpenAI } from "../controllers/index.js";
import { checkAuth } from "../middleware/index.js";

const router = express.Router();
router.post("/sendPrompt", checkAuth, OpenAI.sendPlanPrompt);
export default router;
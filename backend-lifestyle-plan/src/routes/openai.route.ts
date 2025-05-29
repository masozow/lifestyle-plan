import express from "express";
import { OpenAI } from "../controllers/openai.controller.js";

const router = express.Router();
router.post("/sendPrompt", OpenAI.sendPlanPrompt);
export default router;
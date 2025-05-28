import express from "express";
import openaiController from "../controllers/openai.controller.js";

const router = express.Router();
router.post("/sendPrompt", openaiController.sendPlanPrompt);
export default router;
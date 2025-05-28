import express from "express";
import deepSeekController from "../controllers/deepSeek.controller";

const router = express.Router();

router.post("/sendPrompt", deepSeekController.sendPlanPrompt);

export default router;
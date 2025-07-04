import express from "express";
import { ProgressChartController } from "../controllers/index.js";
import { checkAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/progress-chart",checkAuth, ProgressChartController.getUserProgressData);

export default router;

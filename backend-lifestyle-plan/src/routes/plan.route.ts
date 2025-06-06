import express from "express";
import { PlanController } from "../controllers/index.js";
import { checkAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/plan",checkAuth, PlanController.create);
router.get("/plan", PlanController.getAll);

export default router;

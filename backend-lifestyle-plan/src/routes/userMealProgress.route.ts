// src/routes/userMealProgress.routes.ts
import express from "express";
import { UserMealProgressController } from "../controllers/userMealProgress.controller.js";
import { checkAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/progress", checkAuth, UserMealProgressController.create);
router.get("/progress", checkAuth, UserMealProgressController.getByUser);
router.put("/progress/:id", checkAuth, UserMealProgressController.update);
router.delete("/progress/:id", checkAuth, UserMealProgressController.remove);

export default router;

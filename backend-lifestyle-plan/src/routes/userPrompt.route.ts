import express from "express";
import { UserPromptController } from "../controllers/index.js";
import { checkAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/prompt",checkAuth, UserPromptController.create);
router.get("/prompt", checkAuth, UserPromptController.getByUser);

export default router;

import express from "express";
import { OpenAIResponseController } from "../controllers/index.js";
import { checkAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/openai-response", checkAuth, OpenAIResponseController.getAll);
router.get("/openai-response/:userId", checkAuth, OpenAIResponseController.getByUserId);

export default router;

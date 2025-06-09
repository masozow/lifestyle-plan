import express from "express";
import { ProfileController } from "../controllers/index.js";
import { checkAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/profile",checkAuth, ProfileController.create);
router.get("/profile", ProfileController.getAll);

export default router;

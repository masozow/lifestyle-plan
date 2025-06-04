import express from "express";
import { ProfileController } from "../controllers/index.js";

const router = express.Router();

router.post("/profile", ProfileController.create);
router.get("/profile", ProfileController.getAll);

export default router;

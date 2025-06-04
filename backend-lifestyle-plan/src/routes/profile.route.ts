import express from "express";
import { ProfileController } from "../controllers/profile.controller.js";

const router = express.Router();

router.post("/profiles", ProfileController.create);
router.get("/profiles", ProfileController.getAll);

export default router;

import { Router } from "express";
import { ProfileController } from "../controllers/profile.controller";

const router = Router();

router.post("/profiles", ProfileController.create);
router.get("/profiles", ProfileController.getAll);

export default router;

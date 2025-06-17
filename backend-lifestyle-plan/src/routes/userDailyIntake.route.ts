import express from "express";
import { checkAuth } from "../middleware/auth.middleware.js";
import { UserDailyIntakeController } from "../controllers/userDailyIntake.controller.js";


const router = express.Router();
router.post("/user-daily-intake", checkAuth, UserDailyIntakeController.upsertUserDailyIntake);

export default router;

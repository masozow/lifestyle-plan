import express from "express";
import { checkAuth } from "../middleware/auth.middleware.js";
import { UserDailyMealAndIntakeController } from "../controllers/index.js";


const router = express.Router();

router.post("/user-daily/intake/", checkAuth, UserDailyMealAndIntakeController.upsertUserDailyIntake);
router.post("/user-daily/consumed/", checkAuth, UserDailyMealAndIntakeController.upsertConsumedStatus);

// router.get("/user-raw-meal-plan/:userId", checkAuth, UserMealPlanController.getUserMealPlan);
// router.post("/user-meal-plan", checkAuth, UserMealPlanController.upsertUserMealPlan);


export default router;

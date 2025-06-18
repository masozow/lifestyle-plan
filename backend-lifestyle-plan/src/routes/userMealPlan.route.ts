import express from "express";
import { checkAuth } from "../middleware/auth.middleware.js";
import {  UserMealPlanController} from "../controllers/index.js";

const router = express.Router();

router.get("/user-meal-plan/:userId", checkAuth, UserMealPlanController.getStructuredMealPlan);
// router.get("/user-raw-meal-plan/:userId", checkAuth, UserMealPlanController.getUserMealPlan);
// router.post("/user-meal-plan", checkAuth, UserMealPlanController.upsertUserMealPlan);


export default router;

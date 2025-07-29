import express from "express";
import { HistoricDataController } from "../controllers/index.js";
import { checkAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/historic-data",checkAuth, HistoricDataController.getUserHistoricData);

export default router;

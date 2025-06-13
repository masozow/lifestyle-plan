import express from "express";
import { UserController } from "../controllers/index.js";

const router = express.Router();

router.post("/user", UserController.create);
router.get("/user/:userId", UserController.getByID);
router.get("/user", UserController.getAll);


export default router;

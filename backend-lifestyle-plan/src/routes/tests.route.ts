import express from "express";
import openaiController from "../controllers/openai.controller.js";

const router = express.Router();

router.get("/", (req,res) => {
    res.send("ok");
});

export default router;
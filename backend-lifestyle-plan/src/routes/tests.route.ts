import express from "express";
import deepSeekController from "../controllers/deepSeek.controller.js";

const router = express.Router();

router.get("/", (req,res) => {
    res.send("ok");
});

export default router;
import express from "express";
import { makeWavePayment } from "../controllers/waveController.js";
const router = express.Router();

router.post("/pay", makeWavePayment);

export default router;

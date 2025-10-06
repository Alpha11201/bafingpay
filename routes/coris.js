import express from "express";
import { makeCorisPayment } from "../controllers/corisController.js";
const router = express.Router();

router.post("/pay", makeCorisPayment);

export default router;

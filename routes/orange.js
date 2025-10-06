import express from "express";
import { makeOrangePayment } from "../controllers/orangeController.js";
const router = express.Router();

router.post("/pay", makeOrangePayment);

export default router;

import express from "express";
import { makeFreePayment } from "../controllers/freeController.js";
const router = express.Router();

router.post("/pay", makeFreePayment);

export default router;

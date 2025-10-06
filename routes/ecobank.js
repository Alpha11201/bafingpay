import express from "express";
import { makeEcobankPayment } from "../controllers/ecobankController.js";
const router = express.Router();

router.post("/pay", makeEcobankPayment);

export default router;

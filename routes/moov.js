import express from "express";
import { makeMoovPayment } from "../controllers/moovController.js";
const router = express.Router();

router.post("/pay", makeMoovPayment);

export default router;

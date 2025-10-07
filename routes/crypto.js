import express from "express";
import { newWallet, makePayment } from "../controllers/cryptoController.js";

const router = express.Router();

router.post("/wallet/create", newWallet);
router.post("/payment", makePayment);

export default router;

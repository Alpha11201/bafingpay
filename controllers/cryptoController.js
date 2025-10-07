import { createSolanaWallet, sendSolanaPayment } from "../services/cryptoService.js";

export const newWallet = (req, res) => {
  const wallet = createSolanaWallet();
  res.json({ success: true, wallet });
};

export const makePayment = async (req, res) => {
  const { fromSecretKey, toPublicKey, amount } = req.body;
  const result = await sendSolanaPayment({ fromSecretKey, toPublicKey, amount });
  res.json(result);
};

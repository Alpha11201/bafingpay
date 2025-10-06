import { processWavePayment } from "../services/waveService.js";

export const makeWavePayment = async (req, res) => {
  try {
    const result = await processWavePayment(req.body);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

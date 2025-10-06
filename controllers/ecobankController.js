import { processEcobankPayment } from "../services/ecobankService.js";

export const makeEcobankPayment = async (req, res) => {
  try {
    const result = await processEcobankPayment(req.body);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

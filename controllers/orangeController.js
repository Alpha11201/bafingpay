import { processOrangePayment } from "../services/orangeService.js";

export const makeOrangePayment = async (req, res) => {
  try {
    const result = await processOrangePayment(req.body);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

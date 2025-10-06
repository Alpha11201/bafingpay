import { processMoovPayment } from "../services/moovService.js";

export const makeMoovPayment = async (req, res) => {
  try {
    const result = await processMoovPayment(req.body);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

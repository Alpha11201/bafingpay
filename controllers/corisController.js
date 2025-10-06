import { processCorisPayment } from "../services/corisService.js";

export const makeCorisPayment = async (req, res) => {
  try {
    const result = await processCorisPayment(req.body);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

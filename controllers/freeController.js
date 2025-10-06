import { processFreePayment } from "../services/freeService.js";

export const makeFreePayment = async (req, res) => {
  try {
    const result = await processFreePayment(req.body);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

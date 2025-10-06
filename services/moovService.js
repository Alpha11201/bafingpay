import { processPayment } from "./paymentService.js";

export const processMoovPayment = async (data) => {
  return processPayment({ provider: "moov", ...data });
};

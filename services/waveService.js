import { processPayment } from "./paymentService.js";

export const processWavePayment = async (data) => {
  return processPayment({ provider: "wave", ...data });
};

import { processPayment } from "./paymentService.js";

export const processEcobankPayment = async (data) => {
  return processPayment({ provider: "ecobankpay", ...data });
};

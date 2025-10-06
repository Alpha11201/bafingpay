import { processPayment } from "./paymentService.js";

export const processOrangePayment = async (data) => {
  return processPayment({ provider: "orange", ...data });
};

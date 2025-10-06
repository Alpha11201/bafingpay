import { processPayment } from "./paymentService.js";

export const processFreePayment = async (data) => {
  return processPayment({ provider: "free_money", ...data });
};

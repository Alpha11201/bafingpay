import { processPayment } from "./paymentService.js";

export const processCorisPayment = async (data) => {
  return processPayment({ provider: "coris_bank", ...data });
};

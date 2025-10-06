import { processOrangePayment } from "./orangeService.js";
import { processWavePayment } from "./waveService.js";
import { processMoovPayment } from "./moovService.js";
import { processFreePayment } from "./freeService.js";
import { processCorisPayment } from "./corisService.js";
import { processEcobankPayment } from "./ecobankService.js";
import { addToQueue } from "../queue/paymentQueue.js";

export const makePayment = async (provider, paymentData) => {
  try {
    let result;

    switch (provider) {
      case "orange":
        result = await processOrangePayment(paymentData);
        break;
      case "wave":
        result = await processWavePayment(paymentData);
        break;
      case "moov":
        result = await processMoovPayment(paymentData);
        break;
      case "free":
        result = await processFreePayment(paymentData);
        break;
      case "coris":
        result = await processCorisPayment(paymentData);
        break;
      case "ecobank":
        result = await processEcobankPayment(paymentData);
        break;
      default:
        throw new Error("Fournisseur non supporté");
    }

    if (result.status === "failed") {
      await addToQueue(provider, paymentData);
      return { status: "pending", message: "Transaction mise en file d’attente" };
    }

    return result;

  } catch (error) {
    await addToQueue(provider, paymentData);
    return { status: "pending", message: "Erreur, transaction mise en file d’attente" };
  }
};

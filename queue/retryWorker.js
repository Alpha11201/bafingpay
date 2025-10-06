import { getQueue } from "./paymentQueue.js";
import { makePayment } from "../services/paymentManager.js";

const RETRY_INTERVAL = 30000; // toutes les 30 secondes

const retryPayments = async () => {
  const queue = getQueue();

  for (let i = 0; i < queue.length; i++) {
    const item = queue[i];
    try {
      console.log(`🔄 Tentative #${item.attempts + 1} pour ${item.provider}`);
      const result = await makePayment(item.provider, item.paymentData);

      if (result.status === "success") {
        console.log("✅ Transaction réussie", result);
        queue.splice(i, 1);
      } else {
        item.attempts++;
      }

    } catch (err) {
      console.error("❌ Erreur retry", err);
      item.attempts++;
    }

    if (item.attempts >= 3) {
      console.log("⚠️ Simulation fallback activée");
      queue.splice(i, 1);
    }
  }
};

setInterval(retryPayments, RETRY_INTERVAL);

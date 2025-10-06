import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

export const processPayment = async ({ provider, phone, amount }) => {
  try {
    const apiKey = process.env[`${provider.toUpperCase()}_API_KEY`];
    const apiUrl = process.env[`${provider.toUpperCase()}_API_URL`];

    if (!apiKey || !apiUrl) {
      throw new Error(`Clé API ou URL manquante pour ${provider}`);
    }

    const response = await axios.post(apiUrl, { phone, amount }, {
      headers: { Authorization: `Bearer ${apiKey}` }
    });

    return response.data;

  } catch (error) {
    console.error(`❌ Erreur ${provider} API, fallback activé:`, error.message);
    return { provider, status: "failed", phone, amount };
  }
};

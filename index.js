import express from "express";
import dotenv from "dotenv";

import orangeRoutes from "./routes/orange.js";
import waveRoutes from "./routes/wave.js";
import moovRoutes from "./routes/moov.js";
import freeRoutes from "./routes/free.js";
import corisRoutes from "./routes/coris.js";
import ecobankRoutes from "./routes/ecobank.js";

dotenv.config();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 Bienvenue sur BafingPay API — toutes les passerelles de paiement prêtes !");
});

app.use("/api/orange", orangeRoutes);
app.use("/api/wave", waveRoutes);
app.use("/api/moov", moovRoutes);
app.use("/api/free", freeRoutes);
app.use("/api/coris", corisRoutes);
app.use("/api/ecobank", ecobankRoutes);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ BafingPay API en cours sur le port ${PORT}`);
});

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pkg from "pg";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const app = express();
app.use(cors());
app.use(express.json());

// Test de connexion à la base
app.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ status: "connected", time: result.rows[0].now });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// Route de base
app.get("/", (req, res) => {
  res.send("🚀 BafingPay API en ligne et prête !");
});

// Exemple de route pour les paiements
app.post("/api/payment", (req, res) => {
  const { amount, operator } = req.body;
  res.json({
    message: `Paiement de ${amount} FCFA via ${operator} reçu.`,
    status: "success",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`✅ BafingPay API en cours sur le port ${PORT}`)
);

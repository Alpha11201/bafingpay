
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function createTablesIfNeeded() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS transactions (
      id TEXT PRIMARY KEY,
      merchant_id TEXT,
      operator TEXT,
      phone TEXT,
      amount NUMERIC,
      commission NUMERIC,
      net_amount NUMERIC,
      status TEXT,
      reference TEXT,
      provider_reference TEXT,
      created_at TIMESTAMP DEFAULT now(),
      updated_at TIMESTAMP DEFAULT now()
    );
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS merchants (
      id TEXT PRIMARY KEY,
      name TEXT,
      numero_orange TEXT,
      numero_wave TEXT,
      numero_moov TEXT,
      admin_email TEXT,
      token TEXT,
      created_at TIMESTAMP DEFAULT now()
    );
  `);
}
createTablesIfNeeded().catch(console.error);
module.exports = {
  query: (text, params) => pool.query(text, params),
  async saveTransaction(tx) {
    const q = `INSERT INTO transactions(id, merchant_id, operator, phone, amount, commission, net_amount, status, reference, provider_reference) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`;
    const values = [tx.id, tx.merchantId, tx.operator, tx.phone, tx.amount, tx.commission, tx.netAmount, tx.status, tx.reference, tx.providerReference || null];
    const r = await pool.query(q, values);
    return r.rows[0];
  },
  async updateTransaction(id, updates) {
    const set = Object.keys(updates).map((k,i) => `${k} = $${i+2}`).join(', ');
    const vals = [id].concat(Object.values(updates));
    const q = `UPDATE transactions SET ${set}, updated_at = now() WHERE id = $1 RETURNING *`;
    const r = await pool.query(q, vals);
    return r.rows[0];
  },
  async getTransaction(id) {
    const r = await pool.query('SELECT * FROM transactions WHERE id=$1', [id]);
    return r.rows[0];
  }
};

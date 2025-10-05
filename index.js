
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const payments = require('./payments');
const db = require('./db');
const { verifySignatureMiddleware } = require('./security');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Bafing Pay API OK'));

app.post('/api/pay', async (req, res) => {
  try {
    const result = await payments.initiatePayment(req.body);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/status/:txid', async (req, res) => {
  try {
    const tx = await db.getTransaction(req.params.txid);
    if (!tx) return res.status(404).json({ error: 'Transaction not found' });
    res.json(tx);
  } catch (e) { res.status(500).json({ error: e.message }) }
});

app.post('/api/callback/:provider', verifySignatureMiddleware, async (req, res) => {
  try {
    await payments.handleProviderCallback(req.params.provider, req.body);
    res.status(200).send('OK');
  } catch (e) {
    console.error(e);
    res.status(500).send('ERR');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Bafing Pay listening on port ${port}`));

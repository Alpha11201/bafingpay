
const axios = require('axios');
const db = require('./db');
const { v4: uuidv4 } = require('uuid');

const COMMISSION_RATE = 0.01;

async function initiatePayment({ amount, operator, phone, merchantId, reference, callbackUrl }) {
  if (!amount || !operator || !phone) throw new Error('Missing params');
  const id = uuidv4();
  const commission = parseFloat((amount * COMMISSION_RATE).toFixed(2));
  const net = amount - commission;
  await db.saveTransaction({
    id,
    merchantId: merchantId || null,
    operator,
    phone,
    amount,
    commission,
    netAmount: net,
    status: 'initiated',
    reference,
    providerReference: null
  });
  let providerResp;
  try {
    providerResp = await callProvider(operator, { amount, phone, reference, callbackUrl, id });
  } catch (err) {
    await db.updateTransaction(id, { status: 'error' });
    throw err;
  }
  await db.updateTransaction(id, { provider_reference: providerResp.providerReference || providerResp.id, status: providerResp.status || 'pending' });
  return { id, status: providerResp.status || 'pending', providerData: providerResp };
}

async function callProvider(operator, payload) {
  if (operator.toLowerCase() === 'wave') return { status: 'pending', providerReference: 'WAVE-' + payload.id };
  if (operator.toLowerCase() === 'orange' || operator.toLowerCase() === 'orange money') return { status: 'pending', providerReference: 'ORANGE-' + payload.id };
  if (operator.toLowerCase() === 'moov') return { status: 'pending', providerReference: 'MOOV-' + payload.id };
  throw new Error('Operator not supported');
}

async function handleProviderCallback(provider, body) {
  const bafingId = body.id || body.bafingId;
  if (!bafingId) throw new Error('No bafing id in callback');
  const newStatus = body.status === 'success' ? 'paid' : (body.status === 'failed' ? 'failed' : 'pending');
  await db.updateTransaction(bafingId, { status: newStatus, provider_reference: body.providerReference || null });
}
module.exports = { initiatePayment, handleProviderCallback };

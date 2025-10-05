
const crypto = require('crypto');
function verifySignatureMiddleware(req, res, next) {
  const sig = req.headers['x-bafing-sign'];
  if (!sig) return next();
  const secret = process.env.CALLBACK_SECRET || '';
  const payload = JSON.stringify(req.body);
  const hmac = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  if (hmac !== sig) return res.status(401).json({ error: 'Invalid signature' });
  next();
}
module.exports = { verifySignatureMiddleware };

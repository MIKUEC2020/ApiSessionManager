import initialTokenSecretBase64 from '../configs/config.js';
const initialTokenSecret = Buffer.from(initialTokenSecretBase64, 'base64');
import model from '../models/model.js';
import { generateToken, verifyTokenExpiration } from '../utils/apiTokenUtil.js';

export const generateInitialToken = (userId) => generateToken(userId, Buffer.from(initialTokenSecret, 'base64'), 300);

export function generateAndStoreInitialToken(userId) {
  const token = generateInitialToken(userId);
  model.lastInitialToken = token;
  return token;
}

export function verifyExpirationAndStore(token) {
  const data = verifyTokenExpiration(token, initialTokenSecret);
  if (data === null) return null;
  if (token !== model.lastInitialToken) return null;
  return token;
}

export function initialTokenCallback(req, res) {
  res.set('Cache-Control', 'no-store');
  res.send(generateAndStoreInitialToken('abcdef'));
}

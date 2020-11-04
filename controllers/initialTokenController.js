import {initialTokenKey, refreshTokenKey, apiTokenKey} from '../configs/config.js';
const initialTokenSecret = Buffer.from(initialTokenKey, 'base64');
const refreshTokenSecret = Buffer.from(refreshTokenKey, 'base64');
import model from '../models/model.js';
import { generateToken, verifyTokenExpiration } from '../utils/apiTokenUtil.js';

function generateAndStoreRefreshToken(userId) {
  const token = generateToken(userId, refreshTokenSecret, 60 * 60 * 24);
  model.lastRefreshToken = token;
  return token;
}

function verifyRefreshTokenExpirationAndLastHash(token) {
  const data = verifyTokenExpiration(token, refreshTokenSecret);
  if (token !== model.lastRefreshToken) return 'Newer refresh token already exist';
  return data;
}

export function initialTokenCallback(req, res) {
  res.set('Cache-Control', 'no-store');
  res.send(generateToken('user1', initialTokenSecret, 10));
}

export function refreshTokenCallback(req, res) {
  res.set('Cache-Control', 'no-store');
  if (req.headers['x-vll-initial-token']) {
    const token = req.headers['x-vll-initial-token'];
    const data = verifyTokenExpiration(token, initialTokenSecret);
    if (data == null) res.send('Failed to parse token');
    else if (!data.userId) res.send(data); //response error message
    else res.send(generateAndStoreRefreshToken(data.userId));
  } else {
    res.send('Initial token required');
  }
}

export function apiTokenCallback(req, res) {
  res.set('Cache-Control', 'no-store');
  if (req.headers['x-vll-refresh-token']) {
    const token = req.headers['x-vll-refresh-token'];
    const data = verifyRefreshTokenExpirationAndLastHash(token);
    if (data == null) res.send('Failed to parse token');
    else if (!data.userId) res.send(data); //response error message
    else res.send(generateToken('user1', apiTokenKey, 10));
  } else {
    res.send('Refresh token required');
  }
}

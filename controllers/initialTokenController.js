'use strict'

import initialTokenSecret from '../configs/config.js';
import { generateToken } from '../utils/apiTokenUtil.js';

export const generateInitialToken = (userId) => generateToken(userId, Buffer.from(initialTokenSecret, 'base64'), 300);

export function issueInitialToken(req, res, next) {
  res.send('initial token!');
}

import { test, expect } from '@jest/globals';
import request from 'supertest';
import app from '../app.js';
import { generateToken, verifyToken } from '../utils/apiTokenUtil.js';

import initialTokenKey from '../configs/config.js';

test('Initial token route is valid', async () => {
  const res = await request(app).get('/api/initial-token');
  expect(res.statusCode).toBe(200);
  expect(res.text).toBe('initial token!');
});

test('Initial token key length is 256', () => {
  expect(Buffer.from(initialTokenKey, 'base64').length).toBe(256);
});


test('Api token validation works', () => {
  const validToken = generateToken('user1', Buffer.from(initialTokenKey, 'base64') , 100);
  expect(verifyToken(validToken, initialTokenKey)).toBe(true);
  const expiredToken = generateToken('user1', Buffer.from(initialTokenKey, 'base64') , -100);
  expect(verifyToken(expiredToken, initialTokenKey)).toBe(false);
  const invalidKeyToken = generateToken('user1', Buffer.from(initialTokenKey, 'base64') + 1 , 100);
  expect(verifyToken(invalidKeyToken, initialTokenKey)).toBe(false);
});

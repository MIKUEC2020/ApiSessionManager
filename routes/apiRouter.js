import express from 'express';
const router = express.Router();
import { apiTokenCallback, initialTokenCallback, refreshTokenCallback } from '../controllers/initialTokenController.js';

router.get('/initial-token', initialTokenCallback);
router.get('/refresh-token', refreshTokenCallback);
router.get('/api-token', apiTokenCallback)

export default router;

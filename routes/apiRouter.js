import express from 'express';
const router = express.Router();
import { initialTokenCallback } from '../controllers/initialTokenController.js';

router.get('/initial-token', initialTokenCallback);

export default router;

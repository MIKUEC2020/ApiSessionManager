import express from 'express';
const router = express.Router();
import { issueInitialToken } from '../controllers/initialTokenController.js';

router.get('/initial-token', issueInitialToken);

export default router;

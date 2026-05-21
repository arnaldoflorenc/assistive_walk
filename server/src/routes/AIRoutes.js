import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { getAIResults } from '../controllers/AIController.js';

const router = express.Router();

// Rota da conexão com a IA
router.get('/results', authenticateToken, getAIResults);

export default router;

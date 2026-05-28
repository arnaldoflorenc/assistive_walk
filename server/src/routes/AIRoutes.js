import express from 'express';
import { authenticateToken } from '../middleware/auth.js';

import { getAIResults, postAIMetrics, getAImetrics } from '../controllers/AIController.js';

const router = express.Router();

// Rota da conexão com a IA
router.get('/results', authenticateToken, getAIResults);
//rota para receber as métricas enviadas pelo cliente
router.post('/postmetrics', authenticateToken, postAIMetrics);
//rota para enviar as métricas para o cliente
router.get('/getmetrics', authenticateToken, getAImetrics);

export default router;

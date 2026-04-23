import express from "express";
import { registerUser, loginUser, getUserProfile, getUserSubscription } from "../controllers/userController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.post('/register', registerUser); //route for register a new user (userController)
router.post('/login', loginUser); //route for login an user (userController)

// Rotas protegidas
router.get('/me', authenticateToken, getUserProfile);
router.get('/assinatura', authenticateToken, getUserSubscription);

router.get('/metricas', authenticateToken, (req, res) => {
	// Exemplo de resposta de métricas
	res.json({ textosGerados: 42, palavrasGeradas: 12345, ultimaGeracao: '22/04/2026' });
});

export default router;
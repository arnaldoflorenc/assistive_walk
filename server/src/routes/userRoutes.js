import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

router.post('/register', registerUser); //route for register a new user (userController)
router.post('/login', loginUser); //route for login an user (userController)

export default router;
import express from "express";
import { registerUser } from "../controllers/userController.js";

const router = express.Router();

router.post('/register', registerUser); //route for register a new user (userController)

export default router;
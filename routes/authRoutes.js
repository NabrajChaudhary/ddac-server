import express from 'express';
import { signin, getProfile } from '../controllers/authController.js';
import auth from '../middlewares/auth.js';

export const authRouter = express.Router();

authRouter.post('/login', signin);
authRouter.get('/profile', auth, getProfile);

import express from 'express';
import { changePassword, loginAuth, logoutAuth, registerAuth, resetOtt, resetPasswrod,  verifyEmail, verifyOTT, visitedAt } from '../controller/authController.js';
import authMiddleware from '../middleware/authMiddelware.js';

const authRouter = express.Router();

authRouter.post('/register', registerAuth);
authRouter.post('/login', loginAuth);
authRouter.post("/change-password", authMiddleware, changePassword);
authRouter.post('/logout', logoutAuth);
authRouter.post('/send-verify-ott',authMiddleware ,verifyOTT);
authRouter.post('/verify-email',authMiddleware,verifyEmail);
authRouter.post('/send-reset-ott',resetOtt);
authRouter.post('/reset-password',resetPasswrod);
authRouter.post('/track-visit', authMiddleware, visitedAt);

export {authRouter} 
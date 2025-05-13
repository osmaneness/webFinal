import express from 'express';
import { authController } from '../controllers/authController';

const router = express.Router();

router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/verify', authController.verify);

export default router; 
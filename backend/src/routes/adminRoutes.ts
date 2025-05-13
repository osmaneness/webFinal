import express from 'express';
import { authMiddleware, isAdmin } from '../middleware/auth';
import { adminController } from '../controllers/adminController';

const router = express.Router();

// İstatistikleri getir
router.get('/stats', authMiddleware, isAdmin, adminController.getStats);

export default router; 
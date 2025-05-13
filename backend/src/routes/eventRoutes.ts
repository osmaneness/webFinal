import express from 'express';
import { eventController } from '../controllers/eventController';
import { authMiddleware, isAdmin } from '../middleware/auth';

const router = express.Router();

// Tüm etkinlikleri getir
router.get('/', eventController.getAllEvents);

// Etkinlik detaylarını getir
router.get('/:id', eventController.getEventById);

// Yeni etkinlik oluştur (sadece admin)
router.post('/', authMiddleware, isAdmin, eventController.createEvent);

// Etkinlik güncelle (sadece admin)
router.put('/:id', authMiddleware, isAdmin, eventController.updateEvent);

// Etkinlik sil (sadece admin)
router.delete('/:id', authMiddleware, isAdmin, eventController.deleteEvent);

export default router; 
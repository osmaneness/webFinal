import express from 'express';
import { statsController } from '../controllers/statsController';
import { getOnlineUsers } from '../middleware/statsMiddleware';

const router = express.Router();

// Tüm istatistikleri getir
router.get('/', statsController.getAllStats);

// Günlük ziyaretçi sayısını getir
router.get('/daily-visits', statsController.getDailyVisits);

// Online kullanıcı sayısını getir
router.get('/online-users', statsController.getOnlineUsers);

// Toplam etkinlik sayısını getir
router.get('/total-events', statsController.getTotalEvents);

// Toplam katılımcı sayısını getir
router.get('/total-participants', statsController.getTotalParticipants);

router.get('/online', getOnlineUsers);

export default router; 
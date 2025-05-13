import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Tüm etkinlikleri getir
router.get('/', async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        date: 'desc',
      },
    });
    res.json(events);
  } catch (error) {
    console.error('Etkinlikler getirilirken hata:', error);
    res.status(500).json({ error: 'Etkinlikler getirilirken bir hata oluştu' });
  }
});

// Tek bir etkinliği getir
router.get('/:id', async (req, res) => {
  try {
    const event = await prisma.event.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });

    if (!event) {
      return res.status(404).json({ error: 'Etkinlik bulunamadı' });
    }

    res.json(event);
  } catch (error) {
    console.error('Etkinlik getirilirken hata:', error);
    res.status(500).json({ error: 'Etkinlik getirilirken bir hata oluştu' });
  }
});

// Etkinliğin katılımcılarını getir
router.get('/:id/participants', async (req, res) => {
  try {
    const participants = await prisma.participant.findMany({
      where: {
        eventId: parseInt(req.params.id),
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json(participants);
  } catch (error) {
    console.error('Katılımcılar getirilirken hata:', error);
    res.status(500).json({ error: 'Katılımcılar getirilirken bir hata oluştu' });
  }
});

// Yeni etkinlik oluştur (sadece admin)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, date, time, location, capacity, description, status } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Yetkilendirme gerekli' });
    }

    const event = await prisma.event.create({
      data: {
        title,
        date,
        time,
        location,
        capacity,
        description,
        status,
        authorId: userId,
      },
    });

    res.status(201).json(event);
  } catch (error) {
    console.error('Etkinlik oluşturulurken hata:', error);
    res.status(500).json({ error: 'Etkinlik oluşturulurken bir hata oluştu' });
  }
});

// Etkinlik güncelle (sadece admin)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { title, date, time, location, capacity, description, status } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Yetkilendirme gerekli' });
    }

    const event = await prisma.event.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        title,
        date,
        time,
        location,
        capacity,
        description,
        status,
      },
    });

    res.json(event);
  } catch (error) {
    console.error('Etkinlik güncellenirken hata:', error);
    res.status(500).json({ error: 'Etkinlik güncellenirken bir hata oluştu' });
  }
});

// Etkinlik sil (sadece admin)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Yetkilendirme gerekli' });
    }

    await prisma.event.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });

    res.status(204).send();
  } catch (error) {
    console.error('Etkinlik silinirken hata:', error);
    res.status(500).json({ error: 'Etkinlik silinirken bir hata oluştu' });
  }
});

export default router; 
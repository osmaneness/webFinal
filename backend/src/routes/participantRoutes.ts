import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, isAdmin } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Yeni katılımcı ekle
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, phone, eventId } = req.body;

    const participant = await prisma.participant.create({
      data: {
        name,
        email,
        phone,
        eventId: parseInt(eventId)
      },
      include: {
        event: true
      }
    });

    return res.status(201).json(participant);
  } catch (error) {
    console.error('Katılımcı eklenirken hata:', error);
    return res.status(500).json({ error: 'Katılımcı eklenemedi' });
  }
});

// Etkinliğe ait katılımcıları getir
router.get('/event/:eventId', async (req: Request, res: Response) => {
  try {
    const participants = await prisma.participant.findMany({
      where: {
        eventId: parseInt(req.params.eventId)
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return res.json(participants);
  } catch (error) {
    console.error('Katılımcılar getirilirken hata:', error);
    return res.status(500).json({ error: 'Katılımcılar getirilemedi' });
  }
});

// Katılımcı durumunu güncelle (sadece admin)
router.put('/:id/status', authenticateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    const { status } = req.body;

    const participant = await prisma.participant.update({
      where: {
        id: parseInt(req.params.id)
      },
      data: {
        status
      }
    });

    return res.json(participant);
  } catch (error) {
    console.error('Katılımcı durumu güncellenirken hata:', error);
    return res.status(500).json({ error: 'Katılımcı durumu güncellenemedi' });
  }
});

// Katılımcıyı sil (sadece admin)
router.delete('/:id', authenticateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    await prisma.participant.delete({
      where: {
        id: parseInt(req.params.id)
      }
    });

    return res.status(204).send();
  } catch (error) {
    console.error('Katılımcı silinirken hata:', error);
    return res.status(500).json({ error: 'Katılımcı silinemedi' });
  }
});

export default router; 
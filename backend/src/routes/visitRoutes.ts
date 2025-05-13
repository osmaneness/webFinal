import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Yeni ziyaret kaydı oluştur
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, phone, message } = req.body;

    const visit = await prisma.visit.create({
      data: {
        name,
        email,
        phone,
        message
      }
    });

    return res.status(201).json(visit);
  } catch (error) {
    console.error('Ziyaret kaydedilirken hata:', error);
    return res.status(500).json({ error: 'Ziyaret kaydedilemedi' });
  }
});

// Tüm ziyaretleri getir (sadece admin)
router.get('/', async (_req: Request, res: Response) => {
  try {
    const visits = await prisma.visit.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return res.json(visits);
  } catch (error) {
    console.error('Ziyaretler getirilirken hata:', error);
    return res.status(500).json({ error: 'Ziyaretler getirilemedi' });
  }
});

export default router; 
import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authMiddleware, isAdmin } from '../middleware/auth';
import { authController } from '../controllers/authController';

const router = express.Router();
const prisma = new PrismaClient();

// Kullanıcı girişi
router.post('/login', authController.login);

// Kullanıcı kaydı
router.post('/register', async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Bu e-posta adresi zaten kullanılıyor' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name
      }
    });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    return res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Kayıt olurken hata:', error);
    return res.status(500).json({ error: 'Kayıt olunamadı' });
  }
});

// Kullanıcı bilgilerini getir
router.get('/me', authMiddleware, authController.me);

// Kullanıcı çıkışı
router.post('/logout', authMiddleware, authController.logout);

// Tüm kullanıcıları getir (sadece admin)
router.get('/users', authMiddleware, isAdmin, async (_req: express.Request, res: express.Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true
      }
    });

    return res.json(users);
  } catch (error) {
    console.error('Kullanıcılar getirilirken hata:', error);
    return res.status(500).json({ error: 'Kullanıcılar getirilemedi' });
  }
});

export default router; 
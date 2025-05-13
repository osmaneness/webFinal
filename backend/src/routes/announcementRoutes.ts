import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, isAdmin } from '../middleware/auth';
import slugify from 'slugify';

const router = Router();
const prisma = new PrismaClient();

// Tüm duyuruları getir
router.get('/', async (_req: Request, res: Response) => {
  try {
    const announcements = await prisma.announcement.findMany({
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return res.json(announcements);
  } catch (error) {
    console.error('Duyurular getirilirken hata:', error);
    return res.status(500).json({ error: 'Duyurular getirilirken bir hata oluştu' });
  }
});

// Tek bir duyuruyu getir
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const announcement = await prisma.announcement.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!announcement) {
      return res.status(404).json({ error: 'Duyuru bulunamadı' });
    }

    return res.json(announcement);
  } catch (error) {
    console.error('Duyuru getirilirken hata:', error);
    return res.status(500).json({ error: 'Duyuru getirilirken bir hata oluştu' });
  }
});

// Yeni duyuru oluştur (sadece admin)
router.post('/', authenticateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    const { title, content, category, image } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Yetkilendirme gerekli' });
    }

    const announcement = await prisma.announcement.create({
      data: {
        title,
        content,
        slug: slugify(title, { lower: true, strict: true }),
        category,
        image,
        authorId: userId,
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return res.status(201).json(announcement);
  } catch (error) {
    console.error('Duyuru oluşturulurken hata:', error);
    return res.status(500).json({ error: 'Duyuru oluşturulurken bir hata oluştu' });
  }
});

// Duyuru güncelle (sadece admin)
router.put('/:id', authenticateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    const { title, content, category, image, isPublished } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Yetkilendirme gerekli' });
    }

    const announcement = await prisma.announcement.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        title,
        content,
        slug: title ? slugify(title, { lower: true, strict: true }) : undefined,
        category,
        image,
        isPublished,
        publishedAt: isPublished ? new Date() : undefined,
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return res.json(announcement);
  } catch (error) {
    console.error('Duyuru güncellenirken hata:', error);
    return res.status(500).json({ error: 'Duyuru güncellenirken bir hata oluştu' });
  }
});

// Duyuru sil (sadece admin)
router.delete('/:id', authenticateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Yetkilendirme gerekli' });
    }

    await prisma.announcement.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });

    return res.status(204).send();
  } catch (error) {
    console.error('Duyuru silinirken hata:', error);
    return res.status(500).json({ error: 'Duyuru silinirken bir hata oluştu' });
  }
});

export default router; 
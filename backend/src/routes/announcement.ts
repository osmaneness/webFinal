import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth';
import slugify from 'slugify';

const router = Router();
const prisma = new PrismaClient();

// Tüm duyuruları getir
router.get('/', async (req, res) => {
  try {
    const announcements = await prisma.announcement.findMany({
      where: {
        isPublished: true,
      },
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

    console.log('Bulunan duyurular:', announcements); // Debug için log
    res.json(announcements);
  } catch (error) {
    console.error('Duyurular getirilirken hata:', error);
    res.status(500).json({ error: 'Duyurular getirilirken bir hata oluştu' });
  }
});

// Tek bir duyuruyu getir
router.get('/:slug', async (req, res) => {
  try {
    const announcement = await prisma.announcement.findUnique({
      where: {
        slug: req.params.slug,
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

    res.json(announcement);
  } catch (error) {
    console.error('Duyuru getirilirken hata:', error);
    res.status(500).json({ error: 'Duyuru getirilirken bir hata oluştu' });
  }
});

// Yeni duyuru oluştur (sadece admin)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, content, image, category } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Yetkilendirme gerekli' });
    }

    const slug = slugify(title, {
      lower: true,
      strict: true,
      locale: 'tr',
    });

    const announcement = await prisma.announcement.create({
      data: {
        title,
        content,
        slug,
        image,
        category,
        authorId: userId,
      },
    });

    res.status(201).json(announcement);
  } catch (error) {
    console.error('Duyuru oluşturulurken hata:', error);
    res.status(500).json({ error: 'Duyuru oluşturulurken bir hata oluştu' });
  }
});

// Duyuru güncelle (sadece admin)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { title, content, image, category, isPublished } = req.body;
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
        image,
        category,
        isPublished,
        publishedAt: isPublished ? new Date() : null,
      },
    });

    res.json(announcement);
  } catch (error) {
    console.error('Duyuru güncellenirken hata:', error);
    res.status(500).json({ error: 'Duyuru güncellenirken bir hata oluştu' });
  }
});

// Duyuru sil (sadece admin)
router.delete('/:id', authenticateToken, async (req, res) => {
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

    res.status(204).send();
  } catch (error) {
    console.error('Duyuru silinirken hata:', error);
    res.status(500).json({ error: 'Duyuru silinirken bir hata oluştu' });
  }
});

export default router; 
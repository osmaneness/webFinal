import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import slugify from 'slugify';

const prisma = new PrismaClient();

interface EventWithAuthor {
  id: number;
  title: string;
  date: Date;
  time: string;
  location: string;
  capacity: number;
  description: string;
  status: string;
  authorId: number;
  author: {
    name: string;
  };
}

export const eventController = {
  // Tüm etkinlikleri getir
  async getAllEvents(_req: Request, res: Response): Promise<void> {
    try {
      const events = await prisma.event.findMany({
        include: {
          author: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          date: 'desc',
        },
      });

      // Tarihleri ISO string formatına çevir
      const formattedEvents = events.map((event: EventWithAuthor) => ({
        ...event,
        date: event.date.toISOString(),
      }));

      res.json(formattedEvents);
    } catch (error) {
      console.error('Etkinlikler getirilirken hata:', error);
      res.status(500).json({ error: 'Etkinlikler getirilirken bir hata oluştu' });
    }
  },

  // Tek bir etkinliği getir
  async getEventById(req: Request, res: Response): Promise<void> {
    try {
      const event = await prisma.event.findUnique({
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

      if (!event) {
        res.status(404).json({ error: 'Etkinlik bulunamadı' });
        return;
      }

      // Tarihi ISO string formatına çevir
      const formattedEvent = {
        ...event,
        date: event.date.toISOString(),
      };

      res.json(formattedEvent);
    } catch (error) {
      console.error('Etkinlik getirilirken hata:', error);
      res.status(500).json({ error: 'Etkinlik getirilirken bir hata oluştu' });
    }
  },

  // Yeni etkinlik oluştur
  async createEvent(req: Request, res: Response): Promise<void> {
    try {
      const { title, date, time, location, capacity, description, status } = req.body;
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({ error: 'Yetkilendirme gerekli' });
        return;
      }

      const event = await prisma.event.create({
        data: {
          title,
          slug: slugify(title, { lower: true, strict: true }),
          date: new Date(date),
          time,
          location,
          capacity: parseInt(capacity),
          description,
          status,
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

      // Tarihi ISO string formatına çevir
      const formattedEvent = {
        ...event,
        date: event.date.toISOString(),
      };

      res.status(201).json(formattedEvent);
    } catch (error) {
      console.error('Etkinlik oluşturulurken hata:', error);
      res.status(500).json({ error: 'Etkinlik oluşturulurken bir hata oluştu' });
    }
  },

  // Etkinlik güncelle
  async updateEvent(req: Request, res: Response): Promise<void> {
    try {
      const { title, date, time, location, capacity, description, status } = req.body;
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({ error: 'Yetkilendirme gerekli' });
        return;
      }

      const event = await prisma.event.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: {
          title,
          slug: title ? slugify(title, { lower: true, strict: true }) : undefined,
          date: date ? new Date(date) : undefined,
          time,
          location,
          capacity: capacity ? parseInt(capacity) : undefined,
          description,
          status,
        },
        include: {
          author: {
            select: {
              name: true,
            },
          },
        },
      });

      // Tarihi ISO string formatına çevir
      const formattedEvent = {
        ...event,
        date: event.date.toISOString(),
      };

      res.json(formattedEvent);
    } catch (error) {
      console.error('Etkinlik güncellenirken hata:', error);
      res.status(500).json({ error: 'Etkinlik güncellenirken bir hata oluştu' });
    }
  },

  // Etkinlik sil
  async deleteEvent(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({ error: 'Yetkilendirme gerekli' });
        return;
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
  }
}; 
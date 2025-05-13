import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const adminController = {
  async getStats(_req: Request, res: Response): Promise<void> {
    try {
      // Toplam kullanıcı sayısı
      const totalUsers = await prisma.user.count();

      // Toplam etkinlik sayısı
      const totalEvents = await prisma.event.count();

      // Toplam katılımcı sayısı
      const totalParticipants = await prisma.participant.count();

      // Yaklaşan etkinlik sayısı (bugünden sonraki)
      const upcomingEvents = await prisma.event.count({
        where: {
          date: {
            gt: new Date()
          }
        }
      });

      res.json({
        totalUsers,
        totalEvents,
        totalParticipants,
        upcomingEvents
      });
    } catch (error) {
      console.error('İstatistikler getirilirken hata:', error);
      res.status(500).json({ error: 'İstatistikler getirilirken bir hata oluştu' });
    }
  }
}; 
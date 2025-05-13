import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const statsController = {
  // Tüm istatistikleri getir
  async getAllStats(_req: Request, res: Response) {
    try {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const lastWeek = new Date(today);
      lastWeek.setDate(lastWeek.getDate() - 7);
      const lastMonth = new Date(today);
      lastMonth.setMonth(lastMonth.getMonth() - 1);

      const [
        totalVisits,
        todayVisits,
        yesterdayVisits,
        weeklyVisits,
        monthlyVisits,
        activeUsers,
        totalUsers
      ] = await Promise.all([
        // Toplam ziyaret
        prisma.visit.count(),
        // Bugünkü ziyaret
        prisma.visit.count({
          where: {
            timestamp: {
              gte: today
            }
          }
        }),
        // Dünkü ziyaret
        prisma.visit.count({
          where: {
            timestamp: {
              gte: yesterday,
              lt: today
            }
          }
        }),
        // Haftalık ziyaret
        prisma.visit.count({
          where: {
            timestamp: {
              gte: lastWeek
            }
          }
        }),
        // Aylık ziyaret
        prisma.visit.count({
          where: {
            timestamp: {
              gte: lastMonth
            }
          }
        }),
        // Aktif kullanıcı (son 5 dakika)
        prisma.onlineUser.count({
          where: {
            lastSeen: {
              gte: new Date(now.getTime() - 5 * 60 * 1000)
            }
          }
        }),
        // Toplam benzersiz kullanıcı
        prisma.onlineUser.count()
      ]);

      // En çok ziyaret edilen sayfalar
      const popularPages = await prisma.visit.groupBy({
        by: ['path'],
        _count: {
          path: true
        },
        orderBy: {
          _count: {
            path: 'desc'
          }
        },
        take: 5
      });

      return res.json({
        visits: {
          total: totalVisits,
          today: todayVisits,
          yesterday: yesterdayVisits,
          weekly: weeklyVisits,
          monthly: monthlyVisits
        },
        users: {
          active: activeUsers,
          total: totalUsers
        },
        popularPages: popularPages.map(page => ({
          path: page.path,
          visits: page._count.path
        }))
      });
    } catch (error) {
      console.error('İstatistikler getirilirken hata:', error);
      return res.status(500).json({ error: 'İstatistikler yüklenirken bir hata oluştu' });
    }
  },

  // Günlük ziyaretçi sayısı
  getDailyVisits: async (_req: Request, res: Response) => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const visits = await prisma.visit.count({
        where: {
          timestamp: {
            gte: today
          }
        }
      });

      return res.json({ visits });
    } catch (error) {
      console.error('Günlük ziyaretçi sayısı alınırken hata:', error);
      return res.status(500).json({ error: 'Günlük ziyaretçi sayısı alınırken bir hata oluştu' });
    }
  },

  // Haftalık ziyaretçi sayısı
  getWeeklyVisits: async (_req: Request, res: Response) => {
    try {
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);

      const visits = await prisma.visit.count({
        where: {
          timestamp: {
            gte: lastWeek
          }
        }
      });

      return res.json({ visits });
    } catch (error) {
      console.error('Haftalık ziyaretçi sayısı alınırken hata:', error);
      return res.status(500).json({ error: 'Haftalık ziyaretçi sayısı alınırken bir hata oluştu' });
    }
  },

  // Aylık ziyaretçi sayısı
  getMonthlyVisits: async (_req: Request, res: Response) => {
    try {
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);

      const visits = await prisma.visit.count({
        where: {
          timestamp: {
            gte: lastMonth
          }
        }
      });

      return res.json({ visits });
    } catch (error) {
      console.error('Aylık ziyaretçi sayısı alınırken hata:', error);
      return res.status(500).json({ error: 'Aylık ziyaretçi sayısı alınırken bir hata oluştu' });
    }
  },

  // Online kullanıcı sayısı
  getOnlineUsers: async (_req: Request, res: Response) => {
    try {
      const fiveMinutesAgo = new Date();
      fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);

      const onlineUsers = await prisma.onlineUser.count({
        where: {
          lastSeen: {
            gte: fiveMinutesAgo
          }
        }
      });

      return res.json({ onlineUsers });
    } catch (error) {
      console.error('Online kullanıcı sayısı alınırken hata:', error);
      return res.status(500).json({ error: 'Online kullanıcı sayısı alınırken bir hata oluştu' });
    }
  },

  // Toplam etkinlik sayısını getir
  async getTotalEvents(_req: Request, res: Response) {
    try {
      const count = await prisma.event.count();
      return res.json({ count });
    } catch (error) {
      console.error('Toplam etkinlik sayısı getirilirken hata:', error);
      return res.status(500).json({ error: 'Toplam etkinlik sayısı getirilirken bir hata oluştu' });
    }
  },

  // Toplam katılımcı sayısını getir
  async getTotalParticipants(_req: Request, res: Response) {
    try {
      const count = await prisma.participant.count();
      return res.json({ count });
    } catch (error) {
      console.error('Toplam katılımcı sayısı getirilirken hata:', error);
      return res.status(500).json({ error: 'Toplam katılımcı sayısı yüklenirken bir hata oluştu' });
    }
  }
}; 
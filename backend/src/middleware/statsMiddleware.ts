import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const trackVisit = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const sessionId = req.sessionID || req.headers['x-session-id'] as string;
    
    if (sessionId) {
      await prisma.onlineUser.upsert({
        where: { sessionId },
        update: { lastSeen: new Date() },
        create: { sessionId }
      });
    }
    
    next();
  } catch (error) {
    console.error('Ziyaret takibi hatası:', error);
    next();
  }
};

export const getOnlineUsers = async (_req: Request, res: Response) => {
  try {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    
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
    return res.status(500).json({ error: 'Online kullanıcı sayısı alınamadı' });
  }
};

export const trackOnlineUser = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const sessionId = req.sessionID || req.headers['x-session-id'] as string;
    
    if (!sessionId) {
      console.warn('Session ID bulunamadı');
      return next();
    }

    await prisma.onlineUser.upsert({
      where: { sessionId },
      update: { 
        lastSeen: new Date()
      },
      create: {
        sessionId,
        lastSeen: new Date()
      }
    });

    next();
  } catch (error) {
    console.error('Online user tracking error:', error);
    next();
  }
}; 
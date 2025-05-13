import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface JwtPayload {
  id: number;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET || 'gizli-anahtar-123';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;

    if (!token) {
      res.status(401).json({ 
        success: false,
        error: 'Token bulunamadı' 
      });
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token doğrulama hatası:', error);
    res.status(401).json({ 
      success: false,
      error: 'Geçersiz token' 
    });
  }
};

// Admin kontrolü
export const isAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ 
      success: false,
      error: 'Yetkilendirme başarısız: Kullanıcı bulunamadı' 
    });
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id }
    });

    if (!user || user.role !== 'admin') {
      res.status(403).json({ 
        success: false,
        error: 'Yetkilendirme başarısız: Admin yetkisi gerekli' 
      });
      return;
    }

    next();
  } catch (error) {
    console.error('Admin kontrolü hatası:', error);
    res.status(500).json({ 
      success: false,
      error: 'Sunucu hatası' 
    });
  }
}; 
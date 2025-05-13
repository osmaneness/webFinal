import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || 'gizli-anahtar-123';

export const authController = {
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      console.log('Login isteği alındı:', { email });

      if (!email || !password) {
        console.log('Eksik bilgi:', { email: !!email, password: !!password });
        res.status(400).json({ 
          success: false,
          error: 'E-posta ve şifre gereklidir' 
        });
        return;
      }

      // Kullanıcıyı bul
      const user = await prisma.user.findUnique({
        where: { email }
      });

      if (!user) {
        console.log('Kullanıcı bulunamadı:', email);
        res.status(401).json({ 
          success: false,
          error: 'Geçersiz e-posta veya şifre' 
        });
        return;
      }

      console.log('Kullanıcı bulundu:', { id: user.id, email: user.email, role: user.role });

      // Şifreyi kontrol et
      const validPassword = await bcrypt.compare(password, user.password);
      console.log('Şifre kontrolü:', { validPassword });

      if (!validPassword) {
        console.log('Geçersiz şifre:', email);
        res.status(401).json({ 
          success: false,
          error: 'Geçersiz e-posta veya şifre' 
        });
        return;
      }

      // JWT token oluştur
      const token = jwt.sign(
        { 
          id: user.id, 
          email: user.email, 
          role: user.role 
        },
        JWT_SECRET,
        { expiresIn: '7d' } // 7 gün
      );

      console.log('Token oluşturuldu');

      // Token'ı cookie olarak ayarla
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 gün
        sameSite: 'lax'
      });

      console.log('Cookie ayarlandı');

      // Başarılı yanıt
      const response = {
        success: true,
        message: 'Giriş başarılı',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        },
        token
      };

      console.log('Başarılı yanıt gönderiliyor:', response);
      res.status(200).json(response);
    } catch (error) {
      console.error('Login hatası:', error);
      res.status(500).json({ 
        success: false,
        error: 'Giriş yapılırken bir hata oluştu' 
      });
    }
  },

  async me(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;
      
      if (!token) {
        res.status(401).json({ 
          success: false,
          error: 'Token bulunamadı' 
        });
        return;
      }

      const decoded = jwt.verify(token, JWT_SECRET) as { id: number; email: string; role: string };
      
      const user = await prisma.user.findUnique({
        where: { id: decoded.id }
      });

      if (!user) {
        res.status(401).json({ 
          success: false,
          error: 'Kullanıcı bulunamadı' 
        });
        return;
      }

      res.json({ 
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      });
    } catch (error) {
      console.error('Token doğrulama hatası:', error);
      res.status(401).json({ 
        success: false,
        error: 'Geçersiz token' 
      });
    }
  },

  async logout(_req: Request, res: Response): Promise<void> {
    res.clearCookie('token');
    res.json({ 
      success: true,
      message: 'Çıkış başarılı' 
    });
  }
}; 
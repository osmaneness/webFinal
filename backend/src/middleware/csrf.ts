import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

// CSRF token oluştur
export const generateCsrfToken = (req: Request, res: Response, next: NextFunction) => {
  const token = crypto.randomBytes(32).toString('hex');
  res.cookie('csrf-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
  next();
};

// CSRF token doğrula
export const validateCsrfToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies['csrf-token'];
  const headerToken = req.headers['x-csrf-token'];

  if (!token || !headerToken || token !== headerToken) {
    return res.status(403).json({ message: 'CSRF token geçersiz' });
  }

  next();
}; 
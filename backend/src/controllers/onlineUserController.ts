import { Request, Response } from 'express';
import { OnlineUser } from '../models/OnlineUser';

// Çevrimiçi kullanıcı sayısını güncelle
export const updateOnlineUser = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.body;
    
    if (!sessionId) {
      return res.status(400).json({ message: 'Oturum ID gerekli' });
    }
    
    await OnlineUser.findOneAndUpdate(
      { sessionId },
      { lastActivity: new Date() },
      { upsert: true, new: true }
    );
    
    res.json({ message: 'Çevrimiçi kullanıcı güncellendi' });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası', error });
  }
};

// Çevrimiçi kullanıcı sayısını getir
export const getOnlineUserCount = async (req: Request, res: Response) => {
  try {
    const count = await OnlineUser.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası', error });
  }
}; 
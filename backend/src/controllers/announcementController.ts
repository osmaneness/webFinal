import { Request, Response } from 'express';
import { Announcement } from '../models/Announcement';

// Tüm duyuruları getir
export const getAnnouncements = async (req: Request, res: Response) => {
  try {
    const announcements = await Announcement.find({ status: 'published' })
      .populate('author', 'name')
      .sort({ publishDate: -1 });
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası', error });
  }
};

// Tek bir duyuruyu getir
export const getAnnouncement = async (req: Request, res: Response) => {
  try {
    const announcement = await Announcement.findById(req.params.id)
      .populate('author', 'name');
    
    if (!announcement) {
      return res.status(404).json({ message: 'Duyuru bulunamadı' });
    }
    
    res.json(announcement);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası', error });
  }
};

// Yeni duyuru oluştur
export const createAnnouncement = async (req: Request, res: Response) => {
  try {
    const announcement = await Announcement.create({
      ...req.body,
      author: req.user?._id
    });
    
    res.status(201).json(announcement);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası', error });
  }
};

// Duyuru güncelle
export const updateAnnouncement = async (req: Request, res: Response) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    
    if (!announcement) {
      return res.status(404).json({ message: 'Duyuru bulunamadı' });
    }
    
    // Sadece yazar güncelleyebilir
    if (announcement.author.toString() !== req.user?._id.toString()) {
      return res.status(403).json({ message: 'Bu işlem için yetkiniz yok' });
    }
    
    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    res.json(updatedAnnouncement);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası', error });
  }
};

// Duyuru sil
export const deleteAnnouncement = async (req: Request, res: Response) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    
    if (!announcement) {
      return res.status(404).json({ message: 'Duyuru bulunamadı' });
    }
    
    // Sadece yazar silebilir
    if (announcement.author.toString() !== req.user?._id.toString()) {
      return res.status(403).json({ message: 'Bu işlem için yetkiniz yok' });
    }
    
    await announcement.deleteOne();
    res.json({ message: 'Duyuru silindi' });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası', error });
  }
}; 
import { Request, Response } from 'express';
import { Visitor } from '../models/Visitor';

// Ziyaretçi sayısını artır
export const incrementVisitor = async (req: Request, res: Response) => {
  try {
    let visitor = await Visitor.findOne();
    
    if (!visitor) {
      visitor = await Visitor.create({ count: 1 });
    } else {
      visitor.count += 1;
      await visitor.save();
    }
    
    res.json({ count: visitor.count });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası', error });
  }
};

// Ziyaretçi sayısını getir
export const getVisitorCount = async (req: Request, res: Response) => {
  try {
    const visitor = await Visitor.findOne();
    res.json({ count: visitor?.count || 0 });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası', error });
  }
};

// Ziyaretçi sayısını sıfırla
export const resetVisitorCount = async (req: Request, res: Response) => {
  try {
    let visitor = await Visitor.findOne();
    
    if (!visitor) {
      visitor = await Visitor.create({ count: 0 });
    } else {
      visitor.count = 0;
      visitor.lastReset = new Date();
      await visitor.save();
    }
    
    res.json({ count: visitor.count });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası', error });
  }
}; 
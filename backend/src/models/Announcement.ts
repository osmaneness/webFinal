import mongoose from 'mongoose';

export interface IAnnouncement extends mongoose.Document {
  title: string;
  content: string;
  author: mongoose.Types.ObjectId;
  status: 'draft' | 'published' | 'archived';
  publishDate?: Date;
}

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  publishDate: {
    type: Date
  }
}, {
  timestamps: true
});

export const Announcement = mongoose.model<IAnnouncement>('Announcement', announcementSchema); 
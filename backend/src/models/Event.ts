import mongoose from 'mongoose';
import slugify from 'slugify';

export interface IEvent extends mongoose.Document {
  title: string;
  slug: string;
  description: string;
  date: Date;
  location: string;
  category: string;
  image: string;
  price: number;
  capacity: number;
  organizer: mongoose.Types.ObjectId;
  status: 'active' | 'cancelled' | 'completed';
}

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  capacity: {
    type: Number,
    required: true,
    min: 1
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'cancelled', 'completed'],
    default: 'active'
  }
}, {
  timestamps: true
});

// Slug oluşturma middleware
eventSchema.pre('save', function(next) {
  if (!this.isModified('title')) return next();
  
  this.slug = slugify(this.title, {
    lower: true,
    strict: true,
    locale: 'tr'
  });
  
  next();
});

export const Event = mongoose.model<IEvent>('Event', eventSchema); 
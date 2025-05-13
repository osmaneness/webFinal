import mongoose from 'mongoose';

export interface IVisitor extends mongoose.Document {
  count: number;
  lastReset: Date;
}

const visitorSchema = new mongoose.Schema({
  count: {
    type: Number,
    required: true,
    default: 0
  },
  lastReset: {
    type: Date,
    required: true,
    default: Date.now
  }
});

export const Visitor = mongoose.model<IVisitor>('Visitor', visitorSchema); 
import mongoose from 'mongoose';

export interface IOnlineUser extends mongoose.Document {
  sessionId: string;
  lastActivity: Date;
}

const onlineUserSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  lastActivity: {
    type: Date,
    required: true,
    default: Date.now
  }
});

// 5 dakikadan eski oturumları temizle
onlineUserSchema.index({ lastActivity: 1 }, { expireAfterSeconds: 300 });

export const OnlineUser = mongoose.model<IOnlineUser>('OnlineUser', onlineUserSchema); 
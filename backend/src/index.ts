import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { trackVisit, trackOnlineUser } from './middleware/statsMiddleware';
import eventRoutes from './routes/eventRoutes';
import statsRoutes from './routes/statsRoutes';
import authRoutes from './routes/authRoutes';

// Çevre değişkenlerini yükle
dotenv.config();

const app = express();

// CORS ayarları
app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL'i
  credentials: true // Cookie'lerin paylaşılmasına izin ver
}));

// Request logging middleware
app.use((req, _res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  next();
});

app.use(express.json());
app.use(cookieParser());

// İstatistik middleware'leri
app.use(trackVisit);
app.use(trackOnlineUser);

// API Routes
app.use('/api/events', eventRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/auth', authRoutes);

// Ana route
app.get('/', (_req, res) => {
  res.json({ message: 'Şehir Etkinlik Rehberi API' });
});

// Error handling middleware
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Hata:', err);
  res.status(500).json({ error: 'Sunucu hatası', details: err.message });
});

// Port ayarı
const PORT = process.env.PORT || 3001;

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
  console.log(`API URL: http://localhost:${PORT}`);
  console.log('CORS ayarları:', {
    origin: 'http://localhost:3000',
    credentials: true
  });
}); 
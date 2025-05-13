# Şehir Etkinlik Rehberi API

Bu proje, şehir etkinliklerini listelemek ve yönetmek için bir REST API sunar.

## Özellikler

- Kullanıcı kimlik doğrulama ve yetkilendirme
- Etkinlik yönetimi (CRUD işlemleri)
- Duyuru yönetimi
- Ziyaretçi sayacı
- Çevrimiçi kullanıcı sayacı
- CSRF koruması

## Teknolojiler

- Node.js
- Express.js
- TypeScript
- MongoDB
- JWT
- bcryptjs

## Kurulum

1. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

2. `.env` dosyasını oluşturun:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/sehir-etkinlik
   JWT_SECRET=gizli-anahtar-buraya
   CLIENT_URL=http://localhost:3000
   ```

3. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```

## API Rotaları

### Kullanıcı İşlemleri
- `POST /api/users/register` - Kullanıcı kaydı
- `POST /api/users/login` - Kullanıcı girişi
- `GET /api/users/profile` - Kullanıcı profili

### Etkinlik İşlemleri
- `GET /api/events` - Tüm etkinlikleri listele
- `GET /api/events/:slug` - Etkinlik detayı
- `POST /api/events` - Yeni etkinlik oluştur
- `PUT /api/events/:slug` - Etkinlik güncelle
- `DELETE /api/events/:slug` - Etkinlik sil

### Duyuru İşlemleri
- `GET /api/announcements` - Tüm duyuruları listele
- `GET /api/announcements/:id` - Duyuru detayı
- `POST /api/announcements` - Yeni duyuru oluştur
- `PUT /api/announcements/:id` - Duyuru güncelle
- `DELETE /api/announcements/:id` - Duyuru sil

### İstatistik İşlemleri
- `POST /api/stats/visitor/increment` - Ziyaretçi sayısını artır
- `GET /api/stats/visitor/count` - Ziyaretçi sayısını getir
- `POST /api/stats/visitor/reset` - Ziyaretçi sayısını sıfırla
- `POST /api/stats/online/update` - Çevrimiçi kullanıcı sayısını güncelle
- `GET /api/stats/online/count` - Çevrimiçi kullanıcı sayısını getir 
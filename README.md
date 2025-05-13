# Etkinlik Yönetim Sistemi

Bu proje, etkinliklerin yönetimi ve katılımcıların takibi için geliştirilmiş bir web uygulamasıdır.

## Özellikler

- Kullanıcı yönetimi (kayıt, giriş, profil)
- Etkinlik oluşturma ve yönetme
- Etkinliklere katılım
- Admin paneli
- İstatistikler ve raporlama
- Duyuru sistemi

## Teknolojiler

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- Heroicons

### Backend
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL

## Kurulum

1. Projeyi klonlayın:
```bash
git clone [repo-url]
cd [proje-klasörü]
```

2. Frontend bağımlılıklarını yükleyin:
```bash
npm install
```

3. Backend bağımlılıklarını yükleyin:
```bash
cd backend
npm install
```

4. Gerekli ortam değişkenlerini ayarlayın:
- Frontend için `.env.local` dosyası oluşturun:
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

- Backend için `.env` dosyası oluşturun:
```
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
JWT_SECRET="your-secret-key"
FRONTEND_URL="http://localhost:3000"
```

5. Veritabanını oluşturun:
```bash
cd backend
npx prisma migrate dev
```

6. Uygulamayı başlatın:
- Frontend için:
```bash
npm run dev
```

- Backend için:
```bash
cd backend
npm run dev
```

## Kullanım

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## Lisans

MIT

import { PrismaClient } from '@prisma/client';
import slugify from 'slugify';

const prisma = new PrismaClient();

async function main() {
  // Örnek etkinlikler
  const events = [
    {
      title: 'Yaz Konseri',
      description: 'Yaz mevsiminin en güzel konseri! Ünlü sanatçılar eşliğinde unutulmaz bir gece.',
      date: new Date('2024-07-15T19:00:00'),
      location: 'Şehir Parkı Açık Hava Tiyatrosu',
      category: 'Müzik',
      image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      price: 150,
      capacity: 1000,
      organizer: 'Şehir Kültür ve Sanat Derneği',
      status: 'active'
    },
    {
      title: 'Tiyatro Gösterisi',
      description: 'Klasik tiyatro eserlerinden uyarlanan modern bir yorum.',
      date: new Date('2024-06-20T20:00:00'),
      location: 'Şehir Tiyatrosu',
      category: 'Tiyatro',
      image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      price: 100,
      capacity: 500,
      organizer: 'Şehir Tiyatrosu',
      status: 'active'
    },
    {
      title: 'Fotoğraf Sergisi',
      description: 'Yerel fotoğrafçıların eserlerinden oluşan özel bir sergi.',
      date: new Date('2024-08-01T10:00:00'),
      location: 'Şehir Sanat Galerisi',
      category: 'Sergi',
      image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      price: 50,
      capacity: 200,
      organizer: 'Şehir Fotoğraf Kulübü',
      status: 'active'
    }
  ];

  // Etkinlikleri veritabanına ekle
  for (const event of events) {
    const slug = slugify(event.title, {
      lower: true,
      strict: true,
      locale: 'tr'
    });

    await prisma.event.create({
      data: {
        ...event,
        slug
      }
    });
  }

  console.log('Örnek etkinlikler başarıyla eklendi!');
}

main()
  .catch((e) => {
    console.error('Hata:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 
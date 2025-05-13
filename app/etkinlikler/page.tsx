import Link from 'next/link';
import { Calendar, MapPin, Clock } from 'lucide-react';

// Örnek etkinlik verileri (backend bağlantısı yapılana kadar)
const etkinlikler = [
  {
    id: 1,
    baslik: 'Rock Festivali 2024',
    aciklama: 'Türkiye\'nin en büyük rock festivali',
    tarih: '2024-07-15',
    saat: '19:00',
    konum: 'İstanbul, KüçükÇiftlik Park',
    slug: 'rock-festivali-2024',
    resim: '/images/rock-festival.jpg'
  },
  {
    id: 2,
    baslik: 'Modern Sanat Sergisi',
    aciklama: 'Çağdaş sanatın en iyi örnekleri',
    tarih: '2024-06-01',
    saat: '10:00',
    konum: 'İstanbul Modern',
    slug: 'modern-sanat-sergisi',
    resim: '/images/art-exhibition.jpg'
  },
  // Daha fazla etkinlik eklenebilir
];

export default function Etkinlikler() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Etkinlikler</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Şehrinizdeki tüm etkinlikleri keşfedin
          </p>
        </div>
        
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {etkinlikler.map((etkinlik) => (
            <article key={etkinlik.id} className="flex flex-col items-start">
              <div className="relative w-full">
                <img
                  src={etkinlik.resim}
                  alt={etkinlik.baslik}
                  className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                />
              </div>
              <div className="max-w-xl">
                <div className="mt-8 flex items-center gap-x-4 text-xs">
                  <time dateTime={etkinlik.tarih} className="text-gray-500">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    {new Date(etkinlik.tarih).toLocaleDateString('tr-TR')}
                  </time>
                  <time className="text-gray-500">
                    <Clock className="h-4 w-4 inline mr-1" />
                    {etkinlik.saat}
                  </time>
                  <div className="text-gray-500">
                    <MapPin className="h-4 w-4 inline mr-1" />
                    {etkinlik.konum}
                  </div>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <Link href={`/etkinlik/${etkinlik.slug}`}>
                      <span className="absolute inset-0" />
                      {etkinlik.baslik}
                    </Link>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{etkinlik.aciklama}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
} 
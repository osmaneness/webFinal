import { Calendar, MapPin, Clock } from 'lucide-react';

// Örnek etkinlik verisi (backend bağlantısı yapılana kadar)
const etkinlik = {
  id: 1,
  baslik: 'Rock Festivali 2024',
  aciklama: 'Türkiye\'nin en büyük rock festivali',
  detayliAciklama: `Türkiye'nin en büyük rock festivali olan Rock Festivali 2024, bu yıl da müzikseverleri buluşturuyor. 
  Üç gün sürecek festivalde, yerli ve yabancı birçok ünlü sanatçı sahne alacak. 
  Festival alanında yiyecek ve içecek standları, sanat sergileri ve daha birçok aktivite bulunuyor.`,
  tarih: '2024-07-15',
  saat: '19:00',
  konum: 'İstanbul, KüçükÇiftlik Park',
  slug: 'rock-festivali-2024',
  resim: '/images/rock-festival.jpg',
  galeri: [
    '/images/rock-festival-1.jpg',
    '/images/rock-festival-2.jpg',
    '/images/rock-festival-3.jpg',
  ]
};

export default function EtkinlikDetay({ params }: { params: { slug: string } }) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="relative">
            <img
              src={etkinlik.resim}
              alt={etkinlik.baslik}
              className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover"
            />
          </div>
          
          <div className="mt-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {etkinlik.baslik}
            </h1>
            
            <div className="mt-4 flex items-center gap-x-4 text-sm">
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
            
            <div className="mt-8 text-lg leading-8 text-gray-600">
              <p className="mb-4">{etkinlik.aciklama}</p>
              <p>{etkinlik.detayliAciklama}</p>
            </div>
            
            {/* Galeri */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">Galeri</h2>
              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {etkinlik.galeri.map((resim, index) => (
                  <div key={index} className="group relative">
                    <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
                      <img
                        src={resim}
                        alt={`${etkinlik.baslik} - Fotoğraf ${index + 1}`}
                        className="object-cover object-center"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
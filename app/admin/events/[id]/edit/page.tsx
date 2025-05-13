'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CalendarIcon, MapPinIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { use } from 'react';
import { useEvents } from '@/app/context/EventContext';

// Örnek etkinlik verileri (backend bağlantısı yapılana kadar)
const ornekEtkinlikler = [
  {
    id: 1,
    baslik: 'Rock Festivali 2024',
    tarih: '2024-07-15',
    saat: '19:00',
    konum: 'İstanbul, Harbiye Açık Hava Tiyatrosu',
    kapasite: 5000,
    katilimciSayisi: 3200,
    durum: 'Aktif',
    aciklama: 'Türkiye\'nin en büyük rock festivali!',
  },
  {
    id: 2,
    baslik: 'Modern Sanat Sergisi',
    tarih: '2024-04-20',
    saat: '10:00',
    konum: 'Ankara, Modern Sanatlar Müzesi',
    kapasite: 200,
    katilimciSayisi: 45,
    durum: 'Yakında',
    aciklama: 'Modern sanatın en güzel örnekleri bu sergide!',
  },
  {
    id: 3,
    baslik: 'Teknoloji Konferansı',
    tarih: '2024-05-10',
    saat: '09:00',
    konum: 'İzmir, Fuar İzmir',
    kapasite: 1000,
    katilimciSayisi: 850,
    durum: 'Tamamlandı',
    aciklama: 'Teknoloji dünyasının önde gelen isimleri bir araya geliyor!',
  },
];

export default function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const { events, updateEvent } = useEvents();
  const [formData, setFormData] = useState({
    baslik: '',
    tarih: '',
    saat: '',
    konum: '',
    kapasite: '',
    aciklama: '',
    durum: '',
  });

  useEffect(() => {
    const event = events.find(e => e.id === parseInt(resolvedParams.id));
    if (event) {
      setFormData({
        baslik: event.baslik,
        tarih: event.tarih,
        saat: event.saat,
        konum: event.konum,
        kapasite: event.kapasite.toString(),
        aciklama: event.aciklama,
        durum: event.durum,
      });
    }
  }, [resolvedParams.id, events]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const eventId = parseInt(resolvedParams.id);
    updateEvent(eventId, {
      ...formData,
      kapasite: parseInt(formData.kapasite),
    });
    alert('Etkinlik başarıyla güncellendi!');
    router.push('/admin/events');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Etkinlik Düzenle</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="baslik" className="block text-sm font-medium text-gray-700">
                    Etkinlik Başlığı
                  </label>
                  <input
                    type="text"
                    name="baslik"
                    id="baslik"
                    required
                    value={formData.baslik}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="durum" className="block text-sm font-medium text-gray-700">
                    Durum
                  </label>
                  <select
                    name="durum"
                    id="durum"
                    value={formData.durum}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="Yakında">Yakında</option>
                    <option value="Aktif">Aktif</option>
                    <option value="Tamamlandı">Tamamlandı</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="tarih" className="block text-sm font-medium text-gray-700">
                    Tarih
                  </label>
                  <input
                    type="date"
                    name="tarih"
                    id="tarih"
                    required
                    value={formData.tarih}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="saat" className="block text-sm font-medium text-gray-700">
                    Saat
                  </label>
                  <input
                    type="time"
                    name="saat"
                    id="saat"
                    required
                    value={formData.saat}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="konum" className="block text-sm font-medium text-gray-700">
                    Konum
                  </label>
                  <input
                    type="text"
                    name="konum"
                    id="konum"
                    required
                    value={formData.konum}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="kapasite" className="block text-sm font-medium text-gray-700">
                    Kapasite
                  </label>
                  <input
                    type="number"
                    name="kapasite"
                    id="kapasite"
                    required
                    min="1"
                    value={formData.kapasite}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="aciklama" className="block text-sm font-medium text-gray-700">
                    Açıklama
                  </label>
                  <textarea
                    name="aciklama"
                    id="aciklama"
                    rows={4}
                    value={formData.aciklama}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => router.push('/admin/events')}
                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                İptal
              </button>
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Değişiklikleri Kaydet
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 
'use client';

import { useEffect, useState } from 'react';
import { Event, eventService } from '../services/eventService';

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventService.getAllEvents();
        setEvents(data);
        setError(null);
      } catch (err) {
        setError('Etkinlikler yüklenirken bir hata oluştu');
        console.error('Etkinlikler yüklenirken hata:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Etkinlikler</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {event.image && (
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
              <p className="text-gray-600 mb-4">{event.description}</p>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Tarih:</span> {new Date(event.date).toLocaleDateString('tr-TR')}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Konum:</span> {event.location}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Kategori:</span> {event.category}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Kapasite:</span> {event.capacity}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Ücret:</span> {event.price} TL
                </p>
              </div>
              <div className="flex justify-between items-center">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  event.status === 'active' ? 'bg-green-100 text-green-800' :
                  event.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {event.status === 'active' ? 'Aktif' :
                   event.status === 'cancelled' ? 'İptal Edildi' :
                   'Tamamlandı'}
                </span>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Detaylar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
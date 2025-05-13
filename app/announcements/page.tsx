'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Announcement {
  id: number;
  title: string;
  content: string;
  slug: string;
  image: string | null;
  category: string;
  publishedAt: string | null;
  createdAt: string;
  author: {
    name: string;
  };
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        console.log('Duyurular yükleniyor...'); // Debug için log
        const response = await fetch('http://localhost:3001/api/announcements', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('API yanıtı:', response.status); // Debug için log

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Duyurular yüklenirken bir hata oluştu');
        }

        const data = await response.json();
        console.log('Alınan duyurular:', data); // Debug için log
        setAnnouncements(data);
      } catch (err) {
        console.error('Hata detayı:', err); // Debug için log
        setError(err instanceof Error ? err.message : 'Bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (announcements.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Duyurular</h1>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-600">Henüz duyuru bulunmuyor.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Duyurular</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {announcements.map((announcement) => (
            <Link 
              href={`/announcements/${announcement.slug}`}
              key={announcement.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {announcement.image && (
                <div className="relative h-48 w-full">
                  <Image
                    src={announcement.image}
                    alt={announcement.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-indigo-600 font-medium">
                    {announcement.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(announcement.createdAt).toLocaleDateString('tr-TR')}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {announcement.title}
                </h2>
                <p className="text-gray-600 line-clamp-3">
                  {announcement.content}
                </p>
                <div className="mt-4 text-sm text-gray-500">
                  Yazar: {announcement.author.name}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 
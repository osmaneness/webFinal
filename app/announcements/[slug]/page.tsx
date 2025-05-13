'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';

interface Announcement {
  id: number;
  title: string;
  content: string;
  image: string | null;
  category: string;
  publishedAt: string | null;
  createdAt: string;
  author: {
    name: string;
  };
}

export default function AnnouncementDetailPage() {
  const params = useParams();
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/announcements/${params.slug}`);
        if (!response.ok) throw new Error('Duyuru yüklenirken bir hata oluştu');
        const data = await response.json();
        setAnnouncement(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncement();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error || !announcement) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">{error || 'Duyuru bulunamadı'}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {announcement.image && (
            <div className="relative h-96 w-full">
              <Image
                src={announcement.image}
                alt={announcement.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="p-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-indigo-600 font-medium">
                {announcement.category}
              </span>
              <span className="text-sm text-gray-500">
                {new Date(announcement.createdAt).toLocaleDateString('tr-TR')}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {announcement.title}
            </h1>
            <div className="prose max-w-none">
              {announcement.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-8 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Yazar: {announcement.author.name}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
} 
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Content {
  id: number;
  title: string;
  type: string;
  status: string;
  createdAt: string;
}

export default function ContentsPage() {
  const router = useRouter();
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('Token bulunamadı, login sayfasına yönlendiriliyor...');
        router.replace('/login');
        return;
      }
    };

    const fetchContents = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Oturum bulunamadı');
        }

        const response = await fetch('http://localhost:3001/api/contents', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('İçerikler yüklenirken bir hata oluştu');
        }

        const data = await response.json();
        setContents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
    fetchContents();
  }, [router]);

  if (loading) {
    return <div className="p-8">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">Hata: {error}</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">İçerik Yönetimi</h1>
        <button
          onClick={() => {/* Yeni içerik ekleme modalını aç */}}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Yeni İçerik Ekle
        </button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>İçerikler</CardTitle>
        </CardHeader>
        <CardContent>
          {contents.length === 0 ? (
            <p className="text-gray-500">Henüz içerik bulunmuyor.</p>
          ) : (
            <div className="space-y-4">
              {contents.map((content) => (
                <div
                  key={content.id}
                  className="flex justify-between items-center p-4 border rounded hover:bg-gray-50"
                >
                  <div>
                    <h3 className="font-medium">{content.title}</h3>
                    <p className="text-sm text-gray-500">
                      {content.type} • {content.status} • {new Date(content.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {/* Düzenleme modalını aç */}}
                      className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => {/* Silme onayı modalını aç */}}
                      className="px-3 py-1 text-sm text-red-600 hover:text-red-800"
                    >
                      Sil
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 
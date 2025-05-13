'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

// Örnek galeri verileri (backend bağlantısı yapılana kadar)
const galeri = [
  {
    id: 1,
    baslik: 'Rock Festivali 2024',
    resimler: [
      '/images/rock-festival-1.jpg',
      '/images/rock-festival-2.jpg',
      '/images/rock-festival-3.jpg',
    ]
  },
  {
    id: 2,
    baslik: 'Modern Sanat Sergisi',
    resimler: [
      '/images/art-exhibition-1.jpg',
      '/images/art-exhibition-2.jpg',
      '/images/art-exhibition-3.jpg',
    ]
  },
  // Daha fazla galeri eklenebilir
];

export default function Galeri() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Galeri</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Etkinliklerimizden kareler
          </p>
        </div>

        <div className="mt-16 space-y-12">
          {galeri.map((album) => (
            <div key={album.id}>
              <h3 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">
                {album.baslik}
              </h3>
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {album.resimler.map((resim, index) => (
                  <div
                    key={index}
                    className="group relative cursor-pointer"
                    onClick={() => setSelectedImage(resim)}
                  >
                    <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
                      <img
                        src={resim}
                        alt={`${album.baslik} - Fotoğraf ${index + 1}`}
                        className="object-cover object-center group-hover:opacity-75"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-6 w-6" />
          </button>
          <img
            src={selectedImage}
            alt="Büyük görüntü"
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
        </div>
      )}
    </div>
  );
} 
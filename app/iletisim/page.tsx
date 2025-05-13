'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Iletisim() {
  const [formData, setFormData] = useState({
    ad: '',
    email: '',
    konu: '',
    mesaj: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Backend bağlantısı yapılana kadar console.log
    console.log('Form verileri:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">İletişim</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Bizimle iletişime geçin
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold leading-8 text-gray-900">İletişim Bilgileri</h3>
              <dl className="mt-6 space-y-4 text-base leading-7 text-gray-600">
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <Mail className="h-6 w-6 text-gray-400" aria-hidden="true" />
                  </dt>
                  <dd>
                    <a className="hover:text-gray-900" href="mailto:info@etkinlikrehberi.com">
                      info@etkinlikrehberi.com
                    </a>
                  </dd>
                </div>
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <Phone className="h-6 w-6 text-gray-400" aria-hidden="true" />
                  </dt>
                  <dd>
                    <a className="hover:text-gray-900" href="tel:+905551234567">
                      +90 (555) 123 45 67
                    </a>
                  </dd>
                </div>
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <MapPin className="h-6 w-6 text-gray-400" aria-hidden="true" />
                  </dt>
                  <dd>
                    İstanbul, Türkiye
                  </dd>
                </div>
              </dl>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="ad" className="block text-sm font-medium leading-6 text-gray-900">
                  Ad Soyad
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="ad"
                    id="ad"
                    value={formData.ad}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="konu" className="block text-sm font-medium leading-6 text-gray-900">
                  Konu
                </label>
                <div className="mt-2">
                  <select
                    name="konu"
                    id="konu"
                    value={formData.konu}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  >
                    <option value="">Seçiniz</option>
                    <option value="genel">Genel Bilgi</option>
                    <option value="etkinlik">Etkinlik Önerisi</option>
                    <option value="isbirligi">İş Birliği</option>
                    <option value="diger">Diğer</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="mesaj" className="block text-sm font-medium leading-6 text-gray-900">
                  Mesaj
                </label>
                <div className="mt-2">
                  <textarea
                    name="mesaj"
                    id="mesaj"
                    rows={4}
                    value={formData.mesaj}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Gönder
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 
'use client';

import { useState } from 'react';
import {
  GlobeAltIcon,
  BellIcon,
  ShieldCheckIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteBaslik: 'Admin Panel',
    siteAciklama: 'Modern ve kullanıcı dostu admin paneli',
    emailBildirimleri: true,
    ikiFaktorluDogrulama: false,
    tema: 'light',
    dil: 'tr',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setSettings(prev => ({
      ...prev,
      [name]: newValue
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Burada ayarları kaydetme işlemi yapılacak
    alert('Ayarlar kaydedildi!');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Ayarlar</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Site Ayarları */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center mb-4">
                <GlobeAltIcon className="h-6 w-6 text-indigo-600 mr-2" />
                <h2 className="text-lg font-medium text-gray-900">Site Ayarları</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="siteBaslik" className="block text-sm font-medium text-gray-700">
                    Site Başlığı
                  </label>
                  <input
                    type="text"
                    name="siteBaslik"
                    id="siteBaslik"
                    value={settings.siteBaslik}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="siteAciklama" className="block text-sm font-medium text-gray-700">
                    Site Açıklaması
                  </label>
                  <textarea
                    name="siteAciklama"
                    id="siteAciklama"
                    rows={3}
                    value={settings.siteAciklama}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Bildirim Ayarları */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center mb-4">
                <BellIcon className="h-6 w-6 text-indigo-600 mr-2" />
                <h2 className="text-lg font-medium text-gray-900">Bildirim Ayarları</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="emailBildirimleri"
                    id="emailBildirimleri"
                    checked={settings.emailBildirimleri}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="emailBildirimleri" className="ml-2 block text-sm text-gray-900">
                    E-posta Bildirimleri
                  </label>
                </div>
              </div>
            </div>

            {/* Güvenlik Ayarları */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center mb-4">
                <ShieldCheckIcon className="h-6 w-6 text-indigo-600 mr-2" />
                <h2 className="text-lg font-medium text-gray-900">Güvenlik Ayarları</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="ikiFaktorluDogrulama"
                    id="ikiFaktorluDogrulama"
                    checked={settings.ikiFaktorluDogrulama}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="ikiFaktorluDogrulama" className="ml-2 block text-sm text-gray-900">
                    İki Faktörlü Doğrulama
                  </label>
                </div>
              </div>
            </div>

            {/* Görünüm Ayarları */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center mb-4">
                <UserCircleIcon className="h-6 w-6 text-indigo-600 mr-2" />
                <h2 className="text-lg font-medium text-gray-900">Görünüm Ayarları</h2>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="tema" className="block text-sm font-medium text-gray-700">
                    Tema
                  </label>
                  <select
                    name="tema"
                    id="tema"
                    value={settings.tema}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="light">Açık Tema</option>
                    <option value="dark">Koyu Tema</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="dil" className="block text-sm font-medium text-gray-700">
                    Dil
                  </label>
                  <select
                    name="dil"
                    id="dil"
                    value={settings.dil}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="tr">Türkçe</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Ayarları Kaydet
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 
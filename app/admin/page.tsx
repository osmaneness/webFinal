'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import {
  HomeIcon,
  UserGroupIcon,
  CalendarIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function AdminDashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get('token');
      console.log('Token kontrolü:', { token: !!token });

      if (!token) {
        console.log('Token bulunamadı, login sayfasına yönlendiriliyor');
        router.replace('/login');
        return;
      }

      try {
        // Token'ın geçerliliğini kontrol et
        const response = await fetch(`${API_URL}/api/auth/me`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        console.log('Token doğrulama yanıtı:', {
          status: response.status,
          ok: response.ok
        });

        if (!response.ok) {
          console.log('Token geçersiz, login sayfasına yönlendiriliyor');
          // Token geçersizse temizle ve login'e yönlendir
          Cookies.remove('token');
          localStorage.removeItem('user');
          router.replace('/login');
          return;
        }

        const data = await response.json();
        console.log('Kullanıcı bilgileri alındı:', data);

        if (data.success && data.user) {
          if (data.user.role !== 'admin') {
            console.log('Admin yetkisi yok, login sayfasına yönlendiriliyor');
            Cookies.remove('token');
            localStorage.removeItem('user');
            router.replace('/login');
            return;
          }
          setUser(data.user);
          setIsLoading(false);
        } else {
          throw new Error('Kullanıcı bilgileri alınamadı');
        }
      } catch (error) {
        console.error('Oturum kontrolü hatası:', error);
        Cookies.remove('token');
        localStorage.removeItem('user');
        router.replace('/login');
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      const token = Cookies.get('token');
      const response = await fetch(`${API_URL}/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (response.ok) {
        // Cookie'yi sil
        Cookies.remove('token');
        // LocalStorage'ı temizle
        localStorage.removeItem('user');
        // Login sayfasına yönlendir
        router.replace('/login');
      }
    } catch (error) {
      console.error('Çıkış yapılırken hata:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  const menuItems = [
    { name: 'Ana Sayfa', icon: HomeIcon, href: '/admin' },
    { name: 'Kullanıcılar', icon: UserGroupIcon, href: '/admin/users' },
    { name: 'Etkinlikler', icon: CalendarIcon, href: '/admin/events' },
    { name: 'İstatistikler', icon: ChartBarIcon, href: '/admin/stats' },
    { name: 'Ayarlar', icon: CogIcon, href: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-indigo-600">Admin Panel</h1>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 mr-4">
                Hoş geldiniz, {user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="ml-4 flex items-center text-gray-500 hover:text-gray-700"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-1" />
                Çıkış Yap
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {menuItems.map((item) => (
              <div
                key={item.name}
                onClick={() => router.push(item.href)}
                className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-md transition-shadow duration-300"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <item.icon className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div className="ml-5">
                      <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 
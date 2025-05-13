'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import {
  ChartBarIcon,
  UserGroupIcon,
  CalendarIcon,
  TicketIcon,
} from '@heroicons/react/24/outline';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface Stats {
  totalUsers: number;
  totalEvents: number;
  totalParticipants: number;
  upcomingEvents: number;
}

export default function AdminStats() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<Stats | null>(null);

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

        if (!response.ok) {
          console.log('Token geçersiz, login sayfasına yönlendiriliyor');
          Cookies.remove('token');
          localStorage.removeItem('user');
          router.replace('/login');
          return;
        }

        const data = await response.json();
        if (data.success && data.user) {
          if (data.user.role !== 'admin') {
            console.log('Admin yetkisi yok, login sayfasına yönlendiriliyor');
            Cookies.remove('token');
            localStorage.removeItem('user');
            router.replace('/login');
            return;
          }
          // İstatistikleri getir
          const statsResponse = await fetch(`${API_URL}/api/admin/stats`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          });

          if (statsResponse.ok) {
            const statsData = await statsResponse.json();
            setStats(statsData);
          }
          setIsLoading(false);
        }
      } catch (error) {
        console.error('İstatistikler yüklenirken hata:', error);
        router.replace('/login');
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  const statCards = [
    {
      name: 'Toplam Kullanıcı',
      value: stats?.totalUsers || 0,
      icon: UserGroupIcon,
      color: 'bg-blue-500',
    },
    {
      name: 'Toplam Etkinlik',
      value: stats?.totalEvents || 0,
      icon: CalendarIcon,
      color: 'bg-green-500',
    },
    {
      name: 'Toplam Katılımcı',
      value: stats?.totalParticipants || 0,
      icon: TicketIcon,
      color: 'bg-yellow-500',
    },
    {
      name: 'Yaklaşan Etkinlik',
      value: stats?.upcomingEvents || 0,
      icon: ChartBarIcon,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">İstatistikler</h1>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {statCards.map((stat) => (
              <div
                key={stat.name}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 rounded-md p-3 ${stat.color}`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          {stat.name}
                        </dt>
                        <dd className="text-lg font-semibold text-gray-900">
                          {stat.value}
                        </dd>
                      </dl>
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
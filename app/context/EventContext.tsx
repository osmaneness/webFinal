'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  description: string;
  status: 'Aktif' | 'Yakında' | 'Tamamlandı';
  author: {
    name: string;
  };
}

interface EventContextType {
  events: Event[];
  loading: boolean;
  error: string | null;
  refreshEvents: () => Promise<void>;
  deleteEvent: (id: number) => Promise<void>;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export function EventProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

      const response = await fetch(`${API_URL}/api/events`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache',
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        let errorMessage = `Etkinlikler getirilirken bir hata oluştu (${response.status} ${response.statusText})`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          // If response is not JSON, use status text
          errorMessage = `Sunucu yanıtı alınamadı (${response.status} ${response.statusText})`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      setEvents(Array.isArray(data) ? data : []);
    } catch (err) {
      let errorMessage: string;
      
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          errorMessage = 'Sunucu yanıt vermedi. Lütfen daha sonra tekrar deneyin.';
        } else if (err.message.includes('Failed to fetch')) {
          errorMessage = 'Sunucuya bağlanılamadı. Lütfen sunucunun çalışır durumda olduğunu kontrol edin.';
        } else {
          errorMessage = err.message;
        }
      } else {
        errorMessage = 'Beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyin.';
      }

      console.error('Etkinlikler yüklenirken hata:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteEvent = useCallback(async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/api/events/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        let errorMessage = `Etkinlik silinirken bir hata oluştu (${response.status} ${response.statusText})`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          errorMessage = `Sunucu yanıtı alınamadı (${response.status} ${response.statusText})`;
        }
        throw new Error(errorMessage);
      }

      await fetchEvents();
    } catch (err) {
      console.error('Etkinlik silinirken hata:', err);
      throw err instanceof Error 
        ? err 
        : new Error('Etkinlik silinirken beklenmeyen bir hata oluştu');
    }
  }, [fetchEvents]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return (
    <EventContext.Provider value={{ events, loading, error, refreshEvents: fetchEvents, deleteEvent }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
}
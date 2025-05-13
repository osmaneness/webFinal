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

export function EventProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/events', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache',
        },
      });

      if (!response.ok) {
        let errorMessage = `Etkinlikler getirilirken bir hata oluştu (${response.status} ${response.statusText})`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          // If we can't parse the error response, use the default message
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      setEvents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Etkinlikler yüklenirken hata:', err);
      setError(
        err instanceof Error 
          ? err.message 
          : 'Sunucu ile bağlantı kurulamadı. Lütfen internet bağlantınızı ve sunucunun çalışır durumda olduğunu kontrol edin.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteEvent = useCallback(async (id: number) => {
    try {
      const response = await fetch(`/api/events/${id}`, {
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
          // If we can't parse the error response, use the default message
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
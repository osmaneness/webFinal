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
      
      // Use relative URL to automatically match the current protocol and host
      const response = await fetch('/api/events', {
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        // Try to get detailed error message from response
        let errorMessage = 'Etkinlikler getirilirken bir hata oluştu';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          errorMessage = `Sunucu hatası: ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      setEvents(data);
    } catch (err) {
      console.error('Etkinlikler yüklenirken hata:', err);
      setError(
        err instanceof Error 
          ? err.message 
          : 'Sunucu ile bağlantı kurulamadı. Lütfen internet bağlantınızı kontrol edin.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteEvent = useCallback(async (id: number) => {
    try {
      const response = await fetch(`/api/events/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        let errorMessage = 'Etkinlik silinirken bir hata oluştu';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          errorMessage = `Sunucu hatası: ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      await fetchEvents();
    } catch (err) {
      console.error('Etkinlik silinirken hata:', err);
      throw err;
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
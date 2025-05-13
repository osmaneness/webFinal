const API_URL = 'http://localhost:3001/api';

export interface Event {
  id: number;
  title: string;
  slug: string;
  description: string;
  date: string;
  location: string;
  category: string;
  image: string;
  price: number;
  capacity: number;
  organizer: string;
  status: 'active' | 'cancelled' | 'completed';
  createdAt?: string;
  updatedAt?: string;
}

const defaultOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include' as RequestCredentials
};

export const eventService = {
  async getAllEvents(): Promise<Event[]> {
    try {
      console.log('Fetching events from:', `${API_URL}/events`);
      const response = await fetch(`${API_URL}/events`, defaultOptions);
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Etkinlikler yüklenirken bir hata oluştu');
      }
      
      const data = await response.json();
      console.log('Received events:', data);
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  },

  async getEventById(id: string): Promise<Event> {
    const response = await fetch(`${API_URL}/events/${id}`, defaultOptions);
    if (!response.ok) {
      throw new Error('Etkinlik yüklenirken bir hata oluştu');
    }
    return response.json();
  },

  async createEvent(eventData: Omit<Event, 'id' | 'slug' | 'createdAt' | 'updatedAt'>): Promise<Event> {
    try {
      console.log('Creating event with data:', eventData);
      const response = await fetch(`${API_URL}/events`, {
        ...defaultOptions,
        method: 'POST',
        body: JSON.stringify(eventData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Etkinlik oluşturulurken bir hata oluştu');
      }
      
      const data = await response.json();
      console.log('Created event:', data);
      return data;
    } catch (error) {
      console.error('Create event error:', error);
      throw error;
    }
  },

  async updateEvent(id: string, eventData: Partial<Event>): Promise<Event> {
    const response = await fetch(`${API_URL}/events/${id}`, {
      ...defaultOptions,
      method: 'PUT',
      body: JSON.stringify(eventData),
    });
    if (!response.ok) {
      throw new Error('Etkinlik güncellenirken bir hata oluştu');
    }
    return response.json();
  },

  async deleteEvent(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/events/${id}`, {
      ...defaultOptions,
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Etkinlik silinirken bir hata oluştu');
    }
  }
}; 
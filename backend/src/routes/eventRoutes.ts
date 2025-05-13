import express from 'express';
import { eventController } from '../controllers/eventController';
import { authMiddleware, isAdmin } from '../middleware/auth';

const router = express.Router();

// Get all events
router.get('/api/events', eventController.getAllEvents);

// Get event details
router.get('/api/events/:id', eventController.getEventById);

// Create new event (admin only)
router.post('/api/events', authMiddleware, isAdmin, eventController.createEvent);

// Update event (admin only)
router.put('/api/events/:id', authMiddleware, isAdmin, eventController.updateEvent);

// Delete event (admin only)
router.delete('/api/events/:id', authMiddleware, isAdmin, eventController.deleteEvent);

export default router;
import express from 'express';
import { searchPlaces } from '../config/places.js';

const router = express.Router();

// GET /api/places/search
router.get('/search', async (req, res) => {
  try {
    const { query, maxResults } = req.query;
    
    if (!query) {
      return res.status(400).json({ 
        error: 'Необхідно вказати параметр query' 
      });
    }

    console.log('Отримано запит:', { query, maxResults });
    const places = await searchPlaces(query, parseInt(maxResults) || 5);
    console.log('Результати пошуку:', places);
    
    res.json({ places });
  } catch (error) {
    console.error('Помилка при обробці запиту:', error);
    res.status(500).json({ 
      error: 'Помилка при пошуку закладів',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

export default router; 
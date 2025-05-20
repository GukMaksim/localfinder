import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import placesRouter from './routes/places.js';

// Перевірка наявності API ключа
if (!process.env.GOOGLE_MAPS_API_KEY) {
  console.error('Помилка: GOOGLE_MAPS_API_KEY не встановлено в .env файлі');
  process.exit(1);
}

const app = express();

// Налаштування CORS
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// Роути
app.use('/api/places', placesRouter);

// Обробка помилок
app.use((err, req, res, next) => {
  console.error('Помилка сервера:', err);
  res.status(500).json({
    error: 'Внутрішня помилка сервера',
    details: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Сервер запущено на порту ${PORT}`);
}); 
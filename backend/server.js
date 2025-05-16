import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { analyzeQuery } from './gemini.js';

// Створюємо екземпляр програми Express
const app = express();
app.use(cors());
app.use(express.json());

// Обробник для головного маршруту (/)
app.get('/', (req, res) => {
  res.send('Привіт від бекенду!');
});

// Визначаємо порт, на якому буде слухати сервер
const port = process.env.PORT || 3000;

// Запускаємо сервер і починаємо прослуховувати вказаний порт
app.listen(port, () => {
  console.log(`Сервер запущено на http://localhost:${port}`);
});

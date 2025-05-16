import 'dotenv/config';
import express from 'express';

// Створюємо екземпляр програми Express
const app = express();

// Визначаємо порт, на якому буде слухати сервер
const port = process.env.PORT || 3000;

// Обробник для головного маршруту (/)
app.get('/', (req, res) => {
  res.send('Привіт від бекенду!');
});

// Запускаємо сервер і починаємо прослуховувати вказаний порт
app.listen(port, () => {
  console.log(`Сервер запущено на http://localhost:${port}`);
});

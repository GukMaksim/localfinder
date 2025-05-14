import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export const parseUserQuery = async (query) => {
  const prompt = `Розбери наступний запит користувача на тип об'єкта та локацію. Виведи у JSON:
{
  "type": "тип закладу",
  "location": "місце розташування"
}
Запит: "${query}"`;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'Ти помічник, який структуровано розбирає локальні пошукові запити користувачів.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.2,
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const text = response.data.choices[0].message.content;
    const parsed = JSON.parse(text);
    return parsed;
  } catch (error) {
    console.error('OpenAI error:', error.message);
    return null;
  }
};

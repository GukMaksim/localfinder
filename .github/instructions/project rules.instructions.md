---
applyTo: '**'
---
Coding standards, domain knowledge, and preferences that AI should follow.
Я хочу створити веб портал, на якому користувачі шукали де поруч знаходиться те що вони шукають, наприклад: "Де на оболоні поїсти суші", "де на подолі є салони краси", "де в конотопі замовити кондиціонер" і так далі. Цей запит повинен обробитись штучним інтелектом та повернути інформацію з Google Maps: назва закладу, адреса, телефон, адреса сайту, рейтинг та відгуки.

🔧 Що потрібно:
1. Фронтенд
Vue + Vite + Tailwind
Форма для введення запиту
Вивід результатів у вигляді карток + карта з маркерами

2. Бекенд
Node.js з Express або аналог
Модуль обробки запитів користувача: парсинг природної мови

3. Google API
Places API: для пошуку закладів
Geocoding API: для визначення географічних координат по назві району/міста
Place Details API: для отримання повної інформації (адреса, сайт, рейтинг, відгуки)

4. AI або NLP обробка
Використати Gemini API (model: "gemini-2.0-flash") для аналізу запиту:
Визначити тип об'єкта (наприклад, суші, салон краси, кондиціонери)
Визначити локацію (Оболонь, Поділ, Конотоп)
Документація Gemini API: https://ai.google.dev/gemini-api/docs
ще документація https://ai.google.dev/gemini-api/docs/quickstart?lang=node
Structured output - https://ai.google.dev/gemini-api/docs/structured-output

🧠 Як працює логіка:
Користувач вводить запит, наприклад: "де на оболоні поїсти суші"
Бекенд обробляє його (наприклад, AI визначає: тип — "ресторани суші", локація — "Оболонь, Київ")
Використовується Google Geocoding API → координати району
Google Places API → пошук "sushi restaurants" в радіусі координат
Google Place Details API → детальна інформація по кожному місцю
Відповідь повертається на фронтенд

🛠 Мінімальний стек для MVP:
Frontend: Vue + Vite + Tailwind
Backend: Node.js + Express
APIs: Google Maps (Places, Geocoding, Details), Gemini API

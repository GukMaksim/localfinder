import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import './index.css'

// Створюємо екземпляр Pinia для управління станом
const pinia = createPinia()

// Створюємо додаток
const app = createApp(App)

// Підключаємо Pinia
app.use(pinia)

// Монтуємо додаток
app.mount('#app')

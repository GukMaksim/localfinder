<template>
  <div class="places-search">
    <div class="search-form mb-6">
      <form @submit.prevent="searchPlaces"
        class="flex flex-col md:flex-row items-end gap-3 bg-white p-4 rounded-xl shadow-md">
        <div class="flex flex-col w-full md:w-2/5">
          <label class="label mb-1">
            <span class="label-text font-semibold text-gray-700">Що шукаємо?</span>
          </label>
          <input v-model="searchQuery" type="text" placeholder="Наприклад: поїсти суші на оболоні"
            class="input input-bordered w-full rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/60 shadow-sm transition" />
        </div>
        <div class="flex flex-col w-full md:w-1/5">
          <label class="label mb-1">
            <span class="label-text font-semibold text-gray-700">Кількість результатів</span>
          </label>
          <select v-model="resultCount"
            class="select select-bordered w-full rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/60 shadow-sm transition">
            <option value="1">1 заклад</option>
            <option value="5">5 закладів</option>
            <option value="10">10 закладів</option>
            <option value="15">15 закладів</option>
            <option value="20">20 закладів</option>
          </select>
        </div>
        <button type="submit"
          class="btn btn-primary w-full md:w-auto rounded-full px-8 py-2 font-bold text-lg shadow-md transition hover:scale-105 hover:bg-primary/80 disabled:opacity-60"
          :disabled="isLoading">
          <span v-if="isLoading" class="loading loading-spinner"></span>
          {{ isLoading ? 'Пошук...' : 'Знайти заклади' }}
        </button>
      </form>
    </div>

    <div v-if="error" class="alert alert-error mb-6">
      <span>{{ error }}</span>
    </div>


  </div>
  <div>
    <div v-if="places && places.length" class="places-list">
      <div v-for="place in places" :key="place.name" class="card bg-base-100 shadow-xl mb-6">
        <div class="card-body p-0">
          <div class="grid grid-cols-2 h-[600px]">
            <!-- Ліва частина з інформацією про заклад -->
            <div class="p-6">
              <h2 class="card-title">{{ place.name }}</h2>

              <div class="flex items-center gap-2 mb-2">
                <div class="flex">
                  <template v-for="n in 5" :key="n">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"
                      :class="n <= Math.round(place.rating) ? 'text-yellow-400' : 'text-gray-300'">
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.388-2.46a1 1 0 00-1.175 0l-3.388 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z" />
                    </svg>
                  </template>
                </div>
                <span v-if="place.userRatingCount" class="text-sm text-gray-500">
                  ({{ place.userRatingCount }} {{ formatRatingCount(place.userRatingCount) }})
                </span>
                <span class="text-sm text-gray-500">
                  {{ place.rating ? place.rating.toFixed(1) : '—' }}/5
                </span>
              </div>

              <div class="space-y-2">
                <p v-if="place.address">
                  <i class="fas fa-map-marker-alt mr-2"></i>
                  {{ place.address }}
                </p>
                <p v-if="place.phone">
                  <i class="fas fa-phone mr-2"></i>
                  {{ place.phone }}
                </p>
                <p v-if="place.website">
                  <i class="fas fa-globe mr-2"></i>
                  <a :href="place.website" target="_blank" class="link link-primary">
                    {{ place.website }}
                  </a>
                </p>
              </div>

              <div v-if="place.openingHours.length" class="mt-4">
                <h3 class="font-semibold mb-2">Години роботи:</h3>
                <ul class="list-disc list-inside">
                  <li v-for="(hours, index) in place.openingHours" :key="index">
                    {{ hours }}
                  </li>
                </ul>
              </div>
            </div>

            <!-- Права частина з відгуками -->
            <div v-if="place.reviews.length" class="p-6 bg-base-200 h-full flex flex-col" style="height: 100%; overflow: hidden;">
              <h3 class="font-semibold mb-4">Відгуки:</h3>
              <div class="overflow-y-auto flex-1 space-y-4" style="min-height:0; max-height: 520px;">
                <div v-for="review in place.reviews" :key="review.time" class="card bg-base-100">
                  <div class="card-body p-4">
                    <div class="flex items-center gap-2 mb-2">
                      <span class="font-semibold">{{ review.author }}</span>
                      <div class="rating rating-xs">

                        <template v-for="n in 5" :key="n">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                            class="w-5 h-5"
                            :class="n <= Math.round(review.rating) ? 'text-yellow-400' : 'text-gray-300'">
                            <path
                              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.388-2.46a1 1 0 00-1.175 0l-3.388 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z" />
                          </svg>
                        </template>
                      </div>
                    </div>
                    <p class="text-sm">{{ review.text }}</p>
                    <p class="text-xs text-gray-500 mt-2">
                      {{ review.time }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="!isLoading && !error" class="text-center text-gray-500">
      Введіть пошуковий запит, щоб знайти заклади
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const searchQuery = ref('')
const resultCount = ref('1')
const places = ref([])
const isLoading = ref(false)
const error = ref('')

// Функція для форматування кількості відгуків
const formatRatingCount = (count) => {
  const lastDigit = count % 10
  const lastTwoDigits = count % 100

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return 'відгуків'
  }

  if (lastDigit === 1) {
    return 'відгук'
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return 'відгуки'
  }

  return 'відгуків'
}

const searchPlaces = async () => {
  if (!searchQuery.value) {
    error.value = 'Будь ласка, введіть пошуковий запит'
    return
  }

  isLoading.value = true
  error.value = ''

  try {
    const response = await axios.get('/api/places/search', {
      params: {
        query: searchQuery.value,
        maxResults: parseInt(resultCount.value)
      }
    })
    places.value = response.data.places
  } catch (err) {
    error.value = err.response?.data?.error || 'Помилка при пошуку закладів'
    places.value = []
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.places-search {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}
</style>
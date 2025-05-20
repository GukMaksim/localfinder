<template>
  <div class="places-search">
    <div class="search-form mb-6">
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Що шукаємо?</span>
        </label>
        <input v-model="searchQuery" type="text" placeholder="Наприклад: поїсти суші на оболоні"
          class="input input-bordered w-full" @keyup.enter="searchPlaces" />
      </div>

      <div class="form-control w-full mt-4">
        <label class="label">
          <span class="label-text">Кількість результатів</span>
        </label>
        <select v-model="resultCount" class="select select-bordered w-full">
          <option value="1">1 заклад</option>
          <option value="5">5 закладів</option>
          <option value="10">10 закладів</option>
          <option value="15">15 закладів</option>
          <option value="20">20 закладів</option>
        </select>
      </div>

      <button class="btn btn-primary mt-4 w-full" :disabled="isLoading" @click="searchPlaces">
        <span v-if="isLoading" class="loading loading-spinner"></span>
        {{ isLoading ? 'Пошук...' : 'Знайти заклади' }}
      </button>
    </div>

    <div v-if="error" class="alert alert-error mb-6">
      <span>{{ error }}</span>
    </div>

    <div v-if="places.length" class="places-list">
      <div v-for="place in places" :key="place.name" class="card bg-base-100 shadow-xl mb-6">
        <div class="card-body">
          <h2 class="card-title">{{ place.name }}</h2>

          <div class="flex items-center gap-2 mb-2">
            <div class="rating rating-sm">
              <input v-for="n in 5" :key="n" type="radio" :class="'mask mask-star-2'"
                :checked="n <= Math.round(place.rating)" disabled />
            </div>
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

          <div v-if="place.reviews.length" class="mt-4">
            <h3 class="font-semibold mb-2">Останні відгуки:</h3>
            <div v-for="review in place.reviews" :key="review.time" class="card bg-base-200 mb-2">
              <div class="card-body p-4">
                <div class="flex items-center gap-2 mb-2">
                  <span class="font-semibold">{{ review.author }}</span>
                  <div class="rating rating-xs">
                    <input v-for="n in 5" :key="n" type="radio" :class="'mask mask-star-2'"
                      :checked="n <= review.rating" disabled />
                  </div>
                </div>
                <p class="text-sm">{{ review.text }}</p>
                <p class="text-xs text-gray-500 mt-2">
                  {{ new Date(review.time).toLocaleDateString('uk-UA') }}
                </p>
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
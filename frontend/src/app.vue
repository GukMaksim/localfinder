<template>
  <div class="min-h-screen bg-base-200">
    <div class="navbar bg-base-100 shadow-lg">
      <div class="container mx-auto">
        <div class="flex-1">
          <a class="btn btn-ghost text-xl">LocalFinder</a>
        </div>
      </div>
    </div>

    <main class="container mx-auto py-8">
      <PlacesSearch />
    </main>
  </div>
</template>

<script setup>
import PlacesSearch from '@/components/PlacesSearch.vue'
</script>

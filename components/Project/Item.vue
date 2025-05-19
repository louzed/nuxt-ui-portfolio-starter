<template>
    <div class="border-b-1 border-muted">
      <UContainer class="lg:flex xl:border-r xl:border-l border-muted py-6 lg:py-0">
        <div class="lg:border-r-1 border-muted lg:w-1/2 lg:py-12">
          <img :src="image" :alt="title" class="min-w-full bg-muted aspect-3/2 object-cover" >
        </div>
        <div class="flex flex-col lg:w-1/2 px-6 lg:px-8 py-8 justify-center">
          <div class="flex flex-col items-start gap-3">
            <h4>{{ title }}</h4>
            <p class="text-muted max-w-lg mb-4">{{ description }}</p>
          </div>
        </div>
      </UContainer>
    </div>
  </template>
  
  <script setup lang="ts">
    defineProps<{
      image: string
      title: string
      description?: string
    }>()
    </script>
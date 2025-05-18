<template>
  <div class="border-b-1 border-muted">
    <UContainer class="lg:flex xl:border-r xl:border-l border-muted py-12 lg:py-0">
      <NuxtLink :to="to" class="lg:border-r-1 border-muted lg:w-1/2 lg:py-12">
        <img
          :src="image"
          :alt="title"
          :view-transition-name="transitionName"
          class="min-w-full bg-muted aspect-3/2 object-cover"
        >
      </NuxtLink>
      <div class="flex flex-col lg:w-1/2 px-4 lg:px-8 py-8 justify-center">
        <div class="flex flex-col items-start gap-3">
          <div class="flex gap-2 mb-2">
            <UBadge
              v-for="(badge, index) in badges"
              :key="index"
              size="md"
              color="neutral"
              variant="soft"
            >
              {{ badge }}
            </UBadge>
          </div>
          <h5>{{ title }}</h5>
          <p class="text-muted max-w-lg mb-4">{{ description }}</p>
          <div class="flex gap-2">
            <UButton :to="to" :label="ctaLabel" trailing-icon="i-mdi-arrow-right-thin" variant="outline" color="primary" size="lg" />
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  to: string
  image: string
  title: string
  description: string
  ctaLabel: string
  badges: string[]
  transitionName?: string
}>()
</script>
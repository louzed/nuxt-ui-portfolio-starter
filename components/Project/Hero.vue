<template>
  <div class="border-b border-muted">
    <UContainer class="min-h-[calc(100vh-128px)] lg:flex xl:border-r-1 xl:border-l-1 border-muted">
      <div class="flex lg:w-1/2 justify-start items-center px-5 lg:px-8 py-16 lg:border-r-1 border-muted">
        <div class="flex flex-col items-start gap-3">
          <div class="flex gap-2 lg:mb-0 mb-2">
            <UBadge v-for="(badge, index) in badges" :key="index" size="md" color="neutral" variant="soft">
              {{ badge }}
            </UBadge>
          </div>
          <h1>{{ title }}</h1>
          <p class="text-lg text-muted max-w-lg mb-2">
            {{ subtitle }}
          </p>
          <p class="text-muted max-w-lg">
            <span v-html="description"/>
          </p>
        </div>
      </div>
      <div class="flex lg:w-1/2 items-center">
        <img :src="imageSrc" :view-transition-name="transitionName" :alt="imageAlt"
          class="min-w-full aspect-3/2 object-cover object-top-left" >
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
defineProps({
  badges: {
    type: Array,
    default: () => [],
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: '',
  },
  pages: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    required: true,
  },
  imageSrc: {
    type: String,
    required: true,
  },
  transitionName: {
    type: String,
    required: true,
  },
  imageAlt: {
    type: String,
    default: 'Project Image',
  },
});
</script>

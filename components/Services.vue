<template>
  <div class="border-b border-muted">
    <UContainer class="flex flex-col py-24 !px-4">
      <h2 class="max-w-5xl mx-auto text-center">{{ t('services.mainHeading') }}</h2>
    </UContainer>
  </div>

  <div class="border-b border-muted">
    <UContainer class="lg:flex xl:border-r xl:border-l border-muted">
      <div class="flex flex-col lg:w-1/2 px-4 lg:px-8 py-16 lg:border-r border-b lg:border-b-0 border-muted">
        <div class="isolate flex flex-col items-start gap-2">
          <div
            v-intersection-observer.once="createIntersectionHandler('ux')"
            class="isolate flex size-16 mb-2 rounded-md bg-muted overflow-hidden">
            <UIcon v-if="visibility.ux" name="i-line-md-compass-loop" class="size-12 mx-auto my-auto" />
          </div>
          <h4>{{ t('services.uxUiDesign.title') }}</h4>
          <p class="text-lg text-muted max-w-lg mb-4">
            {{ t('services.uxUiDesign.description') }}
          </p>
          <div class="flex gap-2">
            <UBadge size="md" color="neutral" variant="soft">Figma</UBadge>
            <UBadge size="md" color="neutral" variant="soft">Adobe</UBadge>
            <UBadge size="md" color="neutral" variant="soft">Sketch</UBadge>
          </div>
        </div>
      </div>

      <div class="flex flex-col lg:w-1/2 px-4 lg:px-8 py-16">
        <div class="flex flex-col items-start gap-2">
          <div
            v-intersection-observer.once="createIntersectionHandler('frontend')"
            class="isolate flex size-16 mb-2 rounded-md bg-muted overflow-hidden">
            <UIcon v-if="visibility.frontend" name="i-line-md-speed-loop" class="size-12 mx-auto my-auto" />
          </div>
          <h4>{{ t('services.frontendDev.title') }}</h4>
          <p class="text-lg text-muted max-w-lg mb-4">
            {{ t('services.frontendDev.description') }}
          </p>
          <div class="flex flex-wrap gap-2">
            <UBadge size="md" color="neutral" variant="soft">HTML/CSS</UBadge>
            <UBadge size="md" color="neutral" variant="soft">NuxtJS</UBadge>
            <UBadge size="md" color="neutral" variant="soft">Tailwind</UBadge>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { vIntersectionObserver } from '@vueuse/components';
import { reactive } from 'vue';
import { useI18n } from '#imports'; // Assuming Nuxt auto-imports

const { t } = useI18n();

// Reactive object to hold visibility states for different icons
const visibility = reactive({
  ux: false,
  frontend: false,
});

// Factory function to create a specific intersection handler for each service
const createIntersectionHandler = (serviceKey: keyof typeof visibility) => {
  return (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    if (entries[0]?.isIntersecting) {
      visibility[serviceKey] = true;
    }
  };
};
</script>
<template>
  <div class="py-12 lg:py-24 relative overflow-hidden">
    <UContainer class="relative flex flex-col py-16 !px-4">
      <div class="absolute inset-0 bg-[url('/images/contact-light.webp')] dark:bg-[url('/images/contact-dark.webp')] 
        bg-fixed bg-cover bg-center bg-muted opacity-60 pointer-events-none"/>
      <div v-intersection-observer.once="handleIntersection" class="size-16 flex mx-auto mb-4 relative z-10">
        <UIcon
          v-if="isVisible"
          name="i-line-md-coffee-half-empty-filled-loop"
          class="isolate size-16 mx-auto"
        />
      </div>
      <h3 class="text-center mb-2 relative z-10">{{ t('contactSection.title') }}</h3>
      <p class="text-lg text-muted text-center mb-8 relative z-10">{{ t('contactSection.subtitle') }}</p>
      <div class="flex gap-2 mx-auto relative z-10">
        <UButton
          :to="whatsAppUrl" 
          target="blank" 
          label="WhatsApp" 
          size="lg"
          icon="i-mdi-whatsapp" 
          color="success" 
        />
        <UButton
          to="https://zeeg.me/biereth" 
          target="blank" 
          :label="t('hero.ContactButton')" 
          size="lg"
          icon="i-mdi-external-link" 
          trailing 
        />
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { vIntersectionObserver } from '@vueuse/components';
import { shallowRef, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const isVisible = shallowRef(false);

function handleIntersection(entries: IntersectionObserverEntry[], observer: IntersectionObserver): void {
  const entry = entries[0];
  if (entry?.isIntersecting) {
    isVisible.value = true;
  }
}

// Dynamic WhatsApp URL with translated greeting
const whatsAppBaseUrl = 'https://wa.me/491785785578';
const whatsAppUrl = computed(() => {
  const message = t('hero.whatsAppGreeting');
  return `${whatsAppBaseUrl}?text=${encodeURIComponent(message)}`;
});
</script>
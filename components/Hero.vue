<template>
  <section id="hero">
    <div class="border-b border-muted">
      <UContainer class="min-h-[calc(100vh-128px)] lg:flex xl:border-r-1 xl:border-l-1 border-muted">
        <div class="flex lg:w-1/2 lg:justify-start justify-center items-center px-4 lg:px-8 py-20 lg:border-r-1 border-muted">
          <div class="flex flex-col items-center lg:items-start gap-2">
            <ClientOnly>
              <img src="/images/avatar.webp" alt="Markus Biereth" class="w-28 h-28 bg-elevated mb-3 rounded-full" >
            </ClientOnly>
            <div class="flex mb-2">
              <UBadge icon="i-svg-spinners-pulse-multiple" size="md" color="success" variant="outline" class="rounded-full">
                {{ t('hero.Badge') }}
              </UBadge>
            </div>
            <h1>Markus Biereth</h1> 
            <p class="text-center lg:text-left text-xl text-muted max-w-sm lg:max-w-lg">
              {{ t('hero.Title') }}
            </p>
            <div class="flex flex-row gap-2 mt-6">
              <UButton :to="whatsAppUrl" target="blank" label="WhatsApp" size="lg" icon="i-mdi-whatsapp" color="success" />
              <UButton to="https://zeeg.me/biereth" :label="t('hero.ContactButton')" size="lg" trailing-icon="i-mdi-external-link" />
            </div>
          </div>
        </div>
        <div class="flex lg:w-1/2 items-center">
          <ClientOnly>
            <img
              :src="getImg('hero')" :alt="t('hero.heroImageAlt')"
              class="min-w-full aspect-3/2 object-cover object-top-left" >
          </ClientOnly>
        </div>
      </UContainer>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useColorMode, useI18n } from '#imports';

const { t } = useI18n();
const colorMode = useColorMode();

const getImg = (name: string) => {
  const suffix = colorMode.value === 'dark' ? 'dark' : 'light';
  return `/images/${name}-${suffix}.webp`;
};

const whatsAppBaseUrl = 'https://wa.me/491785785578';
const whatsAppUrl = computed(() => {
  const message = t('hero.whatsAppGreeting');
  return `${whatsAppBaseUrl}?text=${encodeURIComponent(message)}`;
});
</script>
<template>
  <section id="hero" :class="{ 'section-loaded': hasLoaded }">
    <div class="border-b border-muted">
      <UContainer class="min-h-[calc(100vh-128px)] lg:flex xl:border-r-1 xl:border-l-1 border-muted">
        <div class="flex lg:w-1/2 lg:justify-start justify-center items-center px-5 lg:px-8 py-16 lg:border-r-1 border-muted">
          <div class="flex flex-col items-center lg:items-start gap-2">
            <img data-fade="1" src="/images/avatar.webp" alt="Markus Biereth" class="w-30 h-30 bg-muted mb-6 rounded-full" >
            <div class="flex mb-1" data-fade="2">
              <UBadge icon="i-svg-spinners-pulse-multiple" size="md" color="success" variant="outline" class="rounded-full">
                {{ t('hero.Badge') }}
              </UBadge>
            </div>
            <h1 data-fade="3">Markus Biereth</h1> 
            <p class="text-center lg:text-left text-xl text-muted max-w-sm lg:max-w-lg" data-fade="4">
              {{ t('hero.Title') }}
            </p>
            <div class="flex flex-row gap-2 mt-6" data-fade="5">
              <UButton :to="whatsAppUrl" target="_blank" label="WhatsApp" size="lg" icon="i-mdi-whatsapp" color="success" />
              <UButton to="https://zeeg.me/biereth" :label="t('hero.ContactButton')" target="_blank" size="lg" trailing-icon="i-mdi-external-link" />
            </div>
          </div>
        </div>
        <div class="flex lg:w-1/2 items-center">
          <div data-fade="6">
            <ClientOnly>
              <img :src="getImg('hero')" :alt="t('hero.heroImageAlt')" class="min-w-full aspect-3/2 object-cover object-top-left" >
            </ClientOnly>
          </div>
        </div>
      </UContainer>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useColorMode, useI18n } from '#imports';

const { t } = useI18n();
const colorMode = useColorMode();

// --- ANIMATION LOGIC ---
const hasLoaded = ref(false);
onMounted(() => {
  // When the component is mounted to the page, set hasLoaded to true.
  // This will trigger the .section-loaded class to be added.
  hasLoaded.value = true;
});
// --- END ANIMATION LOGIC ---

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

<style scoped>
/* By default, all elements with a [data-fade] attribute are invisible and slightly moved down. */
[data-fade] {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

/* When the .section-loaded class is added to the parent, fade in the children. */
.section-loaded [data-fade] {
  opacity: 1;
  transform: translateY(0);
}

/* Apply a staggered delay to each element based on its data-fade number. */
.section-loaded [data-fade="1"] { transition-delay: 100ms; }
.section-loaded [data-fade="2"] { transition-delay: 200ms; }
.section-loaded [data-fade="3"] { transition-delay: 300ms; }
.section-loaded [data-fade="4"] { transition-delay: 400ms; }
.section-loaded [data-fade="5"] { transition-delay: 500ms; }
.section-loaded [data-fade="6"] { transition-delay: 650ms; } /* A longer delay for the main image */
</style>
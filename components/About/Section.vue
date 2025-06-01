<template>
  <div class="border-b border-muted">
    <UContainer class="py-16 lg:py-24 !px-5">
      <h2 class="max-w-5xl mx-auto text-center">
        {{ t('about.hero') }}
      </h2>
    </UContainer>
  </div>

  <div class="border-b border-muted">
    <UContainer class="grid grid-cols-1 lg:grid lg:grid-cols-2 lg:grid-rows-2 xl:border-r xl:border-l border-muted">
      <div class="border-b lg:border-b-0 lg:border-r border-muted py-6 lg:py-12 lg:row-span-2">
        <ClientOnly>
          <img :src="getImg('about')" :alt="t('about.imageAlt')" class="aspect-square object-cover object-center" >
        </ClientOnly>
      </div>

      <div class="flex flex-col justify-center border-b border-muted px-5 lg:px-8 py-12">
        <div class="space-y-2">
          <div v-intersection-observer.once="handleIntersection" class="isolate flex mb-4 size-16 rounded-md bg-muted">
            <UIcon v-if="isVisible" name="i-line-md-github-loop" class="size-12 mx-auto my-auto" />
          </div>
          <h4>
            {{ t('about.section1.title') }}
          </h4>
          <p class="text-lg text-muted mb-6 max-w-lg">
            {{ t('about.section1.description') }}
          </p>
          <div class="flex gap-2">
            <DrawerCv />
            <div class="flex ml-2 gap-1">
              <UButton
                to="https://dribbble.com/mbiereth"
                target="_blank"
                :icon="dribbbleIcon"
                variant="ghost"
                color="neutral"
                size="lg"
                @mouseenter="dribbbleIcon = 'i-mdi-external-link'"
                @mouseleave="dribbbleIcon = 'i-teenyicons-dribbble-solid'"
              />
              <UButton
                to="https://github.com/louzed"
                target="_blank"
                :icon="githubIcon"
                variant="ghost"
                color="neutral"
                size="lg"
                @mouseenter="githubIcon = 'i-mdi-external-link'"
                @mouseleave="githubIcon = 'i-simple-icons-github'"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="px-5 lg:px-8 py-12 flex flex-col justify-center">
        <div class="space-y-2">
          <div v-intersection-observer.once="handleIntersection2" class="isolate flex size-16 mb-4 rounded-md bg-muted">
            <UIcon v-if="isVisible2" name="i-line-md-star-pulsating-loop" class="size-12 mx-auto my-auto" />
          </div>
          <h4>{{ t('about.section2.title') }}</h4>
          <p class="text-lg text-muted mb-6 max-w-lg">
            {{ t('about.section2.description') }}
          </p>
          <div class="flex gap-2">
            <DrawerXdi />
            <DrawerWebflow />
          </div>
        </div>
      </div>
    </UContainer> 
  </div>

  <AboutAccordion />
</template>

<script setup lang="ts">
import { vIntersectionObserver } from '@vueuse/components';
import { ref } from 'vue';
import { useColorMode, useI18n } from '#imports';

const { t } = useI18n(); 

const isVisible = ref(false);
const isVisible2 = ref(false);

function handleIntersection(entries: IntersectionObserverEntry[]) {
  if (entries[0]?.isIntersecting) {
    isVisible.value = true;
  }
}

function handleIntersection2(entries: IntersectionObserverEntry[]) {
  if (entries[0]?.isIntersecting) {
    isVisible2.value = true;
  }
}

const colorMode = useColorMode();

const getImg = (name: string) => {
  const suffix = colorMode.value === 'dark' ? 'dark' : 'light';
  return `/images/${name}-${suffix}.webp`;
};

const githubIcon = ref('i-simple-icons-github');
const dribbbleIcon = ref('i-mingcute-dribbble-fill');
</script>
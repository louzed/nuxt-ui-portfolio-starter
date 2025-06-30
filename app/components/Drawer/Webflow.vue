<template>
  <UDrawer v-model:open="open" should-scale-background>
    <UButton label="Webflow" icon="i-simple-icons-webflow" variant="outline" size="lg" />

    <template #header>
      <div class="flex flex-grow max-w-4xl mx-auto justify-between">
        <p class="text-muted text-lg pt-1">Webflow University</p>
        <UButton color="neutral" variant="ghost" icon="i-lucide-x" size="lg" @click="open = false" />
      </div>
    </template>

    <template #body>
      <div class="flex w-full">
        <div class="lg:flex max-w-4xl mx-auto">
          <img :src="getImg1('webflow1')" alt="Webflow" class="lg:w-1/2" loading="eager" >
          <img :src="getImg2('webflow1')" alt="Webflow" class="lg:w-1/2" loading="eager" >
        </div>
      </div>
    </template>

  </UDrawer>
</template>

<script setup lang="ts">
import { useColorMode } from '#imports';

const open = ref(false)

const colorMode = useColorMode();

const getImg1 = (name: string) => {
  const suffix = colorMode.value === 'dark' ? 'dark' : 'dark';
  return `/images/${name}-${suffix}.webp`;
};

const getImg2 = (name: string) => {
  const suffix = colorMode.value === 'dark' ? 'dark' : 'dark';
  return `/images/${name}-${suffix}.webp`;
};
</script>
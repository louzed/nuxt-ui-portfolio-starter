<template>
  <div class="border-b-1 border-muted">
    <UContainer class="xl:border-r xl:border-l border-muted py-12">
      <ClientOnly>
        <UCarousel
          v-slot="{ item }"
          :items="items"
          :ui="{ item: 'lg:basis-1/2 ps-0 lg:-translate-x-1/2' }"
          loop
          arrows
          dots
          :autoplay="{ delay: 2400 }"
          class="flex"
        >
          <img
            :src="item"
            alt="Carousel slide"
            width="100%"
            height="234"
            class="aspect-3/2 bg-accented object-cover translate-x-2"
            loading="lazy"
          />
        </UCarousel>
      </ClientOnly>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const items = [
  '/images/slide01.webp',
  '/images/slide02.webp',
  '/images/slide03.webp',
  '/images/slide04.webp',
  '/images/slide05.webp',
  '/images/slide06.webp',
  '/images/slide07.webp',
  '/images/slide08.webp',
  '/images/slide09.webp',
  '/images/slide10.webp',
  '/images/slide11.webp',
  '/images/slide12.webp',
];
</script>
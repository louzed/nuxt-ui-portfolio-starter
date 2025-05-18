<template>
  <ClientOnly>
    <Particles v-if="colorMode.value === 'dark'" />
  </ClientOnly>
  <AppHeader class="hidden lg:block" />
  <AppMobile class="lg:hidden" />
  <main class="overflow-x-hidden mt-16 lg:mt-0">
    <slot />
  </main>
  <AppFooter />
</template>

<script setup lang="ts">
const colorMode = useColorMode()
</script>
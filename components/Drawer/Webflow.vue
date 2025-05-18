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
          <img src="/images/webflow1.webp" alt="UX Design XDi" class="lg:w-1/2" >
          <img src="/images/webflow2.webp" alt="UX Design XDi" class="lg:w-1/2" >
        </div>
      </div>
    </template>

  </UDrawer>
</template>

<script setup lang="ts">
const open = ref(false)
</script>
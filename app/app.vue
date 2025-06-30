<template>
  <UApp>
    <div data-vaul-drawer-wrapper>
      <NuxtLayout>
        <NuxtPage :transition="pageTransitionConfig" />
      </NuxtLayout>
    </div>
  </UApp>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { isLanguageSwitching } from '~/composables/useNavigationState';

// Define default page transition
const defaultPageTransition = { name: 'page', mode: 'out-in' as const };

const pageTransitionConfig = computed(() => {
  if (isLanguageSwitching.value) {
    return false; // Disable transition if it's a language switch
  }
  return defaultPageTransition; // Otherwise, use the default page transition
});
</script>
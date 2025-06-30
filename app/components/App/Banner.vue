<template>
  <div class="banner-base" :class="{ 'banner-visible': isBannerVisible }">
    <div class="hidden lg:flex items-center justify-between px-2 h-8">
      <div class="flex items-center text-sm font-medium text-inverted">
        <span>🚀&nbsp{{ t('banner.title') }}</span>
        <NuxtLink to="https://biereth.de/mail/nuxt/" target="_blank" class="flex gap-1 items-center underline ml-4 hover:text-inverted/75">Demo<UIcon name="i-mdi-external-link" />
        </NuxtLink>
      </div>
      <UButton
        color="primary"
        class="!text-inverted"
        size="md"
        variant="solid"
        icon="i-heroicons-x-mark-20-solid"
        :aria-label="'Close Banner'"
        @click="closeBanner"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from '#imports'; 

const { t } = useI18n();

const isBannerVisible = ref(false)

onMounted(() => {
  // After a delay, trigger the animation to make the banner visible
  setTimeout(() => {
    isBannerVisible.value = true
  }, 1500) // 1-second delay
})

const closeBanner = () => {
  // Trigger the closing animation by removing the visibility class
  isBannerVisible.value = false
}
</script>

<style scoped>
.banner-base {
  background-color: var(--ui-bg-primary);
  
  /* Initial state: Visually hidden with no height */
  max-height: 0;
  opacity: 0;
  overflow: hidden; /* Hides the content when height is 0 */

  /* Animate max-height, opacity, and padding for a super smooth effect */
  transition: max-height 600ms ease-in-out, 
              opacity 300ms ease-in-out,
              padding-top 600ms ease-in-out,
              padding-bottom 600ms ease-in-out;
}

.banner-base.banner-visible {
  /* Final state: Full height and visible */
  max-height: 5rem;
  opacity: 1;
}
</style>
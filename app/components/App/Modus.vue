<template>
  <ClientOnly>
    <UButton
        :aria-label="t('settings.switchThemeTo', { theme: nextTheme })" :icon="colorMode.value === 'dark' ? 'i-line-md-sunny-filled-loop-to-moon-filled-loop-transition' : 'i-line-md-sun-rising-filled-loop'"
        :label="colorMode.value === 'dark' ? t('settings.themeDark') : t('settings.themeLight')" color="neutral"
        variant="outline"
        size="md"
        class="rounded-md"
        @click="startViewTransition"
      />
  </ClientOnly>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
import { useI18n } from '#imports'; // Changed import to #imports

const { t } = useI18n();

const nextTheme = computed(() => (colorMode.value === "dark" ? "light" : "dark"));

const switchTheme = () => {
  colorMode.preference = nextTheme.value
}

const startViewTransition = (event: MouseEvent) => {
  if (!document.startViewTransition) {
    switchTheme()
    return
  }

  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  )

  const transition = document.startViewTransition(() => {
    switchTheme()
  })

  transition.ready.then(() => {
    const duration = 600
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`
        ]
      },
      {
        duration: duration,
        easing: 'cubic-bezier(.76,.32,.29,.99)',
        pseudoElement: '::view-transition-new(root)'
      }
    )
  })
}
</script>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-new(root) {
  z-index: 9999;
}
::view-transition-old(root) {
  z-index: 1;
}
</style>
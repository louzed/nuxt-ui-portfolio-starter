<template>
  <ClientOnly>
    <UButtonGroup>
      <UButton
        :aria-label="t('settings.switchLanguageTo', { language: nextLanguageName })" icon="i-mdi-world"
        color="neutral"
        variant="outline"
        :label="currentLanguageLabel"
        size="md"
        class="rounded-md bg-neutral-0"
        @click="toggleLanguage"
      />
      <UButton
        :aria-label="t('settings.switchThemeTo', { theme: nextTheme })" :icon="colorMode.value === 'dark' ? 'i-line-md-sunny-filled-loop-to-moon-filled-loop-transition' : 'i-line-md-sun-rising-filled-loop'"
        color="neutral"
        variant="outline"
        size="md"
        class="rounded-md bg-neutral-0"
        @click="startViewTransition"
      />
    </UButtonGroup>
  </ClientOnly>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useColorMode, useI18n, useSwitchLocalePath, useRoute, navigateTo } from '#imports';
import { isLanguageSwitching } from '~/composables/useNavigationState';

const colorMode = useColorMode();
const { locale, t, setLocale } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const route = useRoute();

// --- Theme Switching Logic ---
const nextTheme = computed(() => (colorMode.value === "dark" ? "light" : "dark"));
const switchTheme = () => {
  colorMode.preference = nextTheme.value;
};
const startViewTransition = (event: MouseEvent) => {
  if (!document.startViewTransition) {
    switchTheme();
    return;
  }
  const x = event.clientX;
  const y = event.clientY;
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );
  const transition = document.startViewTransition(() => {
    switchTheme();
  });
  transition.ready.then(() => {
    const duration = 600;
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
    );
  });
};

// --- Language Switching Logic ---
type LanguageCode = 'de' | 'en';
const languages: Record<LanguageCode, string> = {
  de: 'Deutsch',
  en: 'English',
};

const currentLanguageCode = computed(() => locale.value as LanguageCode);
const currentLanguageLabel = computed(() => currentLanguageCode.value.toUpperCase());

const nextLanguageCodeToSwitchTo = computed<LanguageCode>(() => {
  return currentLanguageCode.value === 'de' ? 'en' : 'de';
});
const nextLanguageName = computed(() => languages[nextLanguageCodeToSwitchTo.value]);

async function toggleLanguage(): Promise<void> {
  isLanguageSwitching.value = true; // Set the flag BEFORE navigation/locale change

  const targetLocale = nextLanguageCodeToSwitchTo.value;
  await setLocale(targetLocale); // Update i18n state

  // Nuxt i18n's setLocale often handles redirection if routing strategy requires URL change.
  // However, to be sure the URL updates and Nuxt Router is aware,
  // explicitly navigating can be more robust.
  const newPath = switchLocalePath(targetLocale);
  if (newPath && newPath !== route.fullPath) {
     navigateTo(newPath, {
      // external: true, // Not needed for internal SPA navigation
      replace: true // Good for language switches
    });
  }
  // The flag `isLanguageSwitching` will be reset by the plugin (Step 3)
}
</script>

<style>
/* View transition styles remain the same */
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
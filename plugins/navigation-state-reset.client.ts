// plugins/navigation-state-reset.client.ts
import { nextTick } from 'vue';
import { isLanguageSwitching } from '~/composables/useNavigationState'; // Adjust path if your composables folder is different

// Import useRouter from Nuxt's auto-imports or directly from vue-router
import { useRouter } from '#imports'; // Recommended for Nuxt 3 auto-imports
// Alternatively, if '#imports' doesn't resolve correctly for some reason:
// import { useRouter } from 'vue-router';

export default defineNuxtPlugin(() => {
  const router = useRouter(); // Get the router instance using the composable

  router.afterEach(() => {
    if (isLanguageSwitching.value) {
      // Use nextTick to ensure this runs after the current navigation's
      // synchronous effects might have read the flag, and after the new route is settled.
      nextTick(() => {
        isLanguageSwitching.value = false;
      });
    }
  });
});
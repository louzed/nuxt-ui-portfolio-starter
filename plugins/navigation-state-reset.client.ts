// plugins/navigation-state-reset.client.ts
import { nextTick } from 'vue';
import { isLanguageSwitching } from '~/composables/useNavigationState';

import { useRouter } from '#imports';

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
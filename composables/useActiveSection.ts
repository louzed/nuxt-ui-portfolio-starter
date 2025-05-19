// composables/useActiveSection.ts
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useState, useRoute, useLocalePath } from '#imports';

const SUSPEND_MS = 600; // suspension window for any navigation

export function useActiveSection(sectionSelector = 'section[id]') {
  const activeSectionId = useState<string|null>('activeSectionId', () => null);
  const sections = ref<HTMLElement[]>([]);
  const route = useRoute();
  const localePath = useLocalePath();

  let observer: IntersectionObserver|null = null;
  let timeoutId: ReturnType<typeof setTimeout>|null = null;
  const suspended = ref(false);

  // derive the index/home path for this locale
  const getHomePath = () => {
    let p = localePath({ name: 'index' });
    if (typeof p === 'string' && p.startsWith('/')) return p;
    p = localePath('/');
    return p ?? '/';
  };

  // (re-)create the IO
  function initObserver() {
    if (observer) observer.disconnect();

    observer = new IntersectionObserver(
      (entries) => {
        if (suspended.value) return;
        if (timeoutId) clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
          let found: string|null = null;
          for (const e of entries) {
            if (e.isIntersecting) {
              found = e.target.id;
              break;
            }
          }
          // only update if we found a new one
          if (found && found !== activeSectionId.value) {
            activeSectionId.value = found;
          }
        }, 100);
      },
      { threshold: 0.2, rootMargin: '-20% 0px -20% 0px' }
    );

    // observe each section
    sections.value.forEach(sec => {
      if (sec.id) observer!.observe(sec);
    });
  }

  onMounted(async () => {
    await nextTick();

    // grab all the sections once DOM is in place
    sections.value = Array.from(
      document.querySelectorAll<HTMLElement>(sectionSelector)
    );
    if (!sections.value.length) return;

    // only init on home
    if (route.path === getHomePath()) {
      initObserver();
    }
  });

  // watch for any path or hash change
  watch(
    () => [route.path, route.hash],
    async ([newPath, newHash], [oldPath, oldHash]) => {
      // suspend immediately whenever route changes
      suspended.value = true;
      if (observer) observer.disconnect();

      // clear any pending timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }

      // reset active if leaving home
      if (oldPath === getHomePath() && newPath !== getHomePath()) {
        activeSectionId.value = null;
      }

      // after SUSPEND_MS, resume and (re-)init if on home
      setTimeout(async () => {
        suspended.value = false;

        if (newPath === getHomePath()) {
          // re-scan sections in case DOM changed
          await nextTick();
          sections.value = Array.from(
            document.querySelectorAll<HTMLElement>(sectionSelector)
          );
          initObserver();

          // if there’s a hash, set it immediately
          if (newHash) {
            const id = newHash.slice(1);
            if (sections.value.some(s => s.id === id)) {
              activeSectionId.value = id;
            }
          }
        }
      }, SUSPEND_MS);
    },
    { immediate: false }
  );

  onUnmounted(() => {
    observer?.disconnect();
    if (timeoutId) clearTimeout(timeoutId);
  });

  return { activeSectionId };
}

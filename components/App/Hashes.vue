<template>
  <NuxtLink
    :href="linkHref"
    :class="[
      'flex items-center font-medium h-8 px-3 rounded-md transition-colors',
      isActive ? 'bg-muted text-primary-400' : 'hover:bg-muted hover:text-primary-500'
    ]"
    @click.prevent="handleClick"
  >
    {{ name }}
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter, useRoute, useLocalePath } from '#imports'; // Nuxt auto-imports
import { useActiveSection } from '~/composables/useActiveSection';
import { useScrollHandler } from '~/composables/useScrollHandler'; // Import the new composable

// Define the emitted event
const emit = defineEmits(['click:hash-link']);

const props = defineProps<{
  name: string;
  sectionId: string;
}>();

const router = useRouter();
const route = useRoute();
const localePath = useLocalePath();
const { activeSectionId } = useActiveSection();
const { scrollToSection: customScrollToSection } = useScrollHandler(); // Use the composable

const HEADER_HEIGHT_OFFSET = 64; // Define header height for scroll offset
const PAGE_LEAVE_ANIMATION_DURATION = 300; // Your page leave animation duration in ms
const POST_NAVIGATION_SCROLL_DELAY = PAGE_LEAVE_ANIMATION_DURATION + 25; // Add a small buffer

// Helper to get the canonical path for the main page
const getMainPagePath = () => localePath('/') ?? '/';

// Dynamically determine the correct link href
const linkHref = computed(() => {
  const mainPagePath = getMainPagePath();
  const isOnMainPage = route.name === 'index' || route.path === mainPagePath;
  return isOnMainPage ? `#${props.sectionId}` : `${mainPagePath}#${props.sectionId}`;
});

// Handle click: Smooth scroll on main page, instant scroll after navigation from other pages
const handleClick = async () => {
  // Emit the event to notify parent components (like the mobile drawer)
  emit('click:hash-link');

  const mainPagePath = getMainPagePath();
  // Check if the current route is the main page (adjust 'index' if your main route has a different name)
  const isOnMainPage = route.name === 'index' || route.path === mainPagePath;
  const targetHash = `#${props.sectionId}`;

  if (isOnMainPage) {
    // If on the main page, use smooth scroll directly with offset
    await customScrollToSection(props.sectionId, true, HEADER_HEIGHT_OFFSET);
  } else {
    // If on another page, navigate to main page without the hash.
    await router.push({ path: mainPagePath });

    // Wait for the leave animation of the previous page to complete
    // and for the new page to have a chance to render the target element.
    setTimeout(() => {
      // Scroll instantly (smooth: false) with offset
      customScrollToSection(props.sectionId, false, HEADER_HEIGHT_OFFSET);
    }, POST_NAVIGATION_SCROLL_DELAY);
  }
};

// Active state: works on main page and syncs with composable
const isActive = computed(() => {
  const mainPagePath = getMainPagePath();
  const isOnMainPage = route.name === 'index' || route.path === mainPagePath;
  return isOnMainPage && activeSectionId.value === props.sectionId;
});
</script>

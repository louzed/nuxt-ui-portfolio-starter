<template>
  <div v-if="project"> <section id="projecthero">
      <ProjectHero
        :badges="project.heroBadges"
        :title="project.heroTitle"
        :subtitle="project.heroSubtitle"
        :description="project.heroDescription"
        :image-src="project.heroImageSrc"
        :transition-name="project.heroTransitionName"
        :image-alt="project.heroImageAlt"
      />
    </section>

    <section id="message">
      <div class="border-b border-muted">
        <UContainer class="flex flex-col py-16 lg:py-24 !px-4">
          <div v-intersection-observer.once="handleIntersection" class="isolate flex size-20 mb-4 mx-auto">
            <UIcon v-if="isVisible" name="i-line-md-chat-round-alert" class="size-20 mx-auto my-auto" />
          </div>
          <h2 class="max-w-5xl mx-auto text-center">{{ project.message }}</h2>
        </UContainer>
      </div>
    </section>

    <section id="projectitems">
      <ProjectItem
        v-for="(item, index) in project.items"
        :key="index"
        :image="item.image"
        :title="item.title"
      />
    </section>

    <section id="contact">
      <AppContact />
    </section>
  </div>
  </template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { vIntersectionObserver } from '@vueuse/components';
import { findProjectById, type Project as ProjectDataType, type LocalizedString } from '~/assets/projects';

const route = useRoute();
const { locale } = useI18n();

// --- Step 1: Resolve and validate Project ID from route ---
let resolvedProjectId: string;
const idParamFromRoute = route.params.id;

if (typeof idParamFromRoute === 'string' && idParamFromRoute.length > 0) {
  resolvedProjectId = idParamFromRoute;
} else if (Array.isArray(idParamFromRoute) && idParamFromRoute.length > 0 && typeof idParamFromRoute[0] === 'string' && idParamFromRoute[0].length > 0) {
  // This case is less likely for a route like /projects/[id] but good for robustness
  resolvedProjectId = idParamFromRoute[0];
} else {
  // If ID is not a valid string, throw 404 immediately
  console.error("Project ID is missing or invalid from route parameters:", idParamFromRoute);
  throw createError({ statusCode: 404, statusMessage: 'Project Not Found (Invalid ID)', fatal: true });
}

// --- Step 2: Fetch project data using the validated ID ---
// resolvedProjectId is now guaranteed to be a non-empty string.
const projectDataFromStore = findProjectById(resolvedProjectId);

// --- Step 3: If data not found for a valid ID, throw 404 ---
if (!projectDataFromStore) {
  throw createError({ statusCode: 404, statusMessage: 'Project Not Found', fatal: true });
}

// --- Step 4: Make the successfully fetched data reactive ---
// projectDataSource is now guaranteed to be ProjectDataType
const projectDataSource = ref<ProjectDataType>(projectDataFromStore);

// --- Intersection Observer Logic ---
const isVisible = ref(false);
function handleIntersection(entries: IntersectionObserverEntry[]): void {
  if (entries[0]?.isIntersecting) {
    isVisible.value = true;
  }
}

// --- Localization Helper ---
const getLocalized = (localizedData: LocalizedString | undefined, currentLocaleValue: string): string => {
  if (!localizedData) return '';
  const langKey = (currentLocaleValue === 'en' || currentLocaleValue === 'de') ? currentLocaleValue as keyof LocalizedString : 'de';
  return localizedData[langKey] || localizedData.de; // Fallback to German
};

// --- Step 5: Create the final reactive 'project' object with localized strings ---
// This computed property will react to changes in `projectDataSource` or `locale`.
const project = computed(() => {
  const rawData = projectDataSource.value;
  const currentLocaleValue = locale.value;

  return {
    heroBadges: rawData.hero.badges,
    heroTitle: getLocalized(rawData.hero.title, currentLocaleValue),
    heroSubtitle: getLocalized(rawData.hero.subtitle, currentLocaleValue),
    heroDescription: getLocalized(rawData.hero.description, currentLocaleValue),
    heroImageSrc: rawData.hero.imageSrc,
    heroTransitionName: rawData.hero.transitionName,
    heroImageAlt: getLocalized(rawData.hero.imageAlt, currentLocaleValue),
    message: getLocalized(rawData.message, currentLocaleValue),
    items: rawData.items.map(item => ({
      image: item.image,
      title: getLocalized(item.title, currentLocaleValue),
    })),
  };
});

useHead(computed(() => ({
  title: project.value.heroTitle,
  meta: [
    { name: 'description', content: project.value.heroDescription }
  ],
})));
</script>
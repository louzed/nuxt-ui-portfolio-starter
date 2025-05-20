<template>
    <div> 
      <ProjectLogos />
  
      <ProjectCard
        v-for="projectCardData in localizedProjectsForCards"
        :key="projectCardData.id"
        :to="projectCardData.to"
        :image="projectCardData.image"
        :title="projectCardData.title"
        :description="projectCardData.description"
        :cta-label="projectCardData.ctaLabel"
        :badges="projectCardData.badges"
        :transition-name="projectCardData.transitionName"
      />
  
      <ProjectSlideshow />
    </div>
  </template>

<script setup lang="ts">
import { useLocalePath, useI18n } from '#imports';
import { projects as allProjects, type LocalizedString } from '~/assets/projects';


const localePath = useLocalePath();
const { locale } = useI18n();

const getLocalized = (localizedData: LocalizedString | undefined, currentLocaleValue: string): string => {
  if (!localizedData) return '';
  const langKey = (currentLocaleValue === 'en' || currentLocaleValue === 'de') ? currentLocaleValue as keyof LocalizedString : 'de';
  return localizedData[langKey] || localizedData.de;
};

// Optional: If you want to process the projects list for the template, e.g., localize all card data
const localizedProjectsForCards = computed(() => {
  return allProjects.map(project => ({
    id: project.id,
    to: localePath(`/projects/${project.id}`), // Use the project ID for dynamic routing
    image: project.card.image,
    title: getLocalized(project.card.title, locale.value),
    description: getLocalized(project.card.description, locale.value),
    ctaLabel: getLocalized(project.card.ctaLabel, locale.value),
    badges: project.card.badges, // Assuming badges are not LocalizedString in your current setup
    transitionName: project.card.transitionName,
  }));
});
</script>

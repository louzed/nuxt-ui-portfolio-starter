<template>
  <div>
    <section id="hero" ref="heroSection">
      <Hero />
      <Services />
    </section>

    <section id="projects" ref="projectSection">
      <ProjectSection />
    </section>

    <section id="about" ref="aboutSection">
      <AboutSection />
      <AppContact />
    </section>

  </div>
</template>

<script setup lang="ts">
import { useActiveSection } from "~/composables/useActiveSection";

useActiveSection();

useHead({
  title: "Markus Biereth - UX/UI Design & Webentwicklung in Mainfranken",
  meta: [
    {
      name: "Markus Biereth",
      content: "Ihr Experte für UX/UI Design und moderne Webentwicklung in Mainfranken. Entdecken Sie Projekte und innovative Designlösungen.",
    },
  ],
  link: [
    {
      rel: "icon",
      type: "image/x-icon",
      href: "/favicon.ico",
    },
  ],
});
</script>
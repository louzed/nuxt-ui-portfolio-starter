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
      name: "description",
      content: "Ihr Experte für Usability und moderne Webentwicklung in Mainfranken. Entdecken Sie spannende Projekte und innovative Designlösungen.",
    },
    // --- Add Open Graph Tags ---
    {
      property: "og:title",
      content: "UX/UI Design & Webentwicklung in Mainfranken",
    },
    {
      property: "og:description",
      content: "Ihr Experte für Usability und moderne Webentwicklung in Mainfranken. Entdecken Sie spannende Projekte und innovative Designlösungen.",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: "https://biereth.de",
    },
    {
      property: "og:image",
      content: "https://biereth.de/images/about-light.webp",
    },
  ],
  link: [
    {
      rel: "icon",
      type: "image/x-icon",
      href: "/favicon.ico",
    },
    {
      rel: "canonical",
      href: "https://biereth.de",
    }
  ],
});
</script>
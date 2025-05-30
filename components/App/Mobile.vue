<template>
  <header class="fixed top-0 w-full z-40 h-16 bg-default border-muted border-b shadow-none">

    <UContainer class="flex items-center justify-between h-full !px-5">
        <NuxtLink to="/" aria-label="Homepage" class="logo-link flex-shrink-0" external>
          <svg width="40" height="40" viewBox="0 0 1001 1001" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M359.769 66.2967C447.955 -21.8891 590.932 -21.8891 679.118 66.2967C731.35 118.529 752.646 189.984 743.003 257.89C810.91 248.248 882.364 269.543 934.597 321.776C1022.78 409.962 1022.78 552.939 934.597 641.125L615.248 960.474C562.337 1013.39 476.55 1013.39 423.639 960.474L40.4198 577.255C-12.0784 524.757 -12.4882 439.896 39.1898 386.892L40.4198 385.646L359.769 66.2967ZM104.29 449.515C104.249 449.556 72.3751 481.471 104.29 513.385C136.202 545.298 168.115 513.429 168.159 513.385L487.508 194.036C505.146 176.399 533.741 176.399 551.378 194.036C569.015 211.673 569.015 240.269 551.378 257.906L295.899 513.385C254.185 555.099 245.357 617.246 269.415 667.608C275.874 681.127 284.701 693.797 295.899 704.995C307.096 716.192 319.766 725.02 333.285 731.478C383.648 755.536 445.794 746.709 487.508 704.995L742.988 449.515C760.625 431.878 789.22 431.878 806.857 449.515C824.495 467.153 824.495 495.748 806.857 513.385L487.508 832.734C487.479 832.764 455.588 864.684 487.508 896.604C519.443 928.539 551.378 896.604 551.378 896.604L870.727 577.255C923.639 524.344 923.639 438.557 870.727 385.646C859.53 374.448 846.86 365.62 833.341 359.162C782.979 335.104 720.832 343.932 679.118 385.646L423.639 641.125C406.001 658.762 377.406 658.762 359.769 641.125C342.132 623.488 342.132 594.892 359.769 577.255L615.248 321.776C656.962 280.062 665.79 217.915 641.731 167.553C635.273 154.034 626.445 141.364 615.248 130.166C562.336 77.2551 476.55 77.255 423.639 130.166L104.29 449.515Z"
              fill="var(--logo-bg)"
            />
          </svg>
        </NuxtLink>

      <div class="flex items-center gap-2">
        <AppSettings />
        <UButton icon="i-heroicons-bars-3-20-solid" aria-label="open menu" variant="ghost" color="neutral" size="xl" @click="isMobileMenuOpen = true" />
      </div>
    </UContainer>

    <UDrawer v-model:open="isMobileMenuOpen" direction="top">
      <template #header>
        <div class="flex items-center justify-between">
          <h5 class="font-bold">Navigation</h5>
          <UButton color="neutral" variant="ghost" icon="i-heroicons-x-mark-20-solid" @click="isMobileMenuOpen = false" />
        </div>
      </template>

      <template #body>
        <div>
          <ClientOnly>
            <ul class="flex flex-col gap-4">
              <li v-for="link in navLinks" :key="link.id">
                <ClientOnly>
                  <AppHashes
                    :name="link.name"
                    :section-id="link.id"
                    @click:hash-link="isMobileMenuOpen = false"
                  />
                </ClientOnly>
              </li>
            </ul>
          </ClientOnly>
          <UButton class="mt-6 !text-inverted" block to="https://zeeg.me/biereth" target="_blank" @click="isMobileMenuOpen = false">
            {{ t('hero.ContactButton') }}</UButton>
        </div>
      </template>
    </UDrawer>

  </header>
</template>

<script setup lang="ts">
import { computed } from '#imports';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const navLinks = computed(() => [
  { name: t('nav.start'), id: 'hero' },
  { name: t('nav.projects'), id: 'projects' },
  { name: t('nav.about'), id: 'about' }
]);

const isMobileMenuOpen = ref(false);

</script>

<style scoped>
.logo-link:hover svg path {
  fill: var(--logo-hover-bg);
  transition: all 0.4s ease;
}
.logo-link svg path {
  transition: all 0.4s ease;
}
</style>